import z from "zod";

export interface LikeOrDislikeCommentInputDTO {
  like: boolean;
  token: string;
  commentId: string;
}

export type LikeOrDislikeCommentOutputDTO = undefined;

export const LikeOrDislikeCommentSchema = z
  .object({
    like: z.boolean(),
    token: z.string().min(1),
    commentId: z.string().min(1),
  })
  .transform((data) => data as LikeOrDislikeCommentInputDTO);
