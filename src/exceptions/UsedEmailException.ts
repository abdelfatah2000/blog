import HttpException from './HttpException';

class UsedEmailException extends HttpException {
  constructor() {
    super(400, 'This email is already used');
  }
}

export default UsedEmailException;
