import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js';

import { EmailAlreadyInUseError } from '../errors/userEmail.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    // verificar se o email ja esta cadastrado
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();

    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    // gerar ID do usuario
    const userId = uuidv4();

    // criptogrfar a senha
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    // gravar usuario no banco de dados
    const newUSer = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(newUSer);
    return createdUser;
  }
}
