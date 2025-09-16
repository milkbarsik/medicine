import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))
// app.use('/api', router);


// app.use(((errorMiddleware as unknown) as express.ErrorRequestHandler));


app.listen(PORT, () => {
	console.log(`server starting on port ${PORT}`);
})