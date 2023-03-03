import * as mongoose from 'mongoose';
import IPost from './post.interface';

const postSchema = new mongoose.Schema(
  {
    author: String,
    title: String,
    body: String,
  },
  {
    timestamps: true,
  }
);

const PostModel: mongoose.Model<IPost> = mongoose.model<IPost>(
  'Post',
  postSchema
);

export default PostModel;
