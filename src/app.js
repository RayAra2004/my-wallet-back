import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { signIn, signUp } from "./controllers/users.controller.js";
import { transaction, transactions } from "./controllers/transactions.controller.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try{
    await mongoClient.connect();
    console.log("Connected to MongoDB");
}catch(err){
    console.log(err.message);
}

export const db = mongoClient.db();

app.post("/sign-up", signUp);

app.post('/sign-in', signIn);

app.post('/transaction/:type', transaction);

app.get('/transactions', transactions)


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));