import { FormArray } from "@angular/forms";

export  class FormValidations {

    static requeredMinCheckbox(min:number =  1) {
        const validator = (formArray: FormArray) => {
          // const values = formArray.controls;
          // const totalChecked = 0;
          // for (let i = 0; i < values.length; i++) {
          //   if (values[i].value) {
          //     totalChecked += 1;
          //   }
          // }
    
          const totalChecked = formArray.controls
            .map(v => v.value)
            .reduce((total, current) => current ? total + current : total , 0);
          return totalChecked >= min ? null : { required: true };
        }
        return validator;
      }
}