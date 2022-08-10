import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../entreprise';
import { EntrepriseService } from '../entreprise.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  public entreprises: Entreprise[];

  constructor(private entrepriseService: EntrepriseService ) { }

  ngOnInit(): void {
    this.getEntreprise();
  }
  public getEntreprise(): void {
    this.entrepriseService.getEntreprise().subscribe(data => {
      this.entreprises = data;
    });
}
}
