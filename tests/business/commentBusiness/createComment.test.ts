import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { CreateCommentSchema } from "../../../src/dtos/comments/createComment.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"

describe('teste de criacao de comentarios', () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )
    test('deve conseguir criar um novo comentario', async() => {
        const input = CreateCommentSchema.parse({
            token: 'token-mock',
            postId: 'id-mock',
            content: 'conteudo novo'
        })
        const output = await commentBusiness.createComment(input)

        expect(output).toEqual(undefined)
    })
    test('deve retornar erro caso o token seja invalido', async() => {
        try {
            const input = CreateCommentSchema.parse({
                token: 'token-mock-invalido',
                postId: 'id-mock',
                content: 'conteudo novo'
            })
            await commentBusiness.createComment(input)
            
        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Requisição inválida")
            }
        }
        
    })
})