import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecurso } from '../recurso.model';
import { RecursoService } from '../service/recurso.service';
import { RecursoDeleteDialogComponent } from '../delete/recurso-delete-dialog.component';

@Component({
  selector: 'jhi-recurso',
  templateUrl: './recurso.component.html',
})
export class RecursoComponent implements OnInit {
  recursos?: IRecurso[];
  isLoading = false;

  constructor(protected recursoService: RecursoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.recursoService.query().subscribe(
      (res: HttpResponse<IRecurso[]>) => {
        this.isLoading = false;
        this.recursos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IRecurso): number {
    return item.id!;
  }

  delete(recurso: IRecurso): void {
    const modalRef = this.modalService.open(RecursoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.recurso = recurso;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
