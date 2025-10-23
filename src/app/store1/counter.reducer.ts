import { createReducer, on } from "@ngrx/store";
import { counterAction, counterActionDec } from "./counter.action";


const initialState = 0;

export const counterReducer = createReducer(
    initialState,
    on(counterAction,(state,action)=>state+action.value),
    on(counterActionDec,(state,action)=>state-action.value)
)

// export function counterR(state:number=initialState,action:any){
//     if(action.type="[] increment"){
//         return state+action.value;
//     }
//     else if(action.type="[] decrement"){
//         return state-action.value;
//     } 
//     return state
// }

// export function counterReducer(state = initialState){
//     return state;
// }