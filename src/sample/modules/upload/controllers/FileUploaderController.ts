import { Request, Response } from 'express';

export class FileUploaderController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, errors: ["You don't submit any file."] });
      }
      return res.json({ file: req.file, success: true });
    } catch (err: any) {
      if (process.env.NODE_ENV === 'development') console.log(err);
      return res.status(500).json({ errors: err.message, success: false });
    }
  }
}
