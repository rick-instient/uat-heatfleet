import { FormBuilder } from '@angular/forms';
import { EventBus } from './eventbus';

export class ConstructorParams {
    private parameters : {
        [key: string]: any;
      } = {};
    private constructor() { }

    public static Create(){
        return new ConstructorParams();
    }
    public with(...args: any[]):ConstructorParams{
        args.forEach(arg => {
            this.withObject(arg);
        });
        return this;
    }
    public withObject(parameter:any):ConstructorParams{
        this.parameters[parameter.constructor.name] = parameter;
        return this;
    }

    public setParameters(destination:any):void{
        for(let key in this.parameters){
            destination[key.charAt(0).toLowerCase() + key.slice(1)] = this.parameters[key];
          }
    }
}
