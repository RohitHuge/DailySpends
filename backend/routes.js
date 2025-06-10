import { Router } from "express";
import { registrationdata, addtransaction, transactions, summarydata, updateSummaryDates, health } from "./controllers/db.controller.js";


const router = Router();

router.route('/registrationdata').post(registrationdata);
router.route('/addtransaction').post(addtransaction);
router.route('/transactions').get(transactions);
router.route('/summarydata').post(summarydata);
router.route('/updateSummaryDates').post(updateSummaryDates);
router.route('/health').get(health);

export default router;