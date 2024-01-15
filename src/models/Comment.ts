export interface CommentDB {
  id: string;
  creator_id: string;
  post_id: string;
  content: string;
  likes: number;
  dislikes: number;
}

export interface LikesDislikeDB {
  user_id: string;
  comment_id: string;
  like: number;
}

export interface CommentDBWithCreatorName {
  id: string;
  creator_id: string;
  post_id: string;
  content: string;
  likes: number;
  dislikes: number;
  creator_name: string;
}

export interface CommentModel {
  id: string;
  creatorId: string;
  postId: string;
  content: string;
  likes: number;
  dislikes: number;
}

export enum COMMENT_LIKE {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKED = "ALREADY DISLIKED",
}

export class Comment {
  constructor(
    private id: string,
    private creatorId: string,
    private postId: string,
    private content: string,
    private likes: number,
    private dislikes: number
  ) {}

  public getId(): string {
    return this.id;
  }
  public setId(value: string): void {
    this.id = value;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }
  public setCreatorId(value: string): void {
    this.creatorId = value;
  }

  public getPostId(): string {
    return this.postId;
  }
  public setPostId(value: string): void {
    this.postId = value;
  }

  public getContent(): string {
    return this.content;
  }
  public setContent(value: string): void {
    this.content = value;
  }

  public getLikes(): number {
    return this.likes;
  }
  public setLikes(value: number): void {
    this.likes = value;
  }

  public addLike = (): void => {
    this.likes++;
  };
  public removeLike = (): void => {
    this.likes--;
  };

  public getDislikes(): number {
    return this.dislikes;
  }
  public setDislikes(value: number): void {
    this.dislikes = value;
  }

  public addDislike = (): void => {
    this.dislikes++;
  };
  public removeDislike = (): void => {
    this.dislikes--;
  };

  public toDBModel = (): CommentDB => {
    return {
      id: this.id,
      creator_id: this.creatorId,
      post_id: this.postId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
    };
  };
  public toBusinessModel(): CommentModel {
    return {
      id: this.id,
      creatorId: this.creatorId,
      postId: this.postId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
    };
  }
}

// id TEXT PRIMARY KEY UNIQUE NOT NULL,
// creator_id TEXT NOT NULL,
// post_id TEXT NOT NULL,
// content TEXT NOT NULL,
// likes INTEGER DEFAULT(0) NOT NULL,
// dislikes INTEGER DEFAULT(0) NOT NULL,
