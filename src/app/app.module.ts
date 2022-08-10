import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContratComponent } from './contrat/contrat.component';
import { EmployeComponent } from './employe/employe.component';
import { DepartmentComponent } from './department/department.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { FormsModule } from '@angular/forms';
import { EmployeService } from './employe.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    ContratComponent,
    EmployeComponent,
    DepartmentComponent,
    EntrepriseComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [EmployeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
