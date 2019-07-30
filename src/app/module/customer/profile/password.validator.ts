import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('newPassword').value; // to get value in input tag
        const confirmPassword = AC.get('confirmNewPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmNewPassword').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
}
