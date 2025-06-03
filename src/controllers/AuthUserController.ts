import { AuthUserService } from "../services/user/AuthUserService";

class AuthUserController {
  async handle(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    try {
      const authUserService = new AuthUserService();
      const user = await authUserService.execute({ email, password });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { AuthUserController };
