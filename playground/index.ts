/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DomSanitizer } from "@angular/platform-browser";

import { NgxDynamicOutletModule }  from 'ngx-dynamic-outlet';

@Component({
  selector: 'app',
  template: `<html-outlet [html]="content" [context]="context" ></html-outlet>`
})
class AppComponent {
	constructor(private filter: DomSanitizer) { }
	content = `<a (click)="showQuestion(&apos;fever chills normal&apos;)">I have a fever/chills. Is this normal?</a>`;
	// content = this.filter.bypassSecurityTrustHtml(`<a (click)="showQuestion(&apos;fever chills normal&apos;)">I have a fever/chills. Is this normal?</a>`);
  // content = this.filter.bypassSecurityTrustHtml(``);
    context = {
        showQuestion: this.showQuestion
    };

    showQuestion(question: object) {
        // const modalInstance = this.modalService.open(QuestionComponent, { size: "lg" });
        // modalInstance.componentInstance.question = question;
       if(window.confirm('Are sure you want to delete this item ?')){
	    //put your delete method logic here
	   }
    }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NgxDynamicOutletModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
