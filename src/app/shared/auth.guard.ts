import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";


export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    map(user => !!user || router.createUrlTree(['/login']))
  );
};

 