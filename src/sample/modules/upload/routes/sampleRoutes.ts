import { Request, Response, NextFunction, Router } from 'express';
import { FileUploaderMiddleware } from '../../../../middlewares/FileUploaderMiddleware';
import { FilesUploaderMiddleware } from '../../../../middlewares/FilesUploaderMiddleware';
import { FileUploaderController } from '../controllers/FileUploaderController';
import { FilesUploaderController } from '../controllers/FilesUploaderController';

const ALLOWED_TYPES = ['image/png', 'image/jgp', 'image/jgep'];
const MAX_FILE_SIZE_IN_MB = 7 * 1024 * 1024;
const BUCKET = process.env.BUCKET as string;
const fileUploaderMiddleware = new FileUploaderMiddleware(
  ALLOWED_TYPES,
  MAX_FILE_SIZE_IN_MB,
  BUCKET,
);
const filesUploaderMiddleware = new FilesUploaderMiddleware(
  ALLOWED_TYPES,
  MAX_FILE_SIZE_IN_MB,
  BUCKET,
);

export const sampleRoutes = Router();
const fileUploaderController = new FileUploaderController();
sampleRoutes.post(
  '/upload/file',
  (req: Request, res: Response, next: NextFunction) => {
    return fileUploaderMiddleware.handle(req, res, next);
  },
  (req: Request, res: Response) => {
    return fileUploaderController.handle(req, res);
  },
);

const filesUploaderController = new FilesUploaderController();
sampleRoutes.post(
  '/upload/files',
  (req: Request, res: Response, next: NextFunction) => {
    return filesUploaderMiddleware.handle(req, res, next);
  },
  (req: Request, res: Response) => {
    return filesUploaderController.handle(req, res);
  },
);
