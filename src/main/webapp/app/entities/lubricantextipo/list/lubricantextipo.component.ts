import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILUBRICANTEXTIPO } from '../lubricantextipo.model';
import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';
import { LUBRICANTEXTIPODeleteDialogComponent } from '../delete/lubricantextipo-delete-dialog.component';

@Component({
  selector: 'jhi-lubricantextipo',
  templateUrl: './lubricantextipo.component.html',
})
export class LUBRICANTEXTIPOComponent implements OnInit {
  lUBRICANTEXTIPOS?: ILUBRICANTEXTIPO[];
  isLoading = false;

  constructor(protected lUBRICANTEXTIPOService: LUBRICANTEXTIPOService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.lUBRICANTEXTIPOService.query().subscribe(
      (res: HttpResponse<ILUBRICANTEXTIPO[]>) => {
        this.isLoading = false;
        this.lUBRICANTEXTIPOS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ILUBRICANTEXTIPO): number {
    return item.id!;
  }

  delete(lUBRICANTEXTIPO: ILUBRICANTEXTIPO): void {
    const modalRef = this.modalService.open(LUBRICANTEXTIPODeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lUBRICANTEXTIPO = lUBRICANTEXTIPO;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
