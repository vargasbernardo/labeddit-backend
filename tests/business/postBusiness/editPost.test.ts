import { PostBusiness } from "../../../src/business/PostBusiness"
import { EditPostByIdSchema } from "../../../src/dtos/posts/editPostById.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('Teste de edicao de Posts', () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test('deve editar um post', async () => {
        const input = EditPostByIdSchema.parse({
            token: 'token-mock',
            idToEdit: 'id-mock',
            content: 'novo conteudo'
        })
        const output = await postBusiness.editPostById(input)
        expect(output).toEqual(undefined)

    })
    test('deve disparar erro se token nao for passado', async () => {
        expect.assertions(2)
        try {
            const input = EditPostByIdSchema.parse({
                token: 'e',
                idToEdit: 'id-mock',
                content: 'novo conteudo'
            })
            await postBusiness.editPostById(input)
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
            const input = EditPostByIdSchema.parse({
                token: 'token-mock',
                idToEdit: 'id-mock--',
                content: 'novo conteudo'
            })
            await postBusiness.editPostById(input)
        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("Recurso não encontrado")
                expect(error.statusCode).toBe(404)
            }
        }
    })
})