import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsignacion } from '../asignacion.model';
import { AsignacionService } from '../service/asignacion.service';
import { AsignacionDeleteDialogComponent } from '../delete/asignacion-delete-dialog.component';

@Component({
  selector: 'jhi-asignacion',
  templateUrl: './asignacion.component.html',
})
export class AsignacionComponent implements OnInit {
  asignacions?: IAsignacion[];
  isLoading = false;

  constructor(protected asignacionService: AsignacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.asignacionService.query().subscribe(
      (res: HttpResponse<IAsignacion[]>) => {
        this.isLoading = false;
        this.asignacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAsignacion): number {
    return item.id!;
  }

  delete(asignacion: IAsignacion): void {
    const modalRef = this.modalService.open(AsignacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.asignacion = asignacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
