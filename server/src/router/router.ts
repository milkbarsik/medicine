import { Router } from "express";
import controller from "../controller/controller";

const router = Router();

router.get('/disease', controller.getDisease.bind(controller));
router.get('/medicines', controller.getMedicines.bind(controller));
router.get('/medicines/:id', controller.getOneMedicine.bind(controller));
router.get('/sicks_of_date/:date', controller.getSicksOfDate.bind(controller));
router.get('/sicks_of_disease/:id', controller.getSicksOfDisease.bind(controller));
router.post('/medicines', controller.postMedicine.bind(controller));
router.post('/disease', controller.postDisease.bind(controller));
router.post('/reseptions', controller.postReseption.bind(controller));

export default router;