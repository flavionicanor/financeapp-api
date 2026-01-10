import 'dotenv/config.js';
import express from 'express';
import {
  DeleteUserController,
  UpdateUserController,
} from './src/controllers/index.js';
import { DeleteUserUseCase, UpdateUserUseCase } from './src/use-cases/index.js';
import {
  PostgresDeleteUSerRepository,
  PostgresGetUserByEmailRepository,
  PostgresUpdateUserRepository,
} from './src/repositories/postgres/index.js';
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from './src/factories/controllers/user.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).send(body);
});

app.post('/api/users', async (req, res) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserController = makeDeleteUserController();

  const { statusCode, body } = await deleteUserController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`),
);
