import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors/userEmail.js';

export class UpdateUserUseCase {
  constructor(postgresGetUserByEmailRepository, postgresUpdateUserRepository) {
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
    this.postgresUpdateUserRepository = postgresUpdateUserRepository;
  }

  async execute(userId, updateUserParams) {
    // verificar se o email esta sendo atualizado
    if (updateUserParams.email) {
      const userWithProvidedEmail =
        await this.postgresGetUserByEmailRepository.execute(
          updateUserParams.email,
        );

      if (userWithProvidedEmail) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const user = {
      ...updateUserParams,
    };

    // verificar se a senha esta sendo atualizada
    if (updateUserParams.password) {
      // criptogrfar a senha
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    // chamar o repository
    const updatedUser = await this.postgresUpdateUserRepository.execute(
      userId,
      user,
    );
    return updatedUser;
  }
}
