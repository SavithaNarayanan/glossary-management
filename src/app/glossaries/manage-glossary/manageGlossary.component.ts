import { Component, OnInit } from '@angular/core';
import { IGlossary } from '../glossary';
import { GlossariesService } from '../glossaries.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-manage',
  templateUrl: './manageGlossary.component.html',
  styleUrls: ['./manageGlossary.component.css'],
})
export class ManageGlossaryComponent implements OnInit {
  glossaryForm: IGlossary = {
    term: '',
    definition: '',
  };
  isEditMode: boolean= false;

  constructor(
    private glossariesService: GlossariesService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = Number(param.get('id'));
      if (id) {
        this.getById(id);
        this.isEditMode = true;
      } else {
        this.isEditMode = false;
      }
    });
  }

  create() {
    this.glossariesService.create(this.glossaryForm).subscribe({
      next: (data) => {
        this.router.navigate(['/glossaries/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getById(id: number) {
    this.glossariesService.getById(id).subscribe({
      next: (data) => {
        this.glossaryForm = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update() {
    this.glossariesService.update(this.glossaryForm).subscribe({
      next: (data) => {
        this.router.navigate(['/glossaries/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
