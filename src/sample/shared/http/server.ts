import { App } from './app';

const app = new App();
const port = process.env.PORT || 3333;

app.server.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Listining on port ${port}`);
  }
});
