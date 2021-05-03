import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IENTREGAXTIPO } from '../entregaxtipo.model';
import { ENTREGAXTIPOService } from '../service/entregaxtipo.service';
import { ENTREGAXTIPODeleteDialogComponent } from '../delete/entregaxtipo-delete-dialog.component';

@Component({
  selector: 'jhi-entregaxtipo',
  templateUrl: './entregaxtipo.component.html',
})
export class ENTREGAXTIPOComponent implements OnInit {
  eNTREGAXTIPOS?: IENTREGAXTIPO[];
  isLoading = false;

  constructor(protected eNTREGAXTIPOService: ENTREGAXTIPOService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.eNTREGAXTIPOService.query().subscribe(
      (res: HttpResponse<IENTREGAXTIPO[]>) => {
        this.isLoading = false;
        this.eNTREGAXTIPOS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IENTREGAXTIPO): number {
    return item.id!;
  }

  delete(eNTREGAXTIPO: IENTREGAXTIPO): void {
    const modalRef = this.modalService.open(ENTREGAXTIPODeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.eNTREGAXTIPO = eNTREGAXTIPO;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
