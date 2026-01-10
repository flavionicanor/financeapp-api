import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';
import { badRequest, created, serverError } from './helpers.js';
import { EmailAlreadyInUseError } from '../errors/userEmail.js';

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
    if (params.password.length < 6) {
      return badRequest({
        message: `Password must be at least 6 characters long`,
      });
    }

    // validar formato do email
    const isEmailValid = validator.isEmail(params.email);
    if (!isEmailValid) {
      return badRequest({ message: 'Invalid email format' });
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
