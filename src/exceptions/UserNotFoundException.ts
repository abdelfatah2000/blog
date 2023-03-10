import HttpException from './HttpException';

class UserNotFoundException extends HttpException {
  constructor(email: string) {
    super(404, `User with ${email} not found`);
  }
}

export default UserNotFoundException;