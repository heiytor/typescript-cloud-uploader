import { Request, Response } from 'express';

export class FilesUploaderController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.files) {
        return res
          .status(400)
          .json({ success: false, errors: ["You don't submit any file."] });
      }
      return res.json({ files: req.files, success: true });
    } catch (err: any) {
      if (process.env.NODE_ENV === 'development') console.log(err);
      return res.status(500).json({ errors: err.message, success: false });
    }
  }
}
