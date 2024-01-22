import { BaseDatabase } from "../../src/database/BaseDatabase";
import {CommentDB, LikesDislikeDB, COMMENT_LIKE, Comment} from '../../src/models/Comment'


const commentsMock: Array<CommentDB> = [
    {
        id: 'id-mock',
        creator_id: 'id-mock',
        post_id: 'id-mock',
        content: 'Conteudo mockado',
        likes: 0,
        dislikes: 0,
    },
    {
        id: 'id-mock-2',
        creator_id: 'id-mock-2',
        post_id: 'id-mock-2',
        content: 'Conteudo mockado 2',
        likes: 0,
        dislikes: 0,
    }
]
export class CommentDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_COMMENTS_LIKES_DISLIKES = "comments_likes_dislikes"
    
    public getComments = async (): Promise<Array<CommentDB>> => {
        const output = commentsMock.map(comment => comment)
        return output
    }

    public createComment = async (commentDB: CommentDB): Promise<void> => {

    }

    public findCommentById = async (id: string): Promise<CommentDB | undefined> => {
        return commentsMock.filter(comment => comment.id === id)[0]
    }

    public updateComment = async (commentDB: CommentDB): Promise<void> => {}

    public deleteCommentById = async (id: string): Promise<void> => {
        await BaseDatabase.connection(CommentDatabaseMock.TABLE_COMMENTS).delete().where("id", id)
    }

    public findLikeDislike = async (likeDislikeDB: LikesDislikeDB): Promise<COMMENT_LIKE | undefined> => {
        const [result] = await BaseDatabase.connection(CommentDatabaseMock.TABLE_COMMENTS_LIKES_DISLIKES).select().where({user_id: likeDislikeDB.user_id, comment_id: likeDislikeDB.comment_id})
        if (result === undefined) {
            return undefined;
          } else if (result.like === 1) {
            return COMMENT_LIKE.ALREADY_LIKED;
          } else {
            return COMMENT_LIKE.ALREADY_DISLIKED;
          }
    }

    public removeLikeDislike = async(likeDislikeDB: LikesDislikeDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabaseMock.TABLE_COMMENTS_LIKES_DISLIKES).delete().where({user_id: likeDislikeDB.user_id, comment_id: likeDislikeDB.comment_id})
    }

    public updateLikeDislike = async(likeDislikeDB: LikesDislikeDB):Promise<void> => {
        await BaseDatabase.connection(CommentDatabaseMock.TABLE_COMMENTS_LIKES_DISLIKES).update(likeDislikeDB).where({user_id: likeDislikeDB.user_id, comment_id: likeDislikeDB.comment_id})
    }

    public insertLikeDislike = async(likeDislikeDB: LikesDislikeDB): Promise<void> => {}
}