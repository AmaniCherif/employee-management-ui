import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratComponent } from './contrat/contrat.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeComponent } from './employe/employe.component';

const routes: Routes = [
  {path: 'contrats', component: ContratComponent},
  {path: 'employees', component: EmployeComponent},
  {path: 'departments', component: DepartmentComponent},
  {path: '', redirectTo: 'contrats', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
