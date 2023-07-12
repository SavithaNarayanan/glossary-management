import { Component, OnInit } from '@angular/core';
import { IGlossary } from '../glossary';
import { GlossariesService } from '../glossaries.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sortDir = 'asc'; //1= 'ASE' -1= DSC
  displayStyle = 'none';
  allGlossaries: IGlossary[] = [];
  idTodelete: number = 0;
  displayedColumns: string[] = ['term', 'definition', 'actions'];
  dataSource: any;

  constructor(
    private glossariesService: GlossariesService,
    private router: Router,
  ) {
    this.sortTheData('term', this.sortDir);
  }

  ngOnInit(): void {
    this.getGlossaries();
  }

  getGlossaries() {
    this.glossariesService.get().subscribe((data: IGlossary[]) => {
      this.allGlossaries = data;
      this.dataSource = new MatTableDataSource(data);
    });
  }

  openDeleteModal(id: any) {
    this.idTodelete = id;
    this.displayStyle = 'block';
  }

  delete() {
    this.glossariesService.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.allGlossaries = this.allGlossaries.filter(
          (_) => _.id != this.idTodelete,
        );
        this.dataSource = new MatTableDataSource(this.allGlossaries);
        this.displayStyle = 'none';
      },
    });
  }

  edit(item: IGlossary) {
    this.router.navigate(['/glossaries', item.id]);
  }

  closeDialog() {
    this.displayStyle = 'none';
  }

  onSortClick(event: any) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('bi-chevron-up')) {
      classList.remove('bi-chevron-up');
      classList.add('bi-chevron-down');
      this.sortDir = 'asc';
    } else {
      classList.add('bi-chevron-up');
      classList.remove('bi-chevron-down');
      this.sortDir = 'desc';
    }
    this.sortTheData('term', this.sortDir);
  }

  sortTheData(col: string, direction: string) {
    if (direction === 'asc')
      this.allGlossaries = this.allGlossaries.sort((b, a) =>
        a.term.localeCompare(b.term),
      );
    else
      this.allGlossaries = this.allGlossaries.sort((a, b) =>
        a.term.localeCompare(b.term),
      );
  }
}
