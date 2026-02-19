import { createReducer,on } from "@ngrx/store";
import { add, loadDepData, loadDepDataSuccess, minus,loadDepDataError } from "./count.action";
import { Department } from "./data";
export const initialState =0;

export interface DepStore{
    departments :Department[],
    loading :boolean,
    error:string | null
}
export const initialState2:DepStore = {
    departments :[],
    loading:false,
    error:""
}
export const countReducer = createReducer(
    initialState,
    on(add,(state)=>state+1),
    on(minus,(state)=>state-1),
)
export const depReducer = createReducer(
    initialState2,
    on(loadDepData,state=>({
        ...state,
        loading:true,
        error :null
    })),
    on(loadDepDataSuccess,(state,{departments})=>({
        ...state,
        departments,
        loading:false,
        error :null
    })),
    on(loadDepDataError,(state,{error})=>({
        ...state,
        loading:false,
        error
    }))
)