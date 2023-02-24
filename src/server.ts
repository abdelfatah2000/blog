import App from './app';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import PostController from './post/post.controller';

validateEnv();

const app = new App(
  [
    new PostController(),
  ]
);

app.listen();