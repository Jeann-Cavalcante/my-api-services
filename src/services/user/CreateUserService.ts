import { hash } from "bcryptjs";

import prismaClient from "../../prisma";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
};

class CreateUserService {
  async execute({ name, email, password, isActive = true }: User) {
    // Check if user already exists
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    // Hash the password
    const passwordHash = await hash(password, 8);

    // Create the user
    const user = await prismaClient.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: passwordHash,
        isActive,
      },
    });

    return user;
  }
}

export { CreateUserService };
