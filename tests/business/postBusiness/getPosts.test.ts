import { string } from "zod"
import { PostBusiness } from "../../../src/business/PostBusiness"
import { GetPostsSchema } from "../../../src/dtos/posts/getPosts.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"

describe('Get Posts teste', () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),        
    )
    test('deve retornar uma lista de posts', async () => {
        const input = GetPostsSchema.parse({
            token: 'token-mock'
        })
        const output = await postBusiness.getPosts(input)

        expect(output).toHaveLength(2)
        expect(output).toEqual([
            {
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
            },
            {
                id: "id-mock2",
                content: "qualquer conteudo2",
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                likes: 0,
                dislikes: 0,
                creator: {
                  id: "id-mock2",
                  name: "Nirvana",
                }
            }
        ])
    })
})