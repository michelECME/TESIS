import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AgregadoXChoferComponent } from './list/agregado-x-chofer.component';
import { AgregadoXChoferDetailComponent } from './detail/agregado-x-chofer-detail.component';
import { AgregadoXChoferUpdateComponent } from './update/agregado-x-chofer-update.component';
import { AgregadoXChoferDeleteDialogComponent } from './delete/agregado-x-chofer-delete-dialog.component';
import { AgregadoXChoferRoutingModule } from './route/agregado-x-chofer-routing.module';

@NgModule({
  imports: [SharedModule, AgregadoXChoferRoutingModule],
  declarations: [
    AgregadoXChoferComponent,
    AgregadoXChoferDetailComponent,
    AgregadoXChoferUpdateComponent,
    AgregadoXChoferDeleteDialogComponent,
  ],
  entryComponents: [AgregadoXChoferDeleteDialogComponent],
})
export class AgregadoXChoferModule {}
