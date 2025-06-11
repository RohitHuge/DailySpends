import { Router } from "express";
import { registrationdata, addtransaction, transactions, summarydata, updateSummaryDates, health } from "./controllers/db.controller.js";
import { createFamily, checkForInvite, deleteInvite, addMember } from "./controllers/family.controller.js";

const router = Router();

router.route('/registrationdata').post(registrationdata);
router.route('/addtransaction').post(addtransaction);
router.route('/transactions').get(transactions);
router.route('/summarydata').post(summarydata);
router.route('/updateSummaryDates').post(updateSummaryDates);
router.route('/health').get(health);
router.route('/createfamily').post(createFamily);
router.route('/checkforinvite').post(checkForInvite);
router.route('/deleteinvite').post(deleteInvite);
router.route('/addmember').post(addMember);

export default router;