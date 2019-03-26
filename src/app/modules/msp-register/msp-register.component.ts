import { Component, OnInit } from "@angular/core";
import { Container } from "moh-common-lib/models";
import { subRoutes } from "@msp-register/models/sub-routes";
import { Router } from "@angular/router";

@Component({
  selector: "sitereg-msp-register",
  templateUrl: "./msp-register.component.html",
  styleUrls: ["./msp-register.component.scss"]
})
export class MspRegisterComponent extends Container implements OnInit {
  constructor(private router: Router) {
    super();
    this.setProgressSteps(subRoutes);
  }

  ngOnInit() {
    // this.router.navigate(['msp-registration/organization']);
  }
}
