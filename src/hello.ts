import { Component, View, bootstrap } from 'angular2/angular2';

@Component({
    selector: 'hello-app'
})
@View({
    template: `
        <h1>Hello, {{name}}!</h1>
        Say hello to: <input [value]="name" (input)="name = $event.target.value">
    `
})
class HelloApp {
    name: string = 'World';
}

bootstrap(HelloApp);