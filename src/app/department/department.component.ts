import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { Entreprise } from '../entreprise';
import { EntrepriseService } from '../entreprise.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  public departments: Department[];
  public entreprises : Entreprise[];
  department!: Department;
  form : boolean = false;
  selected:Number;
  public editDepartment: Department;
 public deleteDepartment: Department;

  constructor(private departmentService: DepartmentService,private ent:EntrepriseService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.ent.getEntreprise().subscribe((entreprises: Entreprise[]) => {
      this.entreprises=entreprises;
      this.selected = this.entreprises[0].id;
    })

  }
  public getDepartments(): void {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
      
    });
}
addDepartments(d: any){
  this.departmentService.addDepartments(d).subscribe(() => {
    this.getDepartments();
    this.form = false;
  });
}
public onAddDepartments(addForm: NgForm): void {
  document.getElementById('add-department-form').click();
  this.departmentService.addDepartments(addForm.value).subscribe(
    (response: Department) => {
      this.getDepartments();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}
public onUpdateDepartment(department: Department ): void {
  this.departmentService.updateDepartments(department).subscribe(
    (response: Department) => {
      this.getDepartments();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public onDeleteDepartment(id: any): void {
  this.departmentService.deleteDepartments(id).subscribe(
    (response: void) => {
      this.getDepartments();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onOpenModal(department: Department, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addDepartmentModal');
  }
  if (mode === 'update') {
    this.editDepartment=department;
    button.setAttribute('data-target', '#updateDepartmentModal');
  }
  if (mode === 'delete') {
    this.deleteDepartment=department;
    button.setAttribute('data-target', '#deleteDepartmentModal');
  }
  container?.appendChild(button);
  button.click();
}
}
