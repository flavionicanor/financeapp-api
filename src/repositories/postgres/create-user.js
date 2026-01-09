import { PostgresHelper } from '../postgres-helper.js';

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    const result = await PostgresHelper.query(
      'INSERT INTO users (id, firstname,lastname, email, password) VALUES ($1, $2, $3, $4, $5)',
      [
        createUserParams.id,
        createUserParams.firstname,
        createUserParams.lastname,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    return result[0];
  }
}
