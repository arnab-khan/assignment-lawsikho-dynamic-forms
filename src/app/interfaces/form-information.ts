export interface FormInformation {
    label: string;
    formControlName: string;
    type: 'input' | 'email' | 'select' | 'password',
    options?: string[];
    sequence: number;
    validation?: FormInformationValidation;
}
export interface FormInformationValidation {
    mandatory?: FormInformationValidationMandatory;
    pattern?: FormInformationValidationPattern;
}
export interface FormInformationValidationPattern {
    value: string;
    errorMessage: string;
}
export interface FormInformationValidationMandatory {
    value: boolean;
    errorMessage: string;
}
