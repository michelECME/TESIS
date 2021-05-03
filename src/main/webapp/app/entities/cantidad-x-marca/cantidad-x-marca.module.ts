import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CantidadXMarcaComponent } from './list/cantidad-x-marca.component';
import { CantidadXMarcaDetailComponent } from './detail/cantidad-x-marca-detail.component';
import { CantidadXMarcaUpdateComponent } from './update/cantidad-x-marca-update.component';
import { CantidadXMarcaDeleteDialogComponent } from './delete/cantidad-x-marca-delete-dialog.component';
import { CantidadXMarcaRoutingModule } from './route/cantidad-x-marca-routing.module';

@NgModule({
  imports: [SharedModule, CantidadXMarcaRoutingModule],
  declarations: [
    CantidadXMarcaComponent,
    CantidadXMarcaDetailComponent,
    CantidadXMarcaUpdateComponent,
    CantidadXMarcaDeleteDialogComponent,
  ],
  entryComponents: [CantidadXMarcaDeleteDialogComponent],
})
export class CantidadXMarcaModule {}
