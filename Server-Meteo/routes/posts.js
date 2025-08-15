import { Router } from "express";
import db from "../dbconnection/db.js";
import { verifySupabaseToken } from "../utilities/verifySupabaseToken.js";

const prisma = db;
const post = Router();

// 📝 Créer un post
post.post("/", verifySupabaseToken, async (req, res) => {
  const { content, imageUrl } = req.body;
  const authorId = req.user.id;

  const post = await prisma.post.create({
    data: { content, imageUrl, authorId },
    include: {
      comments: {
        include: {
          replies: true,
        },
      },
      likes: true,
      shares: true,
      author: true,
    },
  });

  res.status(201).json(post);
});

// 📥 Lister les posts
post.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      comments: {
        include: {
          replies: true,
          author: true,
        },
      },
      likes: true,
      shares: true,
      author: true,
    },
  });

  res.json(posts);
});

// Supprimer un post
post.delete("/:postId", verifySupabaseToken, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    // Vérifier que l'utilisateur est bien l'auteur
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post introuvable" });
    }

    if (existingPost.authorId !== userId) {
      return res.status(403).json({ error: "Action non autorisée" });
    }
    await prisma.comment.deleteMany({
      where: { postId: postId },
    });
    await prisma.like.deleteMany({
      where: { postId: postId },
    });
    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors de la suppression du post" });
  }
});

// Edit un commentaire
post.put("/comments/:commentId", verifySupabaseToken, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return res.status(404).json({ error: "Commentaire introuvable" });
    }

    if (existingComment.authorId !== userId) {
      return res.status(403).json({ error: "Action non autorisée" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    res.status(200).json(updatedComment);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "Erreur lors de la modification du commentaire" });
  }
});

// 💬 Ajouter un commentaire
post.post("/:postId/comments", verifySupabaseToken, async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const authorId = req.user.id;

  const comment = await prisma.comment.create({
    data: { content, postId, authorId },
    include: { author: true },
  });

  res.status(201).json(comment);
});

// 🔁 Répondre à un commentaire
post.post(
  "/comments/:commentId/reply",
  verifySupabaseToken,
  async (req, res) => {
    const { content } = req.body;
    const { commentId } = req.params;
    const authorId = req.user.id;

    const reply = await prisma.reply.create({
      data: { content, commentId, authorId },
    });

    res.status(201).json(reply);
  }
);

// Supprimer un commentaire
post.delete("/comments/:commentId", verifySupabaseToken, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { post: true }, // pour vérifier si c'est l'auteur du post
    });

    if (!existingComment) {
      return res.status(404).json({ error: "Commentaire introuvable" });
    }

    if (
      existingComment.authorId !== userId &&
      existingComment.post.authorId !== userId
    ) {
      return res.status(403).json({ error: "Action non autorisée" });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du commentaire" });
  }
});

// ❤️ Liker un post
post.post("/:postId/like", verifySupabaseToken, async (req, res) => {
  const { postId } = req.params;
  const authorId = req.user.id;

  try {
    // Vérifier si un like existe déjà
    const existingLike = await prisma.like.findFirst({
      where: { postId, authorId },
    });

    if (existingLike) {
      // Unlike (supprimer le like existant)
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return res.status(200).json({ message: "Like retiré" });
    }

    // Like (ajouter un nouveau like)
    const newLike = await prisma.like.create({
      data: { postId, authorId },
    });
    res.status(201).json(newLike);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Erreur lors du like/unlike" });
  }
});

// 📤 Partager un post
post.post("/:postId/share", verifySupabaseToken, async (req, res) => {
  const { postId } = req.params;
  const authorId = req.user.id;

  const share = await prisma.share.create({
    data: { postId, authorId },
  });

  res.status(201).json(share);
});

export default post;
