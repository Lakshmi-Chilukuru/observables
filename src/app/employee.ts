export interface employeeType{
    id:number,
    name:string,
    age:number
}

export interface toDoReference{
    name:string,
    id: string,
    text : string
}

export const Errors =[{
    400 : "BAD_REQUEST",
    401 : "unAuthorized",
    403 : "Forbidden",
    404 : "notFound",
    429 : "TOO_MANY_REQUEST",
    500 : "INTERNAL_SERVER_ERROR",
    502 : "BAD_GATEWAY",
    503 : "SERVICE_UNAVAILABLE"
}]