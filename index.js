import 'dotenv/config.js';
import express from 'express';
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from './src/controllers/index.js';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from './src/use-cases/index.js';
import {
  PostgresCreateUserRepository,
  PostgresDeleteUSerRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from './src/repositories/postgres/index.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository(); // You should instantiate your actual repository here

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).send(body);
});

app.post('/api/users', async (req, res) => {
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();

  const postgresCreateUserRepository = new PostgresCreateUserRepository();

  const createUserUseCase = new CreateUserUseCase(
    postgresGetUserByEmailRepository,
    postgresCreateUserRepository,
  );

  const createUserController = new CreateUserController(createUserUseCase);
  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();
  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

  const updateUserUseCase = new UpdateUserUseCase(
    postgresGetUserByEmailRepository,
    postgresUpdateUserRepository,
  );

  const updateUserController = new UpdateUserController(updateUserUseCase);

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserRepository = new PostgresDeleteUSerRepository();

  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  const { statusCode, body } = await deleteUserController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`rodando na porta ${process.env.PORT}`),
);
