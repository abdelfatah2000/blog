interface JWTPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export default JWTPayload