import { Router } from "express";
import { transaction, transactions } from "../controllers/transactions.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { transactionSchema } from "../schemas/transaction.schema.js";

const transactionRouter = Router();

transactionRouter.use(validateAuth);

transactionRouter.post('/transaction/:type', validateSchema(transactionSchema), transaction); //validar

transactionRouter.get('/transactions', transactions);

export default transactionRouter;