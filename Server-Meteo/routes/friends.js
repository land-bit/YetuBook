// routes/friends.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifySupabaseToken } from "../utilities/verifySupabaseToken.js";

const prisma = new PrismaClient();
const router = express.Router();

// Envoyer une demande d'ami
router.post("/request", verifySupabaseToken, async (req, res) => {
  const requesterId = req.user.id;
  const { receiverId, message } = req.body;

  if (!receiverId) return res.status(400).json({ error: "receiverId requis" });
  if (receiverId === requesterId)
    return res
      .status(400)
      .json({ error: "Impossible de s'envoyer une demande à soi-même" });

  try {
    // Vérifier s'il y a déjà une demande acceptée (amis) ou pending dans un sens ou l'autre
    const existing = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { requesterId, receiverId },
          { requesterId: receiverId, receiverId: requesterId },
        ],
      },
    });

    if (existing) {
      if (existing.status === "PENDING")
        return res.status(400).json({ error: "Demande déjà en attente" });
      if (existing.status === "ACCEPTED")
        return res.status(400).json({ error: "Vous êtes déjà amis" });
      // si REJECTED ou BLOCKED, on peut décider de recréer ou renvoyer une erreur ; ici on renvoie une erreur
      return res
        .status(400)
        .json({ error: `Action impossible: statut actuel ${existing.status}` });
    }

    const fr = await prisma.friendRequest.create({
      data: {
        requesterId,
        receiverId,
        message,
      },
    });

    // Optionnel: notifier le receiver (via Realtime / socket)
    res.status(201).json(fr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Lister demandes reçues
router.get("/requests/received", verifySupabaseToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const requests = await prisma.friendRequest.findMany({
      where: { receiverId: userId, status: "PENDING" },
      include: { requester: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Lister demandes envoyées
router.get("/requests/sent", verifySupabaseToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const requests = await prisma.friendRequest.findMany({
      where: { requesterId: userId },
      include: { receiver: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Accepter une demande
router.post("/requests/:id/accept", verifySupabaseToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const fr = await prisma.friendRequest.findUnique({ where: { id } });
    if (!fr) return res.status(404).json({ error: "Demande introuvable" });
    if (fr.receiverId !== userId)
      return res.status(403).json({ error: "Non autorisé" });

    const profilReceiver = await prisma.profile.findUnique({
      where: { id: userId },
    });

    const profilRequester = await prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!profilRequester || !profilReceiver)
      throw new Error("Profil non trouvé");

    const updatedReceiverIds = [
      ...profilReceiver.canMessageIds,
      fr.requesterId,
    ];
    const updatedRequesterIds = [
      ...profilRequester.canMessageIds,
      fr.requesterId,
    ];

    const canRequesterMessage = await prisma.profile.update({
      where: { id: fr.requesterId },
      data: { canMessageIds: updatedRequesterIds },
    });

    const canReceiverMessage = await prisma.profile.update({
      where: { id: fr.receiverId },
      data: { canMessageIds: updatedReceiverIds },
    });

    // Optionnel: créer log ou notification, ou réciproque si tu veux table friends séparée
    res.json({ canReceiverMessage, canRequesterMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// Refuser une demande
router.post("/requests/:id/reject", verifySupabaseToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const fr = await prisma.friendRequest.findUnique({ where: { id } });
    if (!fr) return res.status(404).json({ error: "Demande introuvable" });
    if (fr.receiverId !== userId)
      return res.status(403).json({ error: "Non autorisé" });
    if (fr.status !== "PENDING")
      return res.status(400).json({ error: "Demande non pendante" });

    const updated = await prisma.friendRequest.update({
      where: { id },
      data: { status: "REJECTED" },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Annuler une demande envoyée (cancel)
router.delete("/requests/:id/cancel", verifySupabaseToken, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const fr = await prisma.friendRequest.findUnique({ where: { id } });
    if (!fr) return res.status(404).json({ error: "Demande introuvable" });
    if (fr.requesterId !== userId)
      return res.status(403).json({ error: "Non autorisé" });
    if (fr.status !== "PENDING")
      return res.status(400).json({ error: "Impossible d'annuler" });

    await prisma.friendRequest.delete({ where: { id } });
    res.json({ message: "Demande annulée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Supprimer un ami (retirer relation acceptée)
router.delete("/:otherUserId", verifySupabaseToken, async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.params;
  try {
    // Supprime toute request accepted entre les deux (quel que soit le sens)
    const deleted = await prisma.friendRequest.deleteMany({
      where: {
        status: "ACCEPTED",
        OR: [
          { requesterId: userId, receiverId: otherUserId },
          { requesterId: otherUserId, receiverId: userId },
        ],
      },
    });
    res.json({ message: "Amitié supprimée", count: deleted.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
