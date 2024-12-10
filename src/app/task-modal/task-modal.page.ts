import { Component, OnInit ,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.page.html',
  styleUrls: ['./task-modal.page.scss'],
})
export class TaskModalPage  {

  @Input() task: Task = {
    id: 0,
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Low',
    dueDate: '',
  };

  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  saveTask() {
    this.modalCtrl.dismiss(this.task);
  }
}



