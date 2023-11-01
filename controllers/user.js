import { PrismaClient } from "@prisma/client";
import apiShell from "../utils/apiShell.js";
import hash from "../utils/hash.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  req.body["password"] = await hash(req.body["password"]);
  
  if (!req.body["icon"]) req.body["icon"] = `https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${req.body["username"]}&scale=90`;

  await apiShell(res, async () => {
    await prisma.user.create({
      "data": { ...req.body },
    });

    return res.status(200).json({ "msg": "User successfully created!" });
  });
};

const getUsers = async (req, res) => {
  await apiShell(res, async () => {
    const users = await prisma.user.findMany();

    if (users.length === 0) return res.status(404).json({ "msg": "No users found" });

    return res.status(200).json({ "data": users, });
  });
};

const getUser = async (req, res) => {
  await apiShell(res, async () => {
    const user = await prisma.user.findUnique({
      "where": { "id": Number(req.params.id) }
    });

    if (!user) return res.status(404).json({ "msg": `No user with id: ${req.params.id} found` });

    return res.status(200).json({ "data": user, });
  });
};

const updateUser = async (req, res) => {
  await apiShell(res, async () => {
    let user = await prisma.user.findUnique({
      "where": { "id": Number(req.params.id) }
    });

    if (!user) return res.status(404).json({ "msg": `No user with id: ${req.params.id} found` });

    user = await prisma.user.update({
      "where": { "id": Number(req.params.id) },
      "data": { ...req.body },
    });

    return res.status(200).json({ 
      "msg": `User with id: ${req.params.id} was updated successfully!`,
      "data": user,
    });
  });
};

const deleteUser = async (req, res) => {
  await apiShell(res, async () => {
    const user = await prisma.user.findUnique({
      "where": { "id": Number(req.params.id) }
    });

    if (!user) return res.status(404).json({ "msg": `No user with id: ${req.params.id} found` });

    await prisma.user.delete({
      "where": { "id": Number(req.params.id) },
    });

    return res.status(200).json({ "msg": `User with id: ${req.params.id} was deleted successfully!`, });
  });
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};