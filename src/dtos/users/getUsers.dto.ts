import z from 'zod'
import { UserModel } from '../../models/User'

export interface GetUsersInputDTO {
    token: string,
}

export type GetUsersOutputDTO = Array<UserModel>

export const GetUsersSchema = z.object({
    token: z.string()
}).transform(data => data as GetUsersInputDTO)