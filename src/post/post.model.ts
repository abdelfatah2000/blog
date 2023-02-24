import * as mongoose from 'mongoose';
import Post from './post.interface';

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

const PostModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);

export default PostModel;
