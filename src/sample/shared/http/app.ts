import express, { Express } from 'express';
import { sampleRoutes } from '../../modules/upload/routes/sampleRoutes';

export class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(sampleRoutes);
  }
}
