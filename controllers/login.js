import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import apiShell from "../utils/apiShell.js";

const prisma = new PrismaClient();

const loginUser = async (res, req) => {
  await apiShell(res, async () => {
    const user = req.req.body;
    const userToCheck = await prisma.user.findUnique({
      "where": { "username": user.username },
    });

    if (!userToCheck) return res.status(404).json({ "msg": `User with username: ${user.username} doesn't exist!` });

    const verify = await argon2.verify(userToCheck.password, user.password);

    if (!verify) return res.status(400).json({ "msg": `Incorrect username or password!` });

    const sessionId = uuidv4();

    console.log(sessionId);

    return res.cookie("sessionId", sessionId, {
                "secure": true,
                "httpOnly": true,
                "sameSite": "none",
              })
              .status(200)
              .json({ "msg": `Authenticated as ${user.username}` });
  });
};

export { loginUser };