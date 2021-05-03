import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICantidadXModelo } from '../cantidad-x-modelo.model';
import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';
import { CantidadXModeloDeleteDialogComponent } from '../delete/cantidad-x-modelo-delete-dialog.component';

@Component({
  selector: 'jhi-cantidad-x-modelo',
  templateUrl: './cantidad-x-modelo.component.html',
})
export class CantidadXModeloComponent implements OnInit {
  cantidadXModelos?: ICantidadXModelo[];
  isLoading = false;

  constructor(protected cantidadXModeloService: CantidadXModeloService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cantidadXModeloService.query().subscribe(
      (res: HttpResponse<ICantidadXModelo[]>) => {
        this.isLoading = false;
        this.cantidadXModelos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICantidadXModelo): number {
    return item.id!;
  }

  delete(cantidadXModelo: ICantidadXModelo): void {
    const modalRef = this.modalService.open(CantidadXModeloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cantidadXModelo = cantidadXModelo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
