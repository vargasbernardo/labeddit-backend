import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { DeleteCommentSchema } from "../../../src/dtos/comments/deleteComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('teste para delecao de comentarios', () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )
    test('deve deletar um comentario com sucesso', async () => {
        const input = DeleteCommentSchema.parse({
            id: 'id-mock',
            token: 'token-mock'
        })
        const output = await commentBusiness.deleteComment(input)

        expect(output).toEqual(undefined)
    })
    test('deve retornar erro se o token nao for valido', async () => {
        try {
            const input = DeleteCommentSchema.parse({
                id: 'id-mock',
                token: 'token-mock-invalido'
            })
            await commentBusiness.deleteComment(input)
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toEqual("Requisição inválida")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
    test('deve retornar erro se o id nao for valido', async () => {
        try {
            const input = DeleteCommentSchema.parse({
                id: 'id-mock-invalido',
                token: 'token-mock'
            })
            await commentBusiness.deleteComment(input)
        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toEqual("Recurso não encontrado")
                expect(error.statusCode).toEqual(404)
            }
        }
    })
})