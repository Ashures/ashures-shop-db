import express, { urlencoded, json } from "express";
import indexRoutes from "./routes/index.js";
import apiRoutes from "./routes/api/index.js";

const app = express();

app.use(urlencoded({ "extended": false }));
app.use(json());

app.use("/", indexRoutes);
app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export default app;