import z from 'zod'
import { PostModel } from '../../models/Post'

export interface GetPostByIdInputDTO {
    token: string,
    id: string
}

export type GetPostByIdOutputDTO = PostModel

export const GetPostByIdSchema = z.object({
    token: z.string(),
    id: z.string()
}).transform(data => data as GetPostByIdInputDTO)