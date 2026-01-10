import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { EmailAlreadyInUseError } from '../errors/userEmail.js';
export class CreateUserUseCase {
  constructor(postgresGetUserByEmailRepository, postgresCreateUserRepository) {
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
    this.postgresCreateUserRepository = postgresCreateUserRepository;
  }

  async execute(createUserParams) {
    const userWithProvidedEmail =
      await this.postgresGetUserByEmailRepository.execute(
        createUserParams.email,
      );

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const newUSer = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const createdUser =
      await this.postgresCreateUserRepository.execute(newUSer);
    return createdUser;
  }
}
