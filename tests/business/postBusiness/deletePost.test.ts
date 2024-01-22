import { PostBusiness } from "../../../src/business/PostBusiness"
import { DeletePostByIdSchema } from "../../../src/dtos/posts/deletePostById.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('Teste de delecao de post', () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test('Deve deletar um post com sucesso', async () => {
        const input = DeletePostByIdSchema.parse({
            idToDelete: 'id-mock',
            token: 'token-mock'
        })

        const output = await postBusiness.deletePostById(input)
        expect(output).toEqual(undefined)
    })
    test('deve disparar erro se token nao for passado', async () => {
        expect.assertions(2)
        try {
            const input = DeletePostByIdSchema.parse({
                idToDelete: 'id-mock',
                token: 'e',
                
            })
            await postBusiness.deletePostById(input)
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("Requisição inválida")
                expect(error.statusCode).toBe(400)
            }
        }
    })
    test('deve disparar erro se o id passado nao for encontrado', async () => {
        expect.assertions(2)
        try {
            const input = DeletePostByIdSchema.parse({
                token: 'token-mock',
                idToDelete: 'id-mock--',
            })
            await postBusiness.deletePostById(input)
        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("Recurso não encontrado")
                expect(error.statusCode).toBe(404)
            }
        }
    })
})