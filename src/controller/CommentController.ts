import { ZodError } from "zod";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { GetCommentsSchema } from "../dtos/comments/getComments.dto";
import { CommentBusiness } from "../business/CommentBusiness";
import { CreateCommentSchema } from "../dtos/comments/createComment.dto";
import { EditCommentSchema } from "../dtos/comments/editComment.dto";
import { DeleteCommentSchema } from "../dtos/comments/deleteComment.dto";
import { LikeOrDislikeCommentSchema } from "../dtos/comments/likeOrDislikeComment.dto";

export class CommentController {
  constructor(private commentBusiness: CommentBusiness) {}

  public getComments = async (req: Request, res: Response) => {
    try {
      const input = GetCommentsSchema.parse({
        token: req.headers.authorization,
      });
      const output = await this.commentBusiness.getComments(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        token: req.headers.authorization,
        content: req.body.content,
        postId: req.params.postId,
      });
      const output = await this.commentBusiness.createComment(input);
      res.status(201).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public editComment = async (req: Request, res: Response) => {
    try {
      const input = EditCommentSchema.parse({
        token: req.headers.authorization,
        content: req.body.content,
        postId: req.params.postId,
        commentId: req.params.commentId,
      });
      const output = await this.commentBusiness.editComment(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteComment = async (req: Request, res: Response) => {
    try {
      const input = DeleteCommentSchema.parse({
        token: req.headers.authorization,
        id: req.params.id,
      });
      const output = await this.commentBusiness.deleteComment(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public likeOrDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        like: req.body.like,
        token: req.headers.authorization,
        commentId: req.params.id,
      });
      const output = await this.commentBusiness.likeOrDislikeComment(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
