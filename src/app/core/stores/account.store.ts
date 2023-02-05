import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { tap, catchError, EMPTY } from "rxjs";
import { IAccount } from "../interfaces/account";
import { AccountService } from "../services/account.service";


export interface AccountState {
  accounts: IAccount | null;
  searchText: string;
  isLoading: boolean;
}

const INITIAL_STATE: AccountState = {
  accounts: null,
  searchText: '',
  isLoading: true,
};

@Injectable()
export class AccountListStore extends ComponentStore<AccountState> {
  constructor(private _accountService: AccountService) {
    super(INITIAL_STATE);
  }

  getAccounts$ = this.select(({ accounts }) => accounts);

  isLoading$ = this.select((state) => state.isLoading);

  filteredData$ = this.select(({ accounts, searchText: searchText }) => this._accountService.filteredAccounts(accounts as IAccount, searchText))

  private _setAccounts = this.updater((state, accounts: IAccount) => {
    return { ...state, accounts };
  });

  private _setIsLoading = this.updater((state, isLoading: boolean) => {
    return { ...state, isLoading };
  });

  loadAccounts$ = this.effect(() => {
    this._setIsLoading(true);
    return this._accountService.getAccountList().pipe(
      catchError(() => EMPTY),
      tap((account: IAccount) => {
        this._setAccounts(account);
        this._setIsLoading(false);
      })
    );
  });

}
