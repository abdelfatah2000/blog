import App from './app';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import PostController from './post/post.controller';
import AuthController from './auth/auth.controller';

validateEnv();

const app = new App([new PostController(), new AuthController()]);

app.listen();
