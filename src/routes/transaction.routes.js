import { Router } from "express";
import { transaction, transactions } from "../controllers/transactions.controller.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const transactionRouter = Router();

transactionRouter.use(validateAuth);

transactionRouter.post('/transaction/:type', transaction);

transactionRouter.get('/transactions', transactions);

export default transactionRouter;