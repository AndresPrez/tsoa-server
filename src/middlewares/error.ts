import { ValidateError } from "tsoa";
import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction): Response | void {
  // ValidateError is an error specific to 'tsoa' argument validation
  if (error instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, error.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: error?.fields,
    });
  } else {
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    return res.status(status).json({
      message: message,
    });
  }
}
