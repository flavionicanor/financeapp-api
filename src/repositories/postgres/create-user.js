import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    await PostgresHelper.query(
      'INSERT INTO users (id, firstname,lastname, email, password) VALUES ($1, $2, $3, $4, $5)',
      [
        createUserParams.id,
        createUserParams.firstname,
        createUserParams.lastname,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    const createdUser = await PostgresHelper.query(
      'SELECT * FROM users WHERE id = $1',
      [createUserParams.id],
    );

    return createdUser[0];
  }
}
