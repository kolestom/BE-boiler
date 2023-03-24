import { z } from "zod"


export const safeParse = <Schema extends z.ZodTypeAny>(schema: Schema, data: unknown): z.infer<Schema> | null => {
  console.log("data",data);
  
  const result = schema.safeParse(data);
  if (result.success === false) {
    console.log(result.error);
    return null
  }
  return result.data;
}




// const deepCopy = <T>(a: T): string =>  {
//   return JSON.parse(JSON.stringify(a))
// }

// let num = 5
// let str = "hello"

// const result1 = deepCopy(num)
// const result2 = deepCopy(str)

// const addFive = (number: number) => {
//   return number+5
// }


// type toDo = {
//   title: string,
//   description: string,
// }

// type Response<Type> = {
//   statusCode: number,
//   isPending: boolean,
//   data: Type
// }

// const getToDo: Response<toDo[]> = {
//  statusCode: 200,
//  isPending: false,
//  data: [],
// }

// const postResponse: Response<null> = {
//   statusCode: 200,
//   isPending: false,
//   data: null
// }


// const loginResponse: Response<string> = {
//   statusCode: 200,
//   isPending: false,
//   data: "randomstring"
// }

// const secondLoginResponse: Response<string> = {
//   statusCode: 200,
//   isPending: false,
//   data: "5"
// }


// // export const ZodSafeParse = (zodType: any, object: object | unknown, status: number, res: Response) => {
// //   const result = zodType.safeParse(object);
// //   if (result.success === false) {
// //     console.log(result.error);
// //     return res.sendStatus(status)
// //   }

// //   return result.data;
// // };
