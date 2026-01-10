import { badRequest, ok, serverError } from './helpers.js';
import validator from 'validator';
import { UpdateUserUseCase } from '../use-cases/update-user.js';

export class UpdateUserController {
  async execute(HttpRequest) {
    try {
      const userId = HttpRequest.params.userId;
      const isIdValid = validator.isUUID(userId);
      if (!isIdValid) {
        return badRequest({
          message: 'The provided ID is not valid.',
        });
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
        if (updateUserParams.password.length < 6) {
          return badRequest({
            message: `Password must be at least 6 characters long`,
          });
        }
      }

      if (updateUserParams.email) {
        // validar formato do email
        const isEmailValid = validator.isEmail(updateUserParams.email);
        if (!isEmailValid) {
          return badRequest({ message: 'Invalid email format' });
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
