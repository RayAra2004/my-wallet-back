import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import Joi from "joi";
import bcrypt from "bcrypt";

dotenv.config();

const PORT = 5000;
const app = express();

app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try{
    await mongoClient.connect();
    console.log("Connected to MongoDB");
}catch(err){
    console.log(err.message)
}

const db = mongoClient.db();

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

app.post("/sign-up", async (req, res) => {
    const {name, email, password} = req.body;

    const validation = userSchema.validate({ name, email, password});
    if(validation.error) return res.sendStatus(422);
    
    try{
        const userExist = await db.collection('users').findOne({email});
        if(userExist) return res.sendStatus(409);

        const cryptPassword = bcrypt.hashSync(password, 10);

        await db.collection('users').insertOne({name, email, cryptPassword});

        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message);
    }
    
})



app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));