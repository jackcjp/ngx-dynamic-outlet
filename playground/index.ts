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
	// content = `<a (click)="showQuestion(&apos;fever chills normal&apos;)">I have a fever/chills. Is this normal?</a>`;
  content = ` <p>A moderate amount of discomfort, such as bruising, swelling, and redness can be expected after joint replacement surgery. However, you should not ignore the following warning signs if you experience them:</p> 
<p>If you&apos;re having chest pain, palpitations, difficulty breathing, or are coughing up blood, please call 911 or go to the nearest emergency room immediately.</p> 
<p>Contact your surgeon&apos;s office if you experience any of the following:</p> 
<ul> 
    <li>A fall: call if you fall after joint replacement surgery.</li> 
    <li>Numbness, tingling, or bruising: Some numbness and stiffness around your incision site is normal. To reduce these symptoms, try applying ice and elevating your leg. Call if your symptoms persist.
        <ul> 
            <li>Pain not relieved by medication/pain that is getting worse: Pain is common and expected after joint surgery. Call if medication, icing, and elevating your legs don&apos;t help, or the pain is getting worse.</li> 
            <li>Thick, yellow drainage at the incision site/drainage that persists more than 1 week after surgery: Some drainage at the incision site is normal, especially in the first few days after surgery. Call if the drainage is thick, dark yellow, bad smelling, or persists 5-7 days after surgery.</li> 
            <li>Inability to do exercises/inability to put weight through joint: Call if you&apos;re unable to complete your physical therapy exercises due, or otherwise unable to put any weight on your joint.</li> 
            <li>Excessive swelling that persists: Some swelling after surgery is normal. Call if you find your swelling to be excessive, persistent, or that it onsets suddenly.</li> 
            <li>Toes that are very cold and cannot be warmed up: Call if the foot or toes on your operative leg get very cold and you&apos;re unable to warm them up by covering them. This could be a sign of a blood clot.</li> 
            <li>Increased redness around your incision: Call if your incision site is increasingly red, tender, painful, or hot to the touch. This could indicate an infection.</li> 
            <li>Temperature over 101 degrees Fahrenheit: A low-grade fever is common within the first 48-72 hours after surgery. Generally, this is a result of inflammation after surgery, or shallow breathing that affects the lungs (known as atelectasis). Make sure to get rest and drink plenty of fluids. Call if your fever is over 101 degrees Fahrenheit and persistent.</li> 
            <li>Calf Pain: While general soreness throughout your leg is normal for the first few days after surgery, call if you have increased tenderness, redness, swelling, or a charley horse feeling in your calf.</li> 
            <li>Unexpected concerns/questions: If you&apos;re experiencing any unexpected or surprising symptoms, or have any other general questions, please feel free to contact your Care Coordinator by sending them a message through CarePilot [link to Clarify messaging capability] or call your surgeon&apos;s office.</li> 
        </ul>
    </li>
</ul>`;

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
