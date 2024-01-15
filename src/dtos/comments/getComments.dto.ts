import z from "zod";
import { CommentModel } from "../../models/Comment";

export interface GetCommentsInputDTO {
  token: string;
}

export type GetCommentsOutputDTO = Array<CommentModel>;

export const GetCommentsSchema = z
  .object({
    token: z.string().min(1),
  })
  .transform((data) => data as GetCommentsInputDTO);
