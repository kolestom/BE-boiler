
import express, { Response } from "express";


export const ZodSafeParse = (zodType: any, object: object | unknown, status: number, res: Response) => {
  const result = zodType.safeParse(object);
  if (result.success === false) {
    console.log(result.error);
    return res.sendStatus(status)
  }

  return result.data;
};
