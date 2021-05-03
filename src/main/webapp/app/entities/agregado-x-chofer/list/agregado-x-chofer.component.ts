import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgregadoXChofer } from '../agregado-x-chofer.model';
import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';
import { AgregadoXChoferDeleteDialogComponent } from '../delete/agregado-x-chofer-delete-dialog.component';

@Component({
  selector: 'jhi-agregado-x-chofer',
  templateUrl: './agregado-x-chofer.component.html',
})
export class AgregadoXChoferComponent implements OnInit {
  agregadoXChofers?: IAgregadoXChofer[];
  isLoading = false;

  constructor(protected agregadoXChoferService: AgregadoXChoferService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.agregadoXChoferService.query().subscribe(
      (res: HttpResponse<IAgregadoXChofer[]>) => {
        this.isLoading = false;
        this.agregadoXChofers = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAgregadoXChofer): number {
    return item.id!;
  }

  delete(agregadoXChofer: IAgregadoXChofer): void {
    const modalRef = this.modalService.open(AgregadoXChoferDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agregadoXChofer = agregadoXChofer;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
