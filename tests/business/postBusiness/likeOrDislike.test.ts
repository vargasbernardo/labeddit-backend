import { PostBusiness } from "../../../src/business/PostBusiness"
import { LikeOrDislikePostSchema } from "../../../src/dtos/posts/likeOrDislikePost.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('Teste de like ou dislike', () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test('deve aumentar o numero de like', async () => {
        const input = LikeOrDislikePostSchema.parse({
            like: true,
            token: 'token-mock',
            postId: 'id-mock'
        })
        const output = await postBusiness.likeOrDislikePost(input)

        expect(output).toEqual(undefined)
    })
    test('deve diminuir o numero de like', async () => {
        const input = LikeOrDislikePostSchema.parse({
            like: false,
            token: 'token-mock',
            postId: 'id-mock'
        })
        const output = await postBusiness.likeOrDislikePost(input)
        expect(output).toEqual(undefined)
    })
    test('deve retornar erro se o token for invalido', async () => {
        expect.assertions(2)
        try {
            const input = LikeOrDislikePostSchema.parse({
                like: true,
                token: 'token-mock-invalido',
                postId: 'id-mock'
            })
            await postBusiness.likeOrDislikePost(input)
        } catch (error: any) {
            if(error instanceof BadRequestError )
            expect(error.message).toBe("Requisição inválida")
            expect(error.statusCode).toBe(400)
        }
    })
})