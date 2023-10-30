import express from "express";
import indexRoutes from "./routes/index.js";

const app = express();

app.use("/", indexRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export default app;