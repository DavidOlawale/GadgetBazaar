import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  MatIconModule
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
