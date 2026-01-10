import 'dotenv/config.js';
import express from 'express';
import {
  CreaUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from './src/controllers/index.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (req, res) => {
  const createUserController = new CreaUserController();
  const { statusCode, body } = await createUserController.execute(req);
  res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
  const updateUserController = new UpdateUserController();

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdController = new GetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserController = new DeleteUserController();

  const { statusCode, body } = await deleteUserController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`),
);
