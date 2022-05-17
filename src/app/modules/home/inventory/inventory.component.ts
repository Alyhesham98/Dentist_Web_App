import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/shared/models/session.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}
  sessionsData: Session;
  allDoctors: User[];
  searchValue = '0';

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getAllUsers().subscribe((res) => {
      this.allDoctors = res.filter((user) => user.role === 'doctor');
    }, err => {
      alert('Error loading doctors list!');
    });
    this.api.getSessions().subscribe((res) => {
      this.sessionsData = res.data;
      this.isLoading = false;
    }, err => {
      alert('Error loading sessions!');
      this.isLoading = false;
    });
  }

  patientDetails(patientId: any): void {
    this.router.navigate(['/patientDetails', patientId]);
  }

  printPage(): void {
    window.print();
  }
}
