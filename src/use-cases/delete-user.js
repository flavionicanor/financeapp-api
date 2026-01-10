import { PostgresDeleteUserRepository } from '../repositories/index.js';

export class DeleteUserUseCase {
  async execute(userId) {
    const deleteUserRepository = new PostgresDeleteUserRepository();

    const user = await deleteUserRepository.execute(userId);

    return user;
  }
}
