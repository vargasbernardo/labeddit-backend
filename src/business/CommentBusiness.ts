import { CommentDatabase } from "../database/CommentDatabase";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/comments/createComment.dto";
import {
  DeleteCommentInputDTO,
  DeleteCommentOutputDTO,
} from "../dtos/comments/deleteComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comments/editComment.dto";
import {
  GetCommentsInputDTO,
  GetCommentsOutputDTO,
} from "../dtos/comments/getComments.dto";
import { LikeOrDislikeCommentInputDTO } from "../dtos/comments/likeOrDislikeComment.dto";
import { LikeOrDislikeOutputDTO } from "../dtos/posts/likeOrDislikePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { COMMENT_LIKE, Comment, LikesDislikeDB } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness {
  constructor(
    private commentDatabase: CommentDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }
    const CommentsDB = await this.commentDatabase.getComments();
    const comments = CommentsDB.map((commentDB) => {
      const comment = new Comment(
        commentDB.id,
        commentDB.creator_id,
        commentDB.post_id,
        commentDB.content,
        commentDB.likes,
        commentDB.dislikes
      );
      return comment.toBusinessModel();
    });
    const output = comments;
    return output;
  };

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {
    const { token, content, postId } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const id = this.idGenerator.generate();
    const comment = new Comment(id, payload.id, postId, content, 0, 0);
    await this.commentDatabase.createComment(comment.toDBModel());
    const output: CreateCommentOutputDTO = comment.toBusinessModel();
    return output;
  };

  public editComment = async (input: EditCommentInputDTO): Promise<EditCommentOutputDTO> => {
    const { token, content, commentId } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const commentDB = await this.commentDatabase.findCommentById(commentId);
    if (!commentDB) {
      throw new NotFoundError();
    }
    if (payload.id !== commentDB.creator_id) {
      throw new BadRequestError();
    }

    const comment = new Comment(
      commentDB.id,
      commentDB.creator_id,
      commentDB.post_id,
      commentDB.content,
      commentDB.likes,
      commentDB.dislikes
    );
    comment.setContent(content);

    const updatedCommentDB = comment.toDBModel();
    await this.commentDatabase.updateComment(updatedCommentDB);

    const output: EditCommentOutputDTO = undefined;
    return output;
  };

  public deleteComment = async (
    input: DeleteCommentInputDTO
  ): Promise<void> => {
    const { token, id } = input;
    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const commentDB = await this.commentDatabase.findCommentById(id);
    if (!commentDB) {
      throw new NotFoundError();
    }

    if (payload.id !== commentDB.creator_id) {
      throw new BadRequestError();
    }

    await this.commentDatabase.deleteCommentById(id);

    const output: DeleteCommentOutputDTO = undefined;
    return output;
  };

  public likeOrDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<LikeOrDislikeOutputDTO> => {
    const { token, like, commentId } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }
    const commentDB = await this.commentDatabase.findCommentById(commentId);
    if (!commentDB) {
      throw new NotFoundError();
    }

    const comment = new Comment(
      commentDB.id,
      commentDB.creator_id,
      commentDB.post_id,
      commentDB.content,
      commentDB.likes,
      commentDB.dislikes
    );
    const likeDislikeDB: LikesDislikeDB = {
      user_id: payload.id,
      comment_id: commentId,
      like: like ? 1 : 0,
    };

    const likeDislikeExists = await this.commentDatabase.findLikeDislike(
      likeDislikeDB
    );
    if (likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.commentDatabase.removeLikeDislike(likeDislikeDB);
        comment.removeLike();
      } else {
        await this.commentDatabase.updateLikeDislike(likeDislikeDB);
        comment.removeLike();
        comment.addDislike();
      }
    } else if (likeDislikeExists === COMMENT_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.commentDatabase.removeLikeDislike(likeDislikeDB);
        comment.removeDislike();
      } else {
        await this.commentDatabase.updateLikeDislike(likeDislikeDB);
        comment.removeDislike();
        comment.addLike();
      }
    } else {
      await this.commentDatabase.insertLikeDislike(likeDislikeDB);
      like ? comment.addLike() : comment.addDislike();
    }
    const updateCommentDB = comment.toDBModel();
    await this.commentDatabase.updateComment(updateCommentDB);

    const output: LikeOrDislikeOutputDTO = undefined;
    return output;
  };
}
