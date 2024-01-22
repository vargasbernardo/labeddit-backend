import { PostBusiness } from "../../../src/business/PostBusiness"
import { GetPostByIdSchema } from "../../../src/dtos/posts/getPostById.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { Post } from "../../../src/models/Post"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('Get Post By Id teste', () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test('Deve retornar um post pelo id', async () => {
        const input = GetPostByIdSchema.parse({
            token: 'token-mock',
            id: 'id-mock'
        })
        const output = await postBusiness.getPostById(input)
        expect(output).toEqual({
            id: "id-mock",
            content: "qualquer conteudo",
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            likes: 0,
            dislikes: 0,
            creator: {
              id: "id-mock",
              name: "Maneskin",
            }
        })
    })
    test('Deve retornar erro se o token não for passado', async () => {
        expect.assertions(2)
        try {
            const input = GetPostByIdSchema.parse({
                token: '',
                id: 'id-mock'
            })
            await postBusiness.getPostById(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('Requisição inválida')
            }
        }
    })
    test('Deve retornar erro se o id não for passado, ou nao encontrado', async () => {
        try {
            const input = GetPostByIdSchema.parse({
                token: 'token-mock',
                id: ''
            })
            await postBusiness.getPostById(input)
        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe('Recurso não encontrado')
            }
        }
    })
}) 