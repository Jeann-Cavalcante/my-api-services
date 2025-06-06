import { Request, Response, Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import prismaClient from "../prisma";
import { AuthUserController } from "../controllers/AuthUserController";

const router = Router();
// const createUserController = new CreateUserController();

router.get("/", async (req, res) => {
  const userCount = await prismaClient.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database. Total users: " + userCount
  );
});

router.post("/users", new CreateUserController().handle);

router.post("/auth", new AuthUserController().handle);

// router.post("/users", async (req: Request, res: Response) => {
//   await createUserController.handle(req, res);
// });

export { router };
