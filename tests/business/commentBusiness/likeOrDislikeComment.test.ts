import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { LikeOrDislikeCommentSchema } from "../../../src/dtos/comments/likeOrDislikeComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('teste de likes e dislikes de comentarios', () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )
    test('deve dar like em um comentario', async () => {
        const input = LikeOrDislikeCommentSchema.parse({
            like: true,
            token: 'token-mock',
            commentId: 'id-mock'
        })
        const output = await commentBusiness.likeOrDislikeComment(input)
        expect(output).toEqual(undefined)
    })
    test('deve dar dislike em um comentario', async () => {
        const input = LikeOrDislikeCommentSchema.parse({
            like: false,
            token: 'token-mock',
            commentId: 'id-mock'

        })
        const output = await commentBusiness.likeOrDislikeComment(input)
        expect(output).toEqual(undefined)
    })
    test('deve retornar erro se o token for invalido', async () => {
        try {
            const input = LikeOrDislikeCommentSchema.parse({
                like: false,
                token: 'token-mock-invalido',
                commentId: 'id-mock'
    
            })
            await commentBusiness.likeOrDislikeComment(input)
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toEqual("Requisição inválida")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
    test('deve retornar erro se o comentario nao existir', async () => {
        try {
            const input = LikeOrDislikeCommentSchema.parse({
                like: false,
                token: 'token-mock',
                commentId: 'id-mock-invalido'
    
            })
            await commentBusiness.likeOrDislikeComment(input)
        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toEqual("Recurso não encontrado")
                expect(error.statusCode).toEqual(404)
            }
        }
    })
})