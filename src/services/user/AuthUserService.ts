import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

type AuthRequest = {
  email: string;
  password: string;
};

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Check if user exists
    const user = await prismaClient.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        isActive: true,
      },
    });

    if (!user) {
      throw new Error("Usuário nao encontrado");
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha ou email incorretos");
    }

    if (!user.isActive) {
      throw new Error("Usuário inativo");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: String(user.id),
        expiresIn: "1d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
