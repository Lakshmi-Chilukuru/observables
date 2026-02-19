import { createAction,props } from "@ngrx/store";
import { Department } from "./data";

export const add =createAction('[counter] Increment');
export const minus = createAction('[counter] Decrement');
export const loadDepData = createAction('[department] Load Department');
export const loadDepDataSuccess = createAction('[department] Loaded Department Successfully',props<{departments:Department[]}>())
export const loadDepDataError = createAction('[department] Loaded Department Successfully',props<{error:string}>())
