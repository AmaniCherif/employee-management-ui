import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employe } from '../employe';
import { EmployeService } from '../employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  public employees: Employe[];
  form : boolean = false;
  employe!: Employe;
  closeResult! : string;
  public editEmployee: Employe;
  public deleteEmployee: Employe;

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }
  public getEmployees(): void {
    this.employeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
  addEmploye(p: any){
    this.employeService.addEmploye(p).subscribe(() => {
      this.getEmployees();
      this.form = false;
    });
  }
  public onAddEmloye(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeService.addEmploye(addForm.value).subscribe(
      (response: Employe) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateEmloyee(employe: Employe): void {
    this.employeService.updateEmploye(employe).subscribe(
      (response: Employe) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteEmloyee(employeeId: any): void {
    this.employeService.deleteEmploye(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public searchEmploye(key: string): void {
    console.log(key);
    const results: Employe[] = [];
    for (const employe of this.employees) {
      if (String(employe.id).toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employe.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employe.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employe.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employe.password.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || String(employe.actif).toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employe);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }


  public onOpenModal(employe: Employe, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeModal');
    }
    if (mode === 'update') {
      this.editEmployee=employe;
      button.setAttribute('data-target', '#updateEmployeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee=employe;
      button.setAttribute('data-target', '#deleteEmployeModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
