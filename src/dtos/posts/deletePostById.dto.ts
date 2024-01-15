import z from "zod";

export interface DeletePostByIdInputDTO {
  idToDelete: string;
  token: string;
}

export type DeletePostByIdOutputDTO = undefined;

export const DeletePostByIdSchema = z.object({
  idToDelete: z.string().min(1),
  token: z.string().min(1),
});
