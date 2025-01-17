export interface FormInformation {
    label: string;
    formControlName: string;
    type: 'input' | 'email' | 'tel' | 'select' | 'password' | 'file' | 'checkbox',
    options?: string[];
    sequence: number;
    validation?: FormInformationValidation;
}
export interface FormInformationValidation {
    mandatory?: FormInformationValidationMandatory;
    pattern?: FormInformationValidationPattern;
    passwordMismatch?: FormInformationValidationPasswordMismatch;
}
export interface FormInformationValidationPattern {
    value: string;
    errorMessage: string;
}
export interface FormInformationValidationMandatory {
    value: boolean;
    errorMessage: string;
}
export interface FormInformationValidationPasswordMismatch {
    value: boolean;
    errorMessage: string;
}