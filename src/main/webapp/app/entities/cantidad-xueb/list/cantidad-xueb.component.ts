import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICantidadXUEB } from '../cantidad-xueb.model';
import { CantidadXUEBService } from '../service/cantidad-xueb.service';
import { CantidadXUEBDeleteDialogComponent } from '../delete/cantidad-xueb-delete-dialog.component';

@Component({
  selector: 'jhi-cantidad-xueb',
  templateUrl: './cantidad-xueb.component.html',
})
export class CantidadXUEBComponent implements OnInit {
  cantidadXUEBS?: ICantidadXUEB[];
  isLoading = false;

  constructor(protected cantidadXUEBService: CantidadXUEBService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cantidadXUEBService.query().subscribe(
      (res: HttpResponse<ICantidadXUEB[]>) => {
        this.isLoading = false;
        this.cantidadXUEBS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICantidadXUEB): number {
    return item.id!;
  }

  delete(cantidadXUEB: ICantidadXUEB): void {
    const modalRef = this.modalService.open(CantidadXUEBDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cantidadXUEB = cantidadXUEB;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
