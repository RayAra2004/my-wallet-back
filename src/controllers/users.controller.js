import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export async function signUp(req, res){
    const {name, email, password} = req.body;
    
    try{
        const userExist = await db.collection('users').findOne({email});
        if(userExist) return res.sendStatus(409);

        const cryptPassword = bcrypt.hashSync(password, 10);

        await db.collection('users').insertOne({name, email, cryptPassword});

        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message);
    }
    
}

export async function signIn(req, res){
    const {email, password} = req.body;

    try{

        const userExist = await db.collection('users').findOne({email});
        if(!userExist) return res.sendStatus(404);

        const passwordCorret = bcrypt.compareSync(password, userExist.cryptPassword);
        if(!passwordCorret) return res.sendStatus(401);
        
        const token = uuid();

        await db.collection('sessions').deleteMany({userId: userExist._id});

        await db.collection('sessions').insertOne({userId: userExist._id, token});

        res.send({token, id: userExist._id});
        
    }catch(err){
        res.status(500).send(err.message);
    }
}