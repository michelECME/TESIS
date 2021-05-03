import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';
import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';
import { CANTIDADXTIPOUEBDeleteDialogComponent } from '../delete/cantidadxtipoueb-delete-dialog.component';

@Component({
  selector: 'jhi-cantidadxtipoueb',
  templateUrl: './cantidadxtipoueb.component.html',
})
export class CANTIDADXTIPOUEBComponent implements OnInit {
  cANTIDADXTIPOUEBS?: ICANTIDADXTIPOUEB[];
  isLoading = false;

  constructor(protected cANTIDADXTIPOUEBService: CANTIDADXTIPOUEBService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cANTIDADXTIPOUEBService.query().subscribe(
      (res: HttpResponse<ICANTIDADXTIPOUEB[]>) => {
        this.isLoading = false;
        this.cANTIDADXTIPOUEBS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICANTIDADXTIPOUEB): number {
    return item.id!;
  }

  delete(cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB): void {
    const modalRef = this.modalService.open(CANTIDADXTIPOUEBDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cANTIDADXTIPOUEB = cANTIDADXTIPOUEB;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
