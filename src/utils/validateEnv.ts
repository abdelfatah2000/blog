import { cleanEnv, str, port } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    CONNECTION_STRING: str()
  })
}

export default validateEnv;