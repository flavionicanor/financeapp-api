import { CreateUserUseCase } from '../use-cases/create-user.js';
import { badRequest, created, serverError } from './helpers/http.js';
import { EmailAlreadyInUseError } from '../errors/userEmail.js';
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidPasswordResponse,
} from './helpers/user.js';

export class CreaUserController {
  async execute(httpRequest) {
    const params = httpRequest.body;

    // validar requisicao de campos obrigatorios, tamanho de senha e email
    const requiredFields = ['firstname', 'lastname', 'email', 'password'];
    for (const field of requiredFields) {
      if (!params[field] || params[field].trim().length === 0) {
        return badRequest({ message: `Field ${field} is required` });
      }
    }

    // validar tamanho da senha
    const passwordIsValid = checkIfPasswordIsValid(params.password);

    if (!passwordIsValid) {
      return invalidPasswordResponse();
    }

    // validar formato do email
    const emailIsValid = checkIfEmailIsValid(params.email);

    if (!emailIsValid) {
      return emailIsAlreadyInUseResponse();
    }

    // chamar UseCase de criar usuario
    const createUserUseCase = new CreateUserUseCase();
    try {
      const user = await createUserUseCase.execute(params);

      // retornar resposta ao usuario
      return created(user);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.error('Error creating user:', error);
      return serverError();
    }
  }
}
