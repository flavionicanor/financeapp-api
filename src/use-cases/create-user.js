import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    // verificar se o email ja esta cadastrado
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
