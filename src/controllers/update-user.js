import { UpdateUserUseCase } from '../use-cases/update-user.js';
import {
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  badRequest,
  ok,
  serverError,
} from './helpers/index.js';

export class UpdateUserController {
  async execute(HttpRequest) {
    try {
      const userId = HttpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const updateUserParams = HttpRequest.body;

      const allowedFields = ['firstname', 'lastname', 'email', 'password'];

      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provider field is not allowed',
        });
      }

      if (updateUserParams.password) {
        // validar tamanho da senha
        const passwordIsValid = checkIfPasswordIsValid(
          updateUserParams.password,
        );

        if (!passwordIsValid) {
          return invalidPasswordResponse();
        }
      }

      if (updateUserParams.email) {
        // validar formato do email
        const emailIsValid = checkIfEmailIsValid(updateUserParams.email);

        if (!emailIsValid) {
          return emailIsAlreadyInUseResponse();
        }
      }

      // chamar UseCase de atualizar usuario
      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(
        userId,
        updateUserParams,
      );

      return ok(updatedUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
