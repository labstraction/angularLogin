import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidators{

    static MustMatch(firstControlName: string, secondControlName: string): any{
        return (formGroup: FormGroup) => {
            const pswControl = formGroup.controls[firstControlName];
            const confirmControl = formGroup.controls[secondControlName];
            
            if (confirmControl.errors && !confirmControl.errors["mustMatch"]) {
                return;
            }

            if (pswControl.value !== confirmControl.value) {
                confirmControl.setErrors({mustMatch: true})
            } else {
                confirmControl.setErrors(null);
            }

            return null
        }
    }


    static hasSpecialChar(control: AbstractControl): ValidationErrors | null{
        
        if (control.value.includes("!")) {
            return null;
        } else {
            return {"hasExclamationMark": true}
        }
    }
}