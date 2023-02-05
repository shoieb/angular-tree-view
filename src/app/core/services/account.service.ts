import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IAccount } from '../interfaces/account';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountService {

  private _serverUrl: string = environment.serverUrl;

  constructor(private _http: HttpClient) {}

  getAccountList(): Observable<IAccount> {
    return this._http.get<IAccount>(this._serverUrl);
  }

  filteredAccounts(account: IAccount, searchText: string): IAccount | null {
    if (!account) return null;

    const filteredAccounts = account.accounts.map((children) => {
        return this.filteredAccounts(children, searchText)
      }).filter((children) => children) as IAccount[];

    return account.name.toLowerCase().includes(searchText.toLowerCase()) || filteredAccounts.length ? { ...account, accounts: filteredAccounts } : null;
  }

}
