import { PostDatabase } from "../database/PostDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/posts/createPost.dto";
import {
  DeletePostByIdInputDTO,
  DeletePostByIdOutputDTO,
} from "../dtos/posts/deletePostById.dto";
import {
  EditPostByIdInputDTO,
  EditPostByIdOutputDTO,
} from "../dtos/posts/editPostById.dto";
import {
  GetPostsInputDTO,
  GetPostsOutputDTO,
} from "../dtos/posts/getPosts.dto";
import {
  LikeOrDislikeInputDTO,
  LikeOrDislikeOutputDTO,
} from "../dtos/posts/likeOrDislikePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const id = this.idGenerator.generate();
    const post = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    );
    await this.postDatabase.createPost(post.toDBModel());
    const output: CreatePostOutputDTO = undefined;
    return output;
  };

  public getPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;
    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const PostDBCreatorName = await this.postDatabase.getPostsWithCreatorName();

    const posts = PostDBCreatorName.map((postWithCreator) => {
      const post = new Post(
        postWithCreator.id,
        postWithCreator.content,
        postWithCreator.likes,
        postWithCreator.dislikes,
        postWithCreator.created_at,
        postWithCreator.updated_at,
        postWithCreator.creator_id,
        postWithCreator.creator_name
      );
      return post.toBusinessModel();
    });
    const output: GetPostsOutputDTO = posts;
    return output;
  };

  public editPostById = async (
    input: EditPostByIdInputDTO
  ): Promise<EditPostByIdOutputDTO> => {
    const { content, token, idToEdit } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const postDB = await this.postDatabase.fetchPost(idToEdit);
    if (!postDB) {
      throw new NotFoundError();
    }

    if (payload.id !== postDB.creator_id) {
      throw new BadRequestError();
    }

    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.creator_id,
      payload.name
    );
    post.setContent(content);

    const updatedPostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatedPostDB);

    const output: CreatePostOutputDTO = undefined;
    return output;
  };

  public deletePostById = async (
    input: DeletePostByIdInputDTO
  ): Promise<DeletePostByIdOutputDTO> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const postDB = await this.postDatabase.fetchPost(idToDelete);
    if (!postDB) {
      throw new NotFoundError();
    }

    if (payload.id !== postDB.creator_id) {
      throw new BadRequestError();
    }

    await this.postDatabase.deletePostById(idToDelete);

    const output: DeletePostByIdOutputDTO = undefined;
    return output;
  };

  public likeOrDislikePost = async (
    input: LikeOrDislikeInputDTO
  ): Promise<LikeOrDislikeOutputDTO> => {
    const { like, token, postId } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError();
    }

    const postDBWithCreatorName =
      await this.postDatabase.fetchPostWithCreatorName(postId);
    if (!postDBWithCreatorName) {
      throw new NotFoundError();
    }

    const post = new Post(
      postDBWithCreatorName.id,
      postDBWithCreatorName.content,
      postDBWithCreatorName.likes,
      postDBWithCreatorName.dislikes,
      postDBWithCreatorName.created_at,
      postDBWithCreatorName.updated_at,
      postDBWithCreatorName.creator_id,
      postDBWithCreatorName.creator_name
    );
    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: like ? 1 : 0,
    };

    const likeDislikeExists = await this.postDatabase.findLikeDislike(
      likeDislikeDB
    );
    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislike();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislike();
        post.addLike();
      }
    } else {
      await this.postDatabase.insertLikeDislike(likeDislikeDB);
      like ? post.addLike() : post.addDislike();
    }
    const updatedPostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatedPostDB);

    const output: LikeOrDislikeOutputDTO = undefined;
    return output;
  };
}
