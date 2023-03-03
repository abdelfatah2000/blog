import HttpException from './HttpException';

class PostNotFoundHandler extends HttpException {
  constructor(id: string) {
    super(404, `Post with id ${id} nor found`);
  }
}

export default PostNotFoundHandler;
