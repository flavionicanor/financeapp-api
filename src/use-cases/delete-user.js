import { PostgresDeleteUSer } from '../repositories/postgres/index.js';

export class DeleteUserUseCase {
  async execute(userId) {
    const deleteUserRepository = new PostgresDeleteUSer();

    const user = await deleteUserRepository.execute(userId);

    return user;
  }
}
