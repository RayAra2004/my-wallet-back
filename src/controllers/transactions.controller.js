import { db } from "../database/database.connection.js";
import dayjs from "dayjs";
import Joi from "joi";

const transactionSchema = Joi.object({
    type: Joi.string().valid('entrada', 'saida').required(),
    value: Joi.number().positive().required(),
    description: Joi.string().required()
})

export async function transaction(req, res){
    const {type} = req.params;
    const {value, description} = req.body;
    const { user } = res.locals;

    const validation = transactionSchema.validate({type, value, description});

    if(validation.error) return res.status(422).send(validation.error.details);

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