import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AccountsAndCategories } from '../_models/accountsAndCategories';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable , of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BankAccountsAndCategoriesResolver implements Resolve<AccountsAndCategories>{

    constructor(private userService: UserService, private authService : AuthService,
        private alertify : AlertifyService, private router: Router){}

    resolve(rote: ActivatedRouteSnapshot): Observable<AccountsAndCategories>{
        return this.userService.getBankAccountsAndCategories(this.authService.decodedToken.nameid).pipe(
            catchError( error => {
                this.alertify.error('An error happened in the resolver');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        )
    }
}