export default class GeneralValidator {
    constructor() {
        this.errors = {};
    }
  
    required(value) {
        if (!value || value === "") {
            this.errors.required = "This field is required";
            return false;
        }
        return true;
    }

    regex(value, { pattern, message }) {
        if (!pattern.test(value) && value !== "") {
            this.errors.regex = message;
            return false;
        }
        return true;
    }

    minLength(value, length) {
        if (value.length < length) {
            this.errors.minLength = `This field must be at least ${length} characters long`;
            return false;
        }
        return true;
    }

    minValue(value, { min, message }) {
        if (Number(value) < Number(min) || min.length == 0) {
            if (min.length == 0) {
                this.errors.minValue = "Please select starting number";
                return false;
            } else {
                this.errors.minValue = message;
                return false;
            }
        }
        return true;
    }

    maxLength(value, length) {
        if (value.length > length) {
            this.errors.maxLength = `This field must be at most ${length} characters long`;
            return false;
        }
        return true;
    }

    // This function named validateRequiredFields validates required fields in an object. It checks if the field value is an object, and if it is required and not filled, or if it has any errors. If there are no errors and all required fields are filled, it returns false.
    static validateRequiredFields(fields) {
        let hasErrors = false;
        for (let field in fields) {

            // Check if the value is an object
            if (typeof fields[field] !== "object") continue;

            // Check if the field is required and not filled
            if (
                fields[field]?.rules &&
                fields[field]?.rules.required == true &&
                !fields[field]?.value
            ) {
                hasErrors = true;
            }

            // Check if the field has any errors
            if (fields[field]?.errors && Object.keys(fields[field].errors).length > 0) {
                hasErrors = true;
            }
        }

        // Return false if there are no errors and all required fields are filled
        return hasErrors;
    }

    static validateRequiredFieldsArray(arrayOfFields) {
        let hasErrors = false;

        for (let i = 0; i < arrayOfFields?.length; i++) {
            const fields = arrayOfFields[i];

            // Check each field in the current object
            for (let field in fields) {
                // Check if the value is an object
                if (typeof fields[field] !== "object") continue;

                // Check if the field is required and not filled
                if (
                    fields[field]?.rules &&
                    fields[field]?.rules.required === true &&
                    !fields[field]?.value
                ) {
                    hasErrors = true;
                }

                // Check if the field has any errors
                if (fields[field]?.errors && Object.keys(fields[field].errors).length > 0) {
                    hasErrors = true;
                }
            }
        }

        // Return false if there are no errors and all required fields are filled
        return hasErrors;
    }

    static validateRequiredFieldsArrayOfArray(arrayOfFields) {
        let hasErrors = false;

        for (let i = 0; i < arrayOfFields.length; i++) {
            const fields = arrayOfFields[i];

            // Check each field in the current object
            for (let field in fields) {
                // Check if the value is an object
                if (typeof fields[field] !== "object") continue;

                // Check if the field is required and not filled
                if (
                    fields[field]?.rules &&
                    fields[field]?.rules.required === true &&
                    (!fields[field]?.value || fields[field]?.value === "")
                ) {
                    hasErrors = true;
                }

                // Check if the field has any errors
                if (fields[field]?.errors && Object.keys(fields[field].errors).length > 0) {
                    hasErrors = true;
                }

                // If the field is an array, recursively validate its elements
                if (Array.isArray(fields[field]).length !== 0) {
                    let error = this.validateRequiredFieldsArray(fields[field]);
                    if (error) {
                        hasErrors = true
                    }
                }
            }
        }

        // Return false if there are no errors and all required fields are filled
        return hasErrors;
    }

    validate(value, validationRules) {
        this.errors = {};

        for (let rule in validationRules) {
            const ruleValue = validationRules[rule];
            if (rule === "required" && ruleValue) {
                this.required(value);
            } else if (rule === "regex" && ruleValue) {
                this.regex(value, ruleValue);
            } else if (rule === "minLength" && value.length && ruleValue) {
                this.minLength(value, ruleValue);
            } else if (rule === "maxLength" && value.length && ruleValue) {
                this.maxLength(value, ruleValue);
            } else if (rule === "minValue" && ruleValue) {
                this.minValue(value, ruleValue);
            }
        }
        return this.errors;
    }

    static isStartTimeBeforeEndTime(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);
        if (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
            return true;
        } else {
            return false;
        }
    }
      
}

export const generalValidator = new GeneralValidator();

