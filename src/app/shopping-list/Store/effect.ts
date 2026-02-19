import { Injectable,inject } from "@angular/core";
import { ShoppingService } from "../shopping.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadDepData, loadDepDataSuccess } from "./count.action";
import { map, mergeMap } from "rxjs";
import { Department } from "./data";

@Injectable()

export class storeEffect{
    actions$ = inject(Actions)
    constructor(private shoPSer:ShoppingService){}

    loadDepartmnent$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadDepData),
            mergeMap(()=>
                this.shoPSer.getDepData().pipe(map((departments:any) => loadDepDataSuccess({ departments })),)
            )
        )
    )
}