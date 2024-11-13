import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, take } from 'rxjs';

import { NxWelcomeComponent } from './nx-welcome.component';
import { v7 as uuidv7 } from 'uuid';
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTask('019326b2-e5ec-72e2-b169-4012eac12687')
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (res: any) => console.error(res),
      });
  }

  createTask(req: ICreateTaskDto): Observable<ITask> {
    return this.apiService.post<ITask>(`${this.url}`, req);
  }

  getTask(id: string): Observable<ITask> {
    console.log(id);
    return this.apiService.get<ITask>(`${this.url}/${id}`);
  }

  updateTask(id: string, req: IUpdateTaskDto): Observable<ITask> {
    return this.apiService.patch<ITask>(`${this.url}/${id}`, req);
  }
}
