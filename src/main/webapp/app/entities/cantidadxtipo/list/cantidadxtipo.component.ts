import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICANTIDADXTIPO } from '../cantidadxtipo.model';
import { CANTIDADXTIPOService } from '../service/cantidadxtipo.service';
import { CANTIDADXTIPODeleteDialogComponent } from '../delete/cantidadxtipo-delete-dialog.component';

@Component({
  selector: 'jhi-cantidadxtipo',
  templateUrl: './cantidadxtipo.component.html',
})
export class CANTIDADXTIPOComponent implements OnInit {
  cANTIDADXTIPOS?: ICANTIDADXTIPO[];
  isLoading = false;

  constructor(protected cANTIDADXTIPOService: CANTIDADXTIPOService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cANTIDADXTIPOService.query().subscribe(
      (res: HttpResponse<ICANTIDADXTIPO[]>) => {
        this.isLoading = false;
        this.cANTIDADXTIPOS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICANTIDADXTIPO): number {
    return item.id!;
  }

  delete(cANTIDADXTIPO: ICANTIDADXTIPO): void {
    const modalRef = this.modalService.open(CANTIDADXTIPODeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cANTIDADXTIPO = cANTIDADXTIPO;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
