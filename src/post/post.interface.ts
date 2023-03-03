import { Document } from 'mongoose';
interface IPost extends Document {
  authorId: string;
  content: string;
  title: string;
}

export default IPost;
