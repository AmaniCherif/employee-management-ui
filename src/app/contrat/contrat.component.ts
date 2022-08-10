import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat';
import { ContratService } from 'src/app/contrat.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Employe } from '../employe';
import { EmployeService } from '../employe.service';


@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {

 public contrats: Contrat[];
 employees:Employe[];
 form : boolean = false;
 searchText:any;
 closeResult! : string;
 contrat!: Contrat;
 public editContrat: Contrat;
 public deleteContrat: Contrat;
 selected:Number;

  constructor(private contratService: ContratService , private emp:EmployeService) { }

  ngOnInit(): void {
    this.getContrats();
    this.emp.getEmployees().subscribe((employees: Employe[]) => {
      this.employees=employees;
      this.selected = this.employees[0].id;
    })
  }
 
  public getContrats(): void {
    this.contratService.getContrats().subscribe(data => {
      this.contrats = data;
    });
}
addContrat(c: any){
  this.contratService.addContrat(c).subscribe(() => {
    this.getContrats();
    this.form = false;
  });
}
public onAddContrat(addForm: NgForm): void {
  document.getElementById('add-contrat-form').click();
  this.contratService.addContrat(addForm.value).subscribe(
    (response: Contrat) => {
      this.getContrats();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}
public onUpdateContrat(contrat: Contrat ): void {
  this.contratService.updateContrat(contrat).subscribe(
    (response: Contrat) => {
      this.getContrats();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public onDeleteContrat(reference: any): void {
  this.contratService.deleteContrat(reference).subscribe(
    (response: void) => {
      this.getContrats();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onOpenModal(contrat: Contrat, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addContratModal');
  }
  if (mode === 'update') {
    this.editContrat=contrat;
    button.setAttribute('data-target', '#updateContratModal');
  }
  if (mode === 'delete') {
    this.deleteContrat=contrat;
    button.setAttribute('data-target', '#deleteContratModal');
  }
  container?.appendChild(button);
  button.click();
}





}