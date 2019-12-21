import { Component, OnInit } from "@angular/core";
import { AppService } from '../app.service';
import { UltronModel } from '../app.model';

@Component({
  selector: "ultron-branding",
  templateUrl: "./branding.component.html",
  styleUrls: ["./branding.component.scss"]
})
export class BrandingComponent implements OnInit {
  content: any;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getContent().subscribe((data) => {
      this.content = data;
    });
    console.log(this.content);
  }
}
