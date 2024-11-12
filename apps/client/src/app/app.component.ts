import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { NxWelcomeComponent } from './nx-welcome.component';

import { ICreateTaskDto, ITask, IUpdateTaskDto } from '@interfaces';
import { ApiService } from './services/api.service';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'example-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  url = 'tasks';
  task!: ITask;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTask('1234');
  }

  createTask(): Observable<ICreateTaskDto> {
    return this.apiService.post<ITask>(`${this.url}`, );
  }

  getTask(id: string): Observable<ITask> {
    return this.apiService.get<ITask>(`${this.url}/${id}`);
  }

  updateTask(id: string, req: IUpdateTaskDto): Observable<ITask> {
    return this.apiService.patch<ITask>(`${this.url}/${id}`, req);
  }
}
