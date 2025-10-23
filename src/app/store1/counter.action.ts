import { createAction,props } from "@ngrx/store";

export const ActionTypeInc = "[] increment"

export const counterAction = createAction(
    ActionTypeInc,
    props<{value:number}>()
)
export const counterActionDec = createAction(
    "[] decrement",
    props<{value:number}>()
   
)