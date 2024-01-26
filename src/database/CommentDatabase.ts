import { COMMENT_LIKE, CommentDB, CommentDBWithCreatorName, LikesDislikeDB } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentDatabase extends BaseDatabase {
  public static TABLE_COMMENTS = "comments";
  public static TABLE_COMMENTS_LIKES_DISLIKES = "comments_likes_dislikes";

  public getComments = async (): Promise<Array<CommentDB>> => {
    const result = await BaseDatabase.connection(
      CommentDatabase.TABLE_COMMENTS
    ).select();

    return result;
  };

  public getCommentsWithCreatorName = async (): Promise<Array<CommentDBWithCreatorName>> => {
    const result = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).select(
      `${CommentDatabase.TABLE_COMMENTS}.id`,
      `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
      `${CommentDatabase.TABLE_COMMENTS}.post_id`,
      `${CommentDatabase.TABLE_COMMENTS}.content`,
      `${CommentDatabase.TABLE_COMMENTS}.likes`,
      `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
      `${UserDatabase.TABLE_USERS}.name as creator_name`
    )
    .join(
      `${UserDatabase.TABLE_USERS}`,
      `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
      "=",
      `${UserDatabase.TABLE_USERS}.id`
    )
    return result as Array<CommentDBWithCreatorName>;
  }

  public createComment = async (commentDB: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(
      commentDB
    );
  };

  public findCommentById = async (
    id: string
  ): Promise<CommentDB | undefined> => {
    const [result] = await BaseDatabase.connection(
      CommentDatabase.TABLE_COMMENTS
    )
      .select()
      .where("id", id);
    return result as CommentDB | undefined;
  };

  public updateComment = async (commentDB: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .update(commentDB)
      .where("id", commentDB.id);
  };

  public deleteCommentById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .delete()
      .where("id", id);
  };

  public findLikeDislike = async (
    likeDislikeDB: LikesDislikeDB
  ): Promise<COMMENT_LIKE | undefined> => {
    const [result]: Array<LikesDislikeDB | undefined> =
      await BaseDatabase.connection(
        CommentDatabase.TABLE_COMMENTS_LIKES_DISLIKES
      )
        .select()
        .where({
          user_id: likeDislikeDB.user_id,
          comment_id: likeDislikeDB.comment_id,
        });
    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED;
    } else {
      return COMMENT_LIKE.ALREADY_DISLIKED;
    }
  };

  public removeLikeDislike = async (
    likeDislikeDB: LikesDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        comment_id: likeDislikeDB.comment_id,
      });
  };

  public updateLikeDislike = async (
    likeDislikeDB: LikesDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        comment_id: likeDislikeDB.comment_id,
      });
  };

  public insertLikeDislike = async (
    likeDislike: LikesDislikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(
      CommentDatabase.TABLE_COMMENTS_LIKES_DISLIKES
    ).insert(likeDislike);
  };
}
