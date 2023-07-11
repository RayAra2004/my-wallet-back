import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(json());
app.use(router);


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));