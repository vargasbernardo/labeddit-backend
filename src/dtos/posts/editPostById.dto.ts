import z from "zod";

export interface EditPostByIdInputDTO {
  content: string;
  token: string;
  idToEdit: string;
}

export type EditPostByIdOutputDTO = undefined;

export const EditPostByIdSchema = z
  .object({
    content: z.string().min(1),
    token: z.string().min(1),
    idToEdit: z.string().min(1),
  })
  .transform((data) => data as EditPostByIdInputDTO);
