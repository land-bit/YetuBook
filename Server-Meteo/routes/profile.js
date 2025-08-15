import { Router } from "express";
import db from "../dbconnection/db.js";

const router = Router();

router.post("/", async (req, res) => {
  const { id, email, fullName, avatarUrl } = req.body;

  try {
    const profile = await db.profile.upsert({
      where: { id },
      update: {
        fullName,
        avatarUrl,
      },
      create: {
        id,
        email,
        fullName,
        avatarUrl,
      },
    });
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Erreur backend profil :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/", async (req, res) => {
  try {
    const profile = await db.profile.findMany({
      include: {
        sentRequests: true,
        receivedRequests: true,
      },
    });
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Erreur backend profil :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await db.profile.findFirst({
      where: { id },
      include: {
        sentRequests: true,
        receivedRequests: {
          include: {
            requester: true,
          },
        },
      },
    });
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Erreur backend profil :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});
export default router;
