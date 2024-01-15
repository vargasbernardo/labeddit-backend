import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentController } from "../controller/CommentController";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentDatabase } from "../database/CommentDatabase";

export const commentRouter = express.Router();

const commentController = new CommentController(
  new CommentBusiness(
    new CommentDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

commentRouter.get("/", commentController.getComments);
commentRouter.post("/:postId", commentController.createComment);
commentRouter.put("/:commentId", commentController.editComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.put("/:id/like", commentController.likeOrDislikeComment);
