import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import { S3Config } from '../config/s3Config';

export class FileUploaderMiddleware {
  private upload: multer.Multer | undefined;

  constructor(
    private ALLOWED_TYPES: string[],
    private MAX_FILE_SIZE: number,
    private BUCKET: string,
  ) {}

  private fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => {
    if (this.ALLOWED_TYPES.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'));
    }
  };

  private storage = () => {
    return multerS3({
      s3: S3Config.S3,
      bucket: this.BUCKET,
      acl: 'public-read',
      contentType: function (req, file, cb) {
        cb(null, file.mimetype);
      },
      metadata: function (req, file, cb) {
        const metadata = {
          fieldName: file.fieldname,
          'Content-Type': file.mimetype,
        };
        cb(null, metadata);
      },
      key: function (req, file, cb) {
        crypto.randomBytes(4, (err, buffer) => {
          if (err) cb(err, '');
          let fileName = file.originalname;
          if (fileName.includes(':')) {
            fileName = fileName.replace(/:/g, '!');
          }
          cb(
            null,
            `${buffer.toString('hex')}:${Date.now().toString()}:${fileName}`,
          );
        });
      },
    });
  };

  private limits = () => {
    return {
      fileSize: this.MAX_FILE_SIZE,
    };
  };

  private setupUpload() {
    return (this.upload = multer({
      limits: this.limits(),
      storage: this.storage(),
      fileFilter: this.fileFilter,
    }));
  }

  public handle(req: Request, res: Response, next: NextFunction) {
    try {
      this.setupUpload();
      return this.upload!.single('file')(req, res, (err: any) => {
        if (err) {
          return res
            .status(400)
            .json({ errors: [err.message], success: false });
        }
        return next();
      });
    } catch (err) {
      return res
        .status(500)
        .json({ errors: ['Something is wrong with multer'], success: false });
    }
  }
}
