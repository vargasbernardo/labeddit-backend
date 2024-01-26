import z from "zod";
import { CommentModel } from "../../models/Comment";

export interface CreateCommentInputDTO {
  token: string;
  content: string;
  postId: string;
}

export type CreateCommentOutputDTO = CommentModel;

export const CreateCommentSchema = z
  .object({
    token: z.string().min(1),
    content: z.string().min(1),
    postId: z.string().min(1),
  })
  .transform((data) => data as CreateCommentInputDTO);
