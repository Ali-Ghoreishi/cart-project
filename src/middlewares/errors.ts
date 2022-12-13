import express, { Application, Request, Response, NextFunction } from "express";

export function errorHandler (error:any, req: Request, res: Response, next: NextFunction) {
    const status = error.statusCode || 500;
    const message = []
    message.push(error.message);
    const data = error.data || {};
    res.status(status).json({ status: false, message, data });
};