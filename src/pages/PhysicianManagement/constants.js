export const CREATE_PHYSICIAN = {
    NPI: { value: '', errors: {}, rules: { required: true } },
    firstName: { value: '', errors: {}, rules: { required: true } },
    lastName: { value: '', errors: {}, rules: { required: true } },
    primaryEmail: {
        value: '',
        errors: {},
        rules: {
            required: true,
            regex: { pattern: /\d+.+?/g, message: 'One lowercase, uppercase, number, special, character, at least 8.' }
        }
    },
    secondaryEmail: { value: '', errors: {}, rules: { required: false } },
    fax: { value: '', errors: {}, rules: { required: true } },
    status: { value: '', errors: {}, rules: { required: true } },
    mailingAddress: {
        addressLine1: { value: '', errors: {}, rules: { required: true } },
        addressLine2: { value: '', errors: {}, rules: { required: false } },
        landmark: { value: '', errors: {}, rules: { required: false } },
        city: { value: '', errors: {}, rules: { required: true } },
        state: { value: '', errors: {}, rules: { required: true } },
        country: { value: '', errors: {}, rules: { required: true } },
        pinCode: { value: '', errors: {}, rules: { required: true } }
    },
    primaryAddress: {
        addressLine1: { value: '', errors: {}, rules: { required: true } },
        addressLine2: { value: '', errors: {}, rules: { required: false } },
        landmark: { value: '', errors: {}, rules: { required: false } },
        city: { value: '', errors: {}, rules: { required: true } },
        state: { value: '', errors: {}, rules: { required: true } },
        country: { value: '', errors: {}, rules: { required: true } },
        pinCode: { value: '', errors: {}, rules: { required: true } }
    },
    contactNumber: {
        value: '',
        errors: {},
        rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }
    },
    billingAddressId: { value: '', errors: {}, rules: { required: true } },
    practiceAddressId: { value: '', errors: {}, rules: { required: true } },
    id: { value: '', errors: {}, rules: { required: true } }
};

export const UPDATE_PHYSICIAN = {
    NPI: { value: '', errors: {}, rules: { required: true } },
    firstName: { value: '', errors: {}, rules: { required: true } },
    lastName: { value: '', errors: {}, rules: { required: true } },
    primaryEmail: {
        value: '',
        errors: {},
        rules: {
            required: true,
            regex: { pattern: /\d+.+?/g, message: 'One lowercase, uppercase, number, special, character, at least 8.' }
        }
    },
    secondaryEmail: { value: '', errors: {}, rules: { required: false } },
    fax: { value: '', errors: {}, rules: { required: true } },
    status: { value: '', errors: {}, rules: { required: true } },
    mailingAddress: {
        addressLine1: { value: '', errors: {}, rules: { required: true } },
        addressLine2: { value: '', errors: {}, rules: { required: false } },
        landmark: { value: '', errors: {}, rules: { required: false } },
        city: { value: '', errors: {}, rules: { required: true } },
        state: { value: '', errors: {}, rules: { required: true } },
        country: { value: '', errors: {}, rules: { required: true } },
        pinCode: { value: '', errors: {}, rules: { required: true } }
    },
    primaryAddress: {
        addressLine1: { value: '', errors: {}, rules: { required: true } },
        addressLine2: { value: '', errors: {}, rules: { required: false } },
        landmark: { value: '', errors: {}, rules: { required: false } },
        city: { value: '', errors: {}, rules: { required: true } },
        state: { value: '', errors: {}, rules: { required: true } },
        country: { value: '', errors: {}, rules: { required: true } },
        pinCode: { value: '', errors: {}, rules: { required: true } }
    },
    contactNumber: {
        value: '',
        errors: {},
        rules: { required: true, regex: { pattern: /\b\d{10}\b/, message: 'Please enter 10 digits only' } }
    },
    billingAddressId: { value: '', errors: {}, rules: { required: true } },
    practiceAddressId: { value: '', errors: {}, rules: { required: true } },
    id: { value: '', errors: {}, rules: { required: true } }
};