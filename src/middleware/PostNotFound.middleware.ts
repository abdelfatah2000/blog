import HttpException from '../exceptions/HttpException';

class PostNotFoundHandler extends HttpException {
  constructor(id: string) {
    super(404, `Post with id ${id} nor found`);
  }
}

export default PostNotFoundHandler;
