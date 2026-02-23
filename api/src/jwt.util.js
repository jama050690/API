import jwt from "jsonwebtoken";

export function createJwtForUser(user) {
  return jwt.sign(
    {
      sub: user.id, // internal user id
      email: user.email,
      provider: user.provider, // LOCAL | GITHUB
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
      issuer: "your-app-name",
      audience: "your-app-users",
    },
  );
}
