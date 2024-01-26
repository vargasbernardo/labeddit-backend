import z from "zod";
import { PostModel } from "../../models/Post";

export interface EditPostByIdInputDTO {
  content: string;
  token: string;
  idToEdit: string;
}

export type EditPostByIdOutputDTO = PostModel;

export const EditPostByIdSchema = z
  .object({
    content: z.string().min(1),
    token: z.string().min(1),
    idToEdit: z.string().min(1),
  })
  .transform((data) => data as EditPostByIdInputDTO);
