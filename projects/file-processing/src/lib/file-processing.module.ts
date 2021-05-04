import { NgModule } from '@angular/core';
import { FileProcessingComponent } from './file-processing.component';
import { FileProcessingUnitComponent } from './file-processing-unit/file-processing-unit.component';
import { ButtonModule, CheckBoxModule   } from '@syncfusion/ej2-angular-buttons';
import { ContextMenuModule ,ToolbarModule  } from '@syncfusion/ej2-angular-navigations';
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    FileProcessingComponent,
    FileProcessingUnitComponent
  ],
  imports: [
    FileManagerAllModule, 
    UploaderModule , 
    DialogModule, 
    CheckBoxModule,
    ButtonModule, 
    CommonModule, 
    ContextMenuModule, 
    ToolbarModule, 
    BrowserModule
  ],
  exports: [
    FileProcessingComponent,
    FileProcessingUnitComponent
  ]
})
export class FileProcessingModule { }
