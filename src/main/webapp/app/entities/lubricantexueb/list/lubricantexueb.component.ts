import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILUBRICANTEXUEB } from '../lubricantexueb.model';
import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';
import { LUBRICANTEXUEBDeleteDialogComponent } from '../delete/lubricantexueb-delete-dialog.component';

@Component({
  selector: 'jhi-lubricantexueb',
  templateUrl: './lubricantexueb.component.html',
})
export class LUBRICANTEXUEBComponent implements OnInit {
  lUBRICANTEXUEBS?: ILUBRICANTEXUEB[];
  isLoading = false;

  constructor(protected lUBRICANTEXUEBService: LUBRICANTEXUEBService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.lUBRICANTEXUEBService.query().subscribe(
      (res: HttpResponse<ILUBRICANTEXUEB[]>) => {
        this.isLoading = false;
        this.lUBRICANTEXUEBS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ILUBRICANTEXUEB): number {
    return item.id!;
  }

  delete(lUBRICANTEXUEB: ILUBRICANTEXUEB): void {
    const modalRef = this.modalService.open(LUBRICANTEXUEBDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lUBRICANTEXUEB = lUBRICANTEXUEB;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
