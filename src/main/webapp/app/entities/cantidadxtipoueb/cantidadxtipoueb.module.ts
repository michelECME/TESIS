import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CANTIDADXTIPOUEBComponent } from './list/cantidadxtipoueb.component';
import { CANTIDADXTIPOUEBDetailComponent } from './detail/cantidadxtipoueb-detail.component';
import { CANTIDADXTIPOUEBUpdateComponent } from './update/cantidadxtipoueb-update.component';
import { CANTIDADXTIPOUEBDeleteDialogComponent } from './delete/cantidadxtipoueb-delete-dialog.component';
import { CANTIDADXTIPOUEBRoutingModule } from './route/cantidadxtipoueb-routing.module';

@NgModule({
  imports: [SharedModule, CANTIDADXTIPOUEBRoutingModule],
  declarations: [
    CANTIDADXTIPOUEBComponent,
    CANTIDADXTIPOUEBDetailComponent,
    CANTIDADXTIPOUEBUpdateComponent,
    CANTIDADXTIPOUEBDeleteDialogComponent,
  ],
  entryComponents: [CANTIDADXTIPOUEBDeleteDialogComponent],
})
export class CANTIDADXTIPOUEBModule {}
