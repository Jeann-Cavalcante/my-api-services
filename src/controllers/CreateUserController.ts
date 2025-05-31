import { Request, Response } from "express";
import { CreateUserService } from "../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }

    try {
      // Call the service to create the user
      const userService = new CreateUserService();

      const user = await userService.execute({
        name,
        email,
        password,
        isActive: true,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export { CreateUserController };
