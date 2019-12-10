import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}

  getWidgets(url = "/assets/metadata/widgets.json"): Observable<any> {
    return this.http.get<any>(url);
  }

  getProfile(url = "/assets/metadata/profile.json") {
    return this.http.get<any>(url);
  }
}
