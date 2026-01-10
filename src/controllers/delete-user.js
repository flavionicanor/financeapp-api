import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async execute(HttpRequest) {
    try {
      const userId = HttpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const deleteUser = await this.deleteUserUseCase.execute(userId);

      if (!deleteUser) {
        return userNotFoundResponse();
      }

      return ok(deleteUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
