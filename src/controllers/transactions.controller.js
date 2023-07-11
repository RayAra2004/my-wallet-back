import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function transaction(req, res){
    const {type} = req.params;
    const {value, description} = req.body;
    const { user } = res.locals;

    try{
        await db.collection('transactions').insertOne({id_user: user.userId, description, value, type, date: dayjs().format("DD/MM")})

        res.sendStatus(200);

    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function transactions(req, res) {
   const { user } = res.locals;
    
    const transactions = (await db.collection('transactions').find({id_user: user.userId}).toArray()).reverse();

    const userN = await db.collection('users').findOne({_id: user.userId});

    res.send({name: userN.name, transactions});

}