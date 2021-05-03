import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICOMBUSTIBLEXUEB } from '../combustiblexueb.model';
import { COMBUSTIBLEXUEBService } from '../service/combustiblexueb.service';
import { COMBUSTIBLEXUEBDeleteDialogComponent } from '../delete/combustiblexueb-delete-dialog.component';

@Component({
  selector: 'jhi-combustiblexueb',
  templateUrl: './combustiblexueb.component.html',
})
export class COMBUSTIBLEXUEBComponent implements OnInit {
  cOMBUSTIBLEXUEBS?: ICOMBUSTIBLEXUEB[];
  isLoading = false;

  constructor(protected cOMBUSTIBLEXUEBService: COMBUSTIBLEXUEBService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cOMBUSTIBLEXUEBService.query().subscribe(
      (res: HttpResponse<ICOMBUSTIBLEXUEB[]>) => {
        this.isLoading = false;
        this.cOMBUSTIBLEXUEBS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICOMBUSTIBLEXUEB): number {
    return item.id!;
  }

  delete(cOMBUSTIBLEXUEB: ICOMBUSTIBLEXUEB): void {
    const modalRef = this.modalService.open(COMBUSTIBLEXUEBDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cOMBUSTIBLEXUEB = cOMBUSTIBLEXUEB;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
