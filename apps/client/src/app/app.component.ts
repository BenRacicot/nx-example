import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { NxWelcomeComponent } from './nx-welcome.component';

import { ITask } from '@interfaces/task.interface';
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

  // EXAMPLE REQUEST
  getTask(id: string): Observable<ITask> {
    return this.apiService.get<ITask>(`${this.url}/${id}`);
  }
}
