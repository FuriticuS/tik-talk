import {ProfileInterface} from './profile.interface';

export interface PostCreateDto {
  title: string,
  content: string,
  authorId: number,
  communityId: number
}

export interface Post {
  id: number,
  title: string,
  communityId: number,
  content: string,
  author: ProfileInterface,
  images: string[],
  createdAt: string,
  updatedAt: string,
  likes: number,
  comments: Comment
}

export interface Comment {
  id: number,
  text: string,
  author: {
    id: number,
    username: string,
    avatarUrl: string,
    subscribersAmount: number
  },
  postId: number,
  commentId: number,
  createdAt: string,
  updatedAt: string
}
