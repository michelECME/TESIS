import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AsignacionComponent } from './list/asignacion.component';
import { AsignacionDetailComponent } from './detail/asignacion-detail.component';
import { AsignacionUpdateComponent } from './update/asignacion-update.component';
import { AsignacionDeleteDialogComponent } from './delete/asignacion-delete-dialog.component';
import { AsignacionRoutingModule } from './route/asignacion-routing.module';

@NgModule({
  imports: [SharedModule, AsignacionRoutingModule],
  declarations: [AsignacionComponent, AsignacionDetailComponent, AsignacionUpdateComponent, AsignacionDeleteDialogComponent],
  entryComponents: [AsignacionDeleteDialogComponent],
})
export class AsignacionModule {}
