import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { EditCommentSchema } from "../../../src/dtos/comments/editComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('teste para edicao de comentarios', () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )
    test('deve ser capaz de editar um comentario com sucesso', async () => {
        const input = EditCommentSchema.parse({
            token: 'token-mock',
            commentId: 'id-mock',
            content: 'novo conteudo'
        })
        const output = await commentBusiness.editComment(input)
        expect(output).toEqual(undefined)
    })
    test('deve retornar erro se o token for invalido', async () => {
        try {
            const input = EditCommentSchema.parse({
                token: 'token-mock-invalido',
                commentId: 'id-mock',
                content: 'novo conteudo'
            })
            await commentBusiness.editComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Requisição inválida")
            }
        }
    })
    test('deve retornar erro se o comentario nao existir', async () => {
        try {
            const input = EditCommentSchema.parse({
                token: 'token-mock',
                commentId: 'id-mock-invalido',
                content: 'novo conteudo'
            })
            await commentBusiness.editComment(input)
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("Recurso não encontrado")
            }
        }
    })
})