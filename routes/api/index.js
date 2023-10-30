import express from "express";
import userRoutes from "./user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Ashures API!");
})

router.use("/users", userRoutes);

export default router;