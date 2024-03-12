import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

import { ITask } from '@interfaces/task.interface';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'example-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  url = 'http://localhost:3333/api/tasks';

  task!: ITask;

  ngOnInit(): void {
    this.getTask('1234');
  }

  // EXAMPLE REQUEST
  getTask(id: string): Observable<ITask> {
    return this.apiService.get<ITask>(`${this.url}/${id}`);
  }
}
