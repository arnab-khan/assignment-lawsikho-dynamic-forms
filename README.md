# Dynamic Form Application

This project implements a dynamic form system with three separate features: **Login**, **Registration**, and **User Details** forms. Each form is dynamically generated from its corresponding JSON configuration. The forms have mandatory fields, optional fields, and validations, ensuring data integrity and user experience.

---

## Features
1. **Login Form**:
    - Fields:
        - **Email** (Mandatory) - Valid email format required.
        - **Password** (Mandatory) - Strong password format required.
        - **Remember Me** (Optional) - Checkbox field.
    - Validations:
        - Email must follow a valid format (e.g., `example@domain.com`).
        - Password must meet complexity requirements (uppercase, lowercase, digits, minimum 8 characters).

2. **Registration Form**:
    - Fields:
        - **Name** (Mandatory) - Only letters and spaces, between 2-50 characters.
        - **Email** (Mandatory) - Valid email format required.
        - **Password** (Mandatory) - Strong password format required.
        - **Confirm Password** (Mandatory) - Must match the password.
        - **Phone Number** (Mandatory) - Exactly 10 numeric digits.
    - Validations:
        - Ensure `Password` matches `Confirm Password`.
        - Phone number must be a valid 10-digit number.

3. **User Details Form**:
    - Fields:
        - **Profile Picture** (Optional) - File upload field.
        - **Address** (Mandatory) - Standard input field (additionally implied but not in the base JSON).
        - **City** (Mandatory) - Letters and spaces only, 2-50 characters.
        - **State** (Mandatory) - Letters and spaces only, 2-50 characters.
        - **Pincode** (Mandatory) - Exactly 6 numeric digits.
        - **Country** (Mandatory) - Dropdown selection field.
    - Validations:
        - Country selection is mandatory.
        - Pincode must consist of exactly 6 digits.