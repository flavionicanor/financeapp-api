import 'dotenv/config.js';
import express from 'express';
import { CreaUserController } from './src/controllers/create-user.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (req, res) => {
  const createUserController = new CreaUserController();
  const { statusCode, body } = await createUserController.execute(req);
  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`),
);
