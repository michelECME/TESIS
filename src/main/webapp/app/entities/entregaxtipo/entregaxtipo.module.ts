import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ENTREGAXTIPOComponent } from './list/entregaxtipo.component';
import { ENTREGAXTIPODetailComponent } from './detail/entregaxtipo-detail.component';
import { ENTREGAXTIPOUpdateComponent } from './update/entregaxtipo-update.component';
import { ENTREGAXTIPODeleteDialogComponent } from './delete/entregaxtipo-delete-dialog.component';
import { ENTREGAXTIPORoutingModule } from './route/entregaxtipo-routing.module';

@NgModule({
  imports: [SharedModule, ENTREGAXTIPORoutingModule],
  declarations: [ENTREGAXTIPOComponent, ENTREGAXTIPODetailComponent, ENTREGAXTIPOUpdateComponent, ENTREGAXTIPODeleteDialogComponent],
  entryComponents: [ENTREGAXTIPODeleteDialogComponent],
})
export class ENTREGAXTIPOModule {}
