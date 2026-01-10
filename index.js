import 'dotenv/config.js';
import express from 'express';
import { CreaUserController } from './src/controllers/create-user.js';
import { GetUserByIdController } from './src/controllers/get-user-by-id.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (req, res) => {
  const createUserController = new CreaUserController();
  const { statusCode, body } = await createUserController.execute(req);
  res.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdController = new GetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`),
);
