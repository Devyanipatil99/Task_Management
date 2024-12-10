import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskModalPage } from '../task-modal/task-modal.page';
import { Router } from '@angular/router';
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage {
 
  tasks: Task[] = [];
  filterStatus: string = 'All';
  filterPriority: string = 'All';

  constructor(private modalCtrl: ModalController,private router: Router) {}

  filteredTasks(): Task[] {
    return this.tasks.filter(task => {
      const statusMatch = this.filterStatus === 'All' || task.status === this.filterStatus;
      const priorityMatch = this.filterPriority === 'All' || task.priority === this.filterPriority;
      return statusMatch && priorityMatch;
    });
  }

  async openTaskModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskModalPage,
      componentProps: {
        task: task || { id: 0, title: '', description: '', status: 'Pending', priority: 'Low', dueDate: '' },
      },
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        if (data.id) {
    
          const index = this.tasks.findIndex(t => t.id === data.id);
          if (index > -1) this.tasks[index] = data;
        } else {
      
          data.id = this.tasks.length + 1;
          this.tasks.push(data);
        }
      }
    });

    return await modal.present();
  }

  editTask(taskId: number) {
    const taskToEdit = this.tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      this.openTaskModal(taskToEdit);
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  markAsCompleted(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) task.status = 'Completed';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
