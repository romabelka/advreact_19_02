import emailValidator from 'email-validator'

export const VALIDATORS = {
    REQUIRED: 'validateRequired',
    EMAIL: 'validateEmail',
    STRIG_LENGTH: 'stringLength'
};

class Validation {
    validateRequired(value, fieldName) {
        return value ? undefined : `${fieldName} is a required field.`;
    }

    validateEmail(value, fieldName) {
        return value && !emailValidator.validate(value) ? `${fieldName} is not valid email` : undefined;
    }

    stringLength(value, fieldName, minLength = 2, maxLength = 255) {
        return value && (value.length < minLength || value.length > maxLength) ?
            `${fieldName} length should between ${minLength} and ${maxLength} characters`
            : undefined;
    }

    /**
     * @param value
     *          Any value that should be validated.
     * @param fieldName
     *          Will be used in validation error.
     * @param  {VALIDATORS[]}
     *          Array of validatorss against which will be performed validation.
     * @param rest
     *          Optional params for some custom validations. Will be in validation rule.
     * @return {String[]}
     *         Returns validation errors. If field is valid, returns undefined
     */
    validate(value, fieldName, validators, ...rest) {
        const errors = [];
        validators.forEach((validator) => {
            if (this[validator]) {
                const validationError = this[validator](value, fieldName, ...rest);
                if (validationError) {
                    errors.push(validationError);
                }
            }
        });

        return errors.length > 0 ? errors : undefined;
    }
}

export default new Validation();