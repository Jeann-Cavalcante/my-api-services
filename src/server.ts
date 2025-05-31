import express from "express";
import prismaClient from "./prisma";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const userCount = await prismaClient.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database."
  );
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
