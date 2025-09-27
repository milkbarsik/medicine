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
router.post('/login', controller.login.bind(controller));
router.post('/refresh', controller.refresh.bind(controller));
router.post('/logout', controller.logOut.bind(controller));
router.get('/patients', controller.getPatients.bind(controller));
router.get('/patients/:id', controller.getOnePatient.bind(controller));
router.post('/patients', controller.postPatient.bind(controller));

export default router;