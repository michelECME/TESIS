import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { LUBRICANTEXTIPOComponent } from './list/lubricantextipo.component';
import { LUBRICANTEXTIPODetailComponent } from './detail/lubricantextipo-detail.component';
import { LUBRICANTEXTIPOUpdateComponent } from './update/lubricantextipo-update.component';
import { LUBRICANTEXTIPODeleteDialogComponent } from './delete/lubricantextipo-delete-dialog.component';
import { LUBRICANTEXTIPORoutingModule } from './route/lubricantextipo-routing.module';

@NgModule({
  imports: [SharedModule, LUBRICANTEXTIPORoutingModule],
  declarations: [
    LUBRICANTEXTIPOComponent,
    LUBRICANTEXTIPODetailComponent,
    LUBRICANTEXTIPOUpdateComponent,
    LUBRICANTEXTIPODeleteDialogComponent,
  ],
  entryComponents: [LUBRICANTEXTIPODeleteDialogComponent],
})
export class LUBRICANTEXTIPOModule {}
