import { NgModule } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountListStore } from './stores/account.store';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AccountService, AccountListStore]
})
export class CoreModule { }
