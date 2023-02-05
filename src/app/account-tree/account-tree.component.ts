import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { IAccount } from '../core/interfaces/account';
import { AccountListStore } from '../core/stores/account.store';

@Component({
  selector: 'account-tree',
  templateUrl: './account-tree.component.html',
  styleUrls: ['./account-tree.component.scss']
})
export class AccountTreeComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  filteredAccountData$!: Observable<IAccount | null>;
  isLoading$!: Observable<boolean>;

  private _destroy: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder, private _accountStore: AccountListStore) { }

  ngOnInit(): void {
    this._initForm();
    this._initData();
  }

  private _initData(): void {
    this._accountStore.loadAccounts$();

    this.filteredAccountData$ = this._accountStore.filteredData$;
    this.isLoading$ = this._accountStore.isLoading$;
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      'accountSearch': this._fb.control(null, [Validators.required])
    });

    this.formGroup.get('accountSearch')?.valueChanges.pipe(takeUntil(this._destroy), debounceTime(300))
      .subscribe((searchTerm: string) => {
        this._accountStore.patchState({ searchText: searchTerm });
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

}
