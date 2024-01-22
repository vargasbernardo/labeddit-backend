import { BaseDatabase } from "../../src/database/BaseDatabase";
import {
  LikeDislikeDB,
  POST_LIKE,
  PostDB,
  PostDBWithCreatorName,
} from "../../src/models/Post";

const postsMock: Array<PostDBWithCreatorName> = [
    {
        id: "id-mock",
        creator_id: "id-mock",
        content: "qualquer conteudo",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_name: "Maneskin"
    },
    {
        id: "id-mock2",
        creator_id: "id-mock2",
        content: "qualquer conteudo2",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_name: "Nirvana"
    },
]

export class PostDatabaseMock extends BaseDatabase {
  public static TABLE_POSTS = "posts";
  public static TABLE_POSTS_LIKES_DISLIKES = "posts_likes_dislikes";

  public createPost = async (postDB: PostDB): Promise<void> => {};

  public getPostsWithCreatorName = async (): Promise<PostDBWithCreatorName[]> => {
    const output =  postsMock.map(post => post)
    return output
  };

  public fetchPost = async (idToEdit: string): Promise<PostDB | undefined> => {
    return postsMock.filter(post => post.id === idToEdit)[0]
  };

  public updatePost = async (postDB: PostDB): Promise<void> => {};

  public deletePostById = async (idToDelete: string): Promise<void> => {
    await BaseDatabase.connection(PostDatabaseMock.TABLE_POSTS).delete().where("id", idToDelete)
  };
  public fetchPostWithCreatorName = async (
    id: string
  ): Promise<PostDBWithCreatorName | undefined> => {
    return postsMock.filter((post) => post.id === id)[0];
  };

  public findLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<POST_LIKE | undefined> => {
    const [result] = await BaseDatabase.connection(PostDatabaseMock.TABLE_POSTS_LIKES_DISLIKES).select().where({user_id: likeDislikeDB.user_id, post_id: likeDislikeDB.post_id})

    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  };

  public removeLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostDatabaseMock.TABLE_POSTS_LIKES_DISLIKES).delete().where({user_id: likeDislikeDB.user_id, post_id: likeDislikeDB.post_id})

  };

  public updateLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostDatabaseMock.TABLE_POSTS_LIKES_DISLIKES).update(likeDislikeDB).where({user_id: likeDislikeDB.user_id, post_id: likeDislikeDB.post_id})
  };

  public insertLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    
  };
}
