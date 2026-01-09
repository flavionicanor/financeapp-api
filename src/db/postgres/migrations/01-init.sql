CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- create type enum
DO $$
BEGIN
  IF NOT EXISTS(SELECT 1 FROM pg_type where typname = 'transaction_type') THEN
    CREATE TYPE transaction_type AS ENUM ('EARNING','EXPENSE','INVESTMENT');
  END IF;  
END$$;

CREATE TABLE IF NOT EXISTS transactions(
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  type transaction_type NOT NULL
);