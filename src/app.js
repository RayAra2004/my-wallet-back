import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';


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

const loginSchema = Joi.object({
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

app.post('/sign-in', async (req, res) =>{
    const {email, password} = req.body;

    const validation = loginSchema.validate({email, password});
    if(validation.error) return res.sendStatus(422);

    try{

        const userExist = await db.collection('users').findOne({email});
        if(!userExist) return res.sendStatus(404);

        const passwordCorret = bcrypt.compareSync(password, userExist.cryptPassword);
        if(!passwordCorret) return res.sendStatus(401);
        
        const token = uuid();

        await db.collection('sessions').insertOne({userId: userExist._id, token});

        res.send({token, id: userExist._id});
        
    }catch(err){
        res.status(500).send(err.message);
    }
})



app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));