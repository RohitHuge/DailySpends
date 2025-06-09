import { Router } from "express";
import { registrationdata, addtransaction, transactions, summarydata, updateSummaryDates } from "./controllers/db.controller.js";


const router = Router();

router.route('/registrationdata').post(registrationdata);
router.route('/addtransaction').post(addtransaction);
router.route('/transactions').get(transactions);
router.route('/summarydata').post(summarydata);
router.route('/updateSummaryDates').post(updateSummaryDates);

export default router;