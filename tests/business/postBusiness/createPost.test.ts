import {PostBusiness} from '../../../src/business/PostBusiness'
import { CreatePostSchema } from '../../../src/dtos/posts/createPost.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { PostDatabaseMock } from '../../mocks/PostDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

describe("Teste de criacao de Post", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test("Deve criar um post", async () => {
        const input = CreatePostSchema.parse({
            content: "Teste",
            token: "token-mock"
        })
        const output = await postBusiness.createPost(input)

        expect(output).toEqual(undefined)
    })
    test("Deve retornar erro se nao passar token", async () => {
        try {
            const input = CreatePostSchema.parse({
                content: "Teste",
                token: "token"
            })
            await postBusiness.createPost(input)
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toEqual("Requisição inválida")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})