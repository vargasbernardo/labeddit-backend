import z from "zod";

export interface LikeOrDislikeInputDTO {
  like: boolean;
  token: string;
  postId: string;
}

export type LikeOrDislikeOutputDTO = undefined;

export const LikeOrDislikePostSchema = z
  .object({
    like: z.boolean(),
    token: z.string().min(1),
    postId: z.string().min(1),
  })
  .transform((data) => data as LikeOrDislikeInputDTO);
