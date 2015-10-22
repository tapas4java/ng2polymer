import { Component, View, bootstrap } from 'angular2/angular2';

@Component({ 
  selector: 'app',
  templateUrl: 'src/app.html'
})
export class AppComponent {
  message: string;
  myValue: string;
  
  constructor(){
    this.message = 'Welcome to Angular2 + Polymer!!';
    this.myValue = 'Tapas!';
  }
  
  valueChanged(){
    alert('Value Changed!');
  }
  
  sayHello(nameObj: HTMLInputElement){
    alert('Hello ' + nameObj.value );
  }
  
}

bootstrap(AppComponent);