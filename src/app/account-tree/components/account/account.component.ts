import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from '../../../core/interfaces/account';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account!: IAccount;

  isExpanded: boolean = true;

  constructor() {

  }

  ngOnInit(): void {

  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  isExpandable(): boolean {
    return this.account.accounts.length > 0;
  }

}
