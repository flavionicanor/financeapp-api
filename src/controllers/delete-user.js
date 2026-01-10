import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';
import { DeleteUserUseCase } from '../use-cases/index.js';

export class DeleteUserController {
  async execute(HttpRequest) {
    try {
      const userId = HttpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const deleteUserUseCase = new DeleteUserUseCase();

      const deleteUser = await deleteUserUseCase.execute(userId);

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
