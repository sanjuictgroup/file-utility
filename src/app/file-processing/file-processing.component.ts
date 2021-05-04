import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
@Component({
  selector: 'app-file-processing',
  templateUrl: './file-processing.component.html',
  styleUrls: ['./file-processing.component.css'],
  encapsulation: ViewEncapsulation.None,
	providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})
export class FileProcessingComponent implements OnInit {

 public ajaxSettings: object;
    public view: string;
    public hostUrl: string = 'http://localhost:3000/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/v1/all-files',
            getImageUrl: this.hostUrl + 'api/v1/get-image',
            uploadUrl: this.hostUrl + 'api/v1/file-upload',
            downloadUrl: this.hostUrl + 'api/v1/file-download',
        };
       this.view = "Details";
    }

}
