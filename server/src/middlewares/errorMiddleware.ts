import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/apiError";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err);

	if(err instanceof ApiError) {
		return res.status(err.status).json({message: err.message, errors: err.errors});
	} else if (err instanceof Error) {
		return res.status(500).json({message: err.message});
	}
	return res.status(500).json({message: 'Error...'})
}

export default errorMiddleware;