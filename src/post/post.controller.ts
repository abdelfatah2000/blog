import express, { Request, Response, NextFunction, Router } from 'express';
import PostNotFoundHandler from '../exceptions/PostNotFoundException';
import Controller from '../interfaces/controller.interface';
import Post from './post.interface';
import PostModel from './post.model';
import CreatePostDto from './post.dto';
import validator from '../middleware/validation.middleware';
import passport from 'passport';

class PostController implements Controller {
  public path = '/posts';
  public router = express.Router();
  private post = PostModel;

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.get(
      `${this.path}`,
      passport.authenticate('jwt', { session: false }),
      this.getAllPosts
    );
    this.router.get(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      this.getPostById
    );
    this.router.post(
      `${this.path}`,
      passport.authenticate('jwt', { session: false }),
      validator(CreatePostDto),
      this.createPost
    );
    this.router.put(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      validator(CreatePostDto),
      this.editPost
    );
    this.router.delete(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      this.deletePost
    );
  }

  private getAllPosts = (req: Request, res: Response) => {
    this.post.find().then((posts) => {
      res.send(posts);
    });
  };

  private getPostById = (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    this.post.findById(id).then((post) => {
      if (post) {
        res.send(post);
      } else {
        next(new PostNotFoundHandler(id));
      }
    });
  };

  private createPost = (req: Request, res: Response) => {
    const payload: Post = req.body;
    const createdPost = new this.post(payload);
    createdPost.save().then((post) => {
      res.send(post);
    });
  };

  private editPost = (req: Request, res: Response) => {
    const id = req.params.id;
    const payload: Post = req.body;
    this.post.findByIdAndUpdate(id, payload, { new: true }).then((post) => {
      res.send(post);
    });
  };

  private deletePost = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    this.post.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        res.send(200);
      } else {
        next(new PostNotFoundHandler(id));
      }
    });
  };
}

export default PostController;
