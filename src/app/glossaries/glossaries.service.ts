import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGlossary } from './glossary';

@Injectable({
  providedIn: 'root',
})
export class GlossariesService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<IGlossary[]>('http://localhost:8080/glossaries');
  }

  create(payload: IGlossary) {
    return this.http.post<IGlossary>(
      'http://localhost:8080/glossaries',
      payload,
    );
  }

  getById(id: number) {
    return this.http.get<IGlossary>(`http://localhost:8080/glossaries/${id}`);
  }

  update(payload: IGlossary) {
    return this.http.put(
      `http://localhost:8080/glossaries/${payload.id}`,
      payload,
    );
  }

  delete(id: number) {
    return this.http.delete<IGlossary>(
      `http://localhost:8080/glossaries/${id}`,
    );
  }
}
