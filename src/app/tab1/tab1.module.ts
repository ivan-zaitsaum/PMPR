import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Импортируем CommonModule для использования директивы ngIf
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Page } from './tab1.page'; // Импортируем компонент Tab1Page

@NgModule({
  imports: [
    IonicModule,
    CommonModule,  // Добавляем CommonModule для использования директивы ngIf
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  declarations: [], // Не добавляем Tab1Page в declarations для standalone компонента
})
export class Tab1PageModule {}
