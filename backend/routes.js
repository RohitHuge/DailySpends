import { Router } from "express";
import { registrationdata, addtransaction, transactions } from "./controllers/db.controller.js";


const router = Router();

router.route('/registrationdata').post(registrationdata);
router.route('/addtransaction').post(addtransaction);
router.route('/transactions').get(transactions);

export default router;