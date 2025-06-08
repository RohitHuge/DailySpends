import { Router } from "express";
import { registrationdata } from "./controllers/db.controller.js";

const router = Router();

router.route('/registrationdata').post(registrationdata);
    
export default router;