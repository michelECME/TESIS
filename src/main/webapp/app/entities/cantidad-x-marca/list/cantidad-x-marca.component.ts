import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICantidadXMarca } from '../cantidad-x-marca.model';
import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';
import { CantidadXMarcaDeleteDialogComponent } from '../delete/cantidad-x-marca-delete-dialog.component';

@Component({
  selector: 'jhi-cantidad-x-marca',
  templateUrl: './cantidad-x-marca.component.html',
})
export class CantidadXMarcaComponent implements OnInit {
  cantidadXMarcas?: ICantidadXMarca[];
  isLoading = false;

  constructor(protected cantidadXMarcaService: CantidadXMarcaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cantidadXMarcaService.query().subscribe(
      (res: HttpResponse<ICantidadXMarca[]>) => {
        this.isLoading = false;
        this.cantidadXMarcas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICantidadXMarca): number {
    return item.id!;
  }

  delete(cantidadXMarca: ICantidadXMarca): void {
    const modalRef = this.modalService.open(CantidadXMarcaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cantidadXMarca = cantidadXMarca;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
