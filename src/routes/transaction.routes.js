import { Router } from "express";
import { transaction, transactions } from "../controllers/transactions.controller.js";

const transactionRouter = Router();

transactionRouter.post('/transaction/:type', transaction);

transactionRouter.get('/transactions', transactions);

export default transactionRouter;