import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MatInputModule} from '@angular/material';

const materialModules = [
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
]
@NgModule({
  declarations: [],
  imports: [
    ...materialModules
  ],
  exports: [
    ...materialModules
  ]
})
export class MaterialModule { }
