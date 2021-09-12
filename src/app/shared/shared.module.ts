import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: SHARED_IMPORTS,
  exports: SHARED_IMPORTS
})
export class AppSharedModule {}

