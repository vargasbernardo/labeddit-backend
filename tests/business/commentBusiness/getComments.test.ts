import {CommentBusiness} from '../../../src/business/CommentBusiness'
import { GetCommentsSchema } from '../../../src/dtos/comments/getComments.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { CommentDatabaseMock } from '../../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

describe('Teste para Get Comments', () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )
    test('Deve retornar uma lista de comentarios', async () => {
        const input = GetCommentsSchema.parse({
            token: 'token-mock'
        })
        const output = await commentBusiness.getComments(input)

        
        expect(output).toHaveLength(2)
        expect(output).toEqual([
            {
                id: 'id-mock',
                creatorId: 'id-mock',
                postId: 'id-mock',
                content: 'Conteudo mockado',
                likes: 0,
                dislikes: 0,
            },
            {
                id: 'id-mock-2',
                creatorId: 'id-mock-2',
                postId: 'id-mock-2',
                content: 'Conteudo mockado 2',
                likes: 0,
                dislikes: 0,
            }
        ])
    })
    test('Deve retornar erro caso o token seja invalido', async () => {
        expect.assertions(2)
        try {
            const input = GetCommentsSchema.parse({
                token: 'token-mock-errado'
            })
            await commentBusiness.getComments(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toBe("Requisição inválida")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})