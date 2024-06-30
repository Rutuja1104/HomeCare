import jwt_decode from 'jwt-decode'
import moment from 'moment';
export default class General {

    static addOptionAndValueKeys(arr, labelExtracterKey, valueExtracterKey) {
        arr.map(item => {
            item.label = item[labelExtracterKey];
            item.value = item[valueExtracterKey];
        })
    }

    static convertArrayToDesiredFormat(inputArray) {
        return inputArray.map((quiz, index) => {
            const choices = quiz.options.length > 0 ?
                (quiz.options || []).map((option) => ({
                    checked: false,
                    label: option.text || '',
                    uuid: option.id
                })) : [];

            return {
                name: `Question ${index + 1}`,
                question_id: quiz.id,
                question: quiz.text || '',
                choices,
            };
        });
    }

    static readOnlyAssessment(inputArray, isShowCorrectOption = true) {
        return inputArray.map((item) => {
            const choices = item.allOptions.map((option, index) => (
                {
                    checked: item.allOptions.indexOf(item.selectedAnswer) == index,
                    label: option,
                    uuid: option.id
                }));

            return {
                name: "question 1",
                question: item.question,
                ...(isShowCorrectOption && {correctOptionIndex: item.isCorrect}),
                choices: choices,
            };
        });
    }

    static convertQuestionIntoAnswer(inputArray) {
        return inputArray.map((question, index) => {
            const questionId = question.question_id;
            const choicesWithId = question.choices.filter(item => item.checked)

            return {
                questionId,
                selectedOptionId: choicesWithId[0].uuid,
            }
        });
    }

    static contentType(fileName) {
        const extension = fileName.split('.').pop();
        let mimeType = '';

        switch (extension.toLowerCase()) {
        case 'txt': mimeType = 'text/plain';
            break;
        case 'pdf': mimeType = 'application/pdf';
            break;
        case 'docx': mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case 'xlsx': mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
        case 'csv': mimeType = "data:text/csv"
            break;
        case 'zip': mimeType = 'application/zip';
            break;
        default: mimeType = 'application/octet-stream'; break;
        }

        return mimeType
    }

    static formatLabelAndValue(label1, value1) {
        function toProperCase(str) {
            return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                return str.toUpperCase();
            });
        }

        function formatValue(value, label1 = "") {
            if (typeof value === 'string') {
                if (!isNaN(new Date(value).getTime()) && isNaN(+value)) {
                    return moment.utc(value || new Date()).format("LL");
                }
                if (label1) {
                    if (label1 == "ssn" || label1 == "SocialSecurityNumber" || label1 == "ZIPCode" || label1 == "phoneNumber" || label1 === "Telephone" || label1 === "contactType") {
                        return value
                    }
                }
                return value;
            } else if (typeof value === 'boolean') {
                return value ? 'Yes' : 'No';
            } else {
                return value;
            }
        }

        let label = toProperCase(label1);
        label = label.replace('Yearof', 'Year Of');
        label = label.replace('Employername', 'Employer Name');
        label = label.replace('Telephone', 'Phone Number');
        label = label.replace('C P R Test', 'CPR Test');
        label = label.replace('Z I P Code', 'Zip Code');
        label = label.replace('S S N', 'SSN');
        label = label.replace('U S C I S Number', 'USCIS Number');
        label = label.replace('Address Id', 'Location');

        let value = formatValue(value1, label1);

        if (label.length < 4) {
            label = label.toUpperCase();
        }

        if (label == "Residence Years") {
            value = value > 9 ? `More than ${value} years` : `${value} years`
        }

        if (label.toLowerCase().includes('empty')) {
            // If label includes "empty" (case insensitive), show empty strings for both label and value
            label = '';
            value = '';
        }

        return { label, value };
    }

    static generateDataArray(mapping, data) {
        const dataArray = [];

        for (const key in mapping) {
            const category = mapping[key];
            if (!dataArray[category]) {
                dataArray[category] = [];
            }

            let value = data[key]
            if (value === undefined || value === null) {
                value = "-";
            }


            dataArray[category].push({
                label: key,
                value: value,
                category: category,
            });
        }

        const dataArrayAsArray = Object.values(dataArray).filter((arr) => arr.length > 0);
        return dataArrayAsArray;
    }

    static removeDataPrefix(url) {
        const prefix = "data:image/png;base64,";
        if (url?.startsWith(prefix)) {
            return url?.slice(prefix.length);
        }
        return url;
    }

    static generateDataFromArrayOfObject(mapping, arrayOfObjects) {
        const dataArray = {};

        arrayOfObjects.forEach((data, index) => {
            for (const key in mapping) {
                const category = mapping[key];
                if (!dataArray[category]) {
                    dataArray[category] = [];
                }

                let value = data[key];
                if (value === undefined || value === null) {
                    value = "-";
                }

                dataArray[category].push({
                    label: `${key}`,
                    value: value,
                    category: category,
                });
            }
        });

        const dataArrayAsArray = Object.values(dataArray).filter((arr) => arr.length > 0);
        return dataArrayAsArray;
    }

    static generateDataFromArrayOfObjectArray(mapping, arrayOfObjects, nestedFieldMappings = {}) {
        const dataArray = {};
    
        arrayOfObjects.forEach((data, index) => {
            for (const key in mapping) {
                const category = mapping[key];
                if (!dataArray[category]) {
                    dataArray[category] = [];
                }
    
                let value = data[key];
                if (value === undefined || value === null) {
                    value = "-";
                }
    
                if (key in nestedFieldMappings && typeof value === "object") {
                    const nestedData = value;
                    for (const nestedKey in nestedFieldMappings[key]) {
                        const nestedCategory = nestedFieldMappings[key][nestedKey];
                        if (!dataArray[nestedCategory]) {
                            dataArray[nestedCategory] = [];
                        }
    
                        let nestedValue = nestedData[nestedKey];
                        if (nestedValue === undefined || nestedValue === null) {
                            nestedValue = "-";
                        }
    
                        dataArray[nestedCategory].push({
                            label: `${nestedKey}`,
                            value: nestedValue,
                            category: nestedCategory,
                        });
                    }
                } else {
                    dataArray[category].push({
                        label: `${key}`,
                        value: value,
                        category: category,
                    });
                }
            }
        });
    
        const dataArrayAsArray = Object.values(dataArray).filter((arr) => arr.length > 0);
        return dataArrayAsArray;
    }
    
    static generateUniqueUUID() {
        const randomBytes = new Uint8Array(16);
        crypto.getRandomValues(randomBytes);

        randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
        randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

        const hex = Array.from(randomBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');

        return `${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 4)}-${hex.substr(20, 12)}`;
    }

    static convertDocumentListToWellFormat(inputArray) {
        return inputArray?.length ? inputArray?.map((item) => ({
            s3Url: item.s3Url,
            documentType: item.documentType,
            id: item.id,
            nurseId: item.nurseId,
        })) : []
    }

    static groupDataByCategory(data) {
        const categorizedData = {};

        data.forEach(item => {
            const { documentType, ...rest } = item;
            if (!categorizedData[documentType]) {
                categorizedData[documentType] = [];
            }
            categorizedData[documentType].push({ documentType, ...rest });
        });

        const result = Object.entries(categorizedData).map(([documentType, items]) => ({
            documentType,
            items,
        }));

        return result;
    }

    static tokenDecode = token => {
        if (token) {
            const decoded = jwt_decode(token)
            return decoded
        }
    }

    static renderBadgeColor = (status) => {
        switch (status.toLowerCase()) {
        case 'Active':
            return "success"
        case 'fail':
            return "danger"
        case 'validated':
            return "warning"  
        case 'pending':
            return "warning"  
        case 'received':
            return "success" 
        case 'discarded':
            return "danger"
        case 'active':
            return "success"    
        case 'deepfuchsia':
            return "#CE50B2"
        case 'approved':
            return "success"
        case 'rejected':
            return "danger"
        case 'submitted':
            return "primary"
        default: return "warning"    
        }
    }

    static mapAddressToStates(dataArray, mappingKey) {
        const result = Object.keys(mappingKey).reduce((acc, key) => {
            acc[key] = { value: "", errors: {}, rules: { required: mappingKey[key]?.required || false } };
            return acc;
        }, {});

        dataArray.forEach((item) => {
            const types = item.types;
            for (const key in mappingKey) {
                if (types.includes(mappingKey[key].type)) {
                    result[key].value = item.long_name;
                }
            }
        });

        return result;
    }

    static transformInputArray(inputArray) {
        return inputArray.map(category => {
            return {
                category: category.name,
                questions: category.items.map(item => {
                    const [choice1, choice2] = item.type.split('/');
                    return {
                        question: item.text || '',
                        choices: [
                            {
                                label: choice1 === 'yes' ? 'Yes' : 'No',
                                checked: false,
                            },
                            {
                                label: choice2 === 'yes' ? 'Yes' : 'No',
                                checked: false,
                            },
                        ],
                    };
                }),
            };
        });
    }

    static transformData(originalData) {
        function getAnswerBasedOnChecked(choices) {
            const yesChoice = choices.find((choice) => choice.label === 'Yes');
            return yesChoice && yesChoice.checked ? 'Yes' : 'No';
        }

        function getCommentBasedOnChecked(question) {
            const falseData = question.choices.find(item => item.checked)

            if (falseData?.label == "No") {
                return question.description
            } else {
                return ""
            }
        }

        return originalData.map((category) => ({
            name: category.category,
            items: category.questions.map((question) => ({
                text: question.question,
                type: 'yes/no',
                comment: `Comment for ${question.question}`,
                responses: [
                    {
                        answer: getAnswerBasedOnChecked(question.choices),
                        comment: getCommentBasedOnChecked(question),
                    },
                ],
            })),
        }));
    }

    static convertCheckListData(inputData) {
        const convertedData = inputData.map(category => {
            return {
                category: category.name,
                questions: category.items.map(item => {
                    const responses = item.responses.map(response => response.answer === "Yes");
                    return {
                        question: item.text,
                        choices: [
                            { label: "Yes", checked: responses[0] },
                            { label: "No", checked: !responses[0] }
                        ],
                        isDescription: !responses[0],
                        description: item?.responses[0]?.comment || "",
                        isDescriptionFromAdmin: true
                    };
                })
            };
        });

        return convertedData;
    }

    static sortDataByField(data, field, ascending = true) {
        if (data.length === 0 || Object.prototype.hasOwnProperty.call(data[0], field)) {
            return data;
        }

        return data.slice().sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];

            if (ascending) {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
            } else {
                if (valueA < valueB) return 1;
                if (valueA > valueB) return -1;
            }

            return 0;
        });
    }
    static transformMedicalOrderData = (responseArray, disciplinesArray) => {
        const keyMapping = {
            "Nursing": "nurse",
            "Therapies (PT / OT / ST)": "therapist",
            "MSW": "MSW",
            "Aide": "HHA",
        };

        const updatedArray = disciplinesArray.map((discipline) => {
            const updatedDiscipline = { ...discipline };
            const responseKey = keyMapping[updatedDiscipline.title];
            if (responseKey && responseArray[0][responseKey]) {
                updatedDiscipline.disciplines = updatedDiscipline.disciplines.map((service) => {
                    const matchingService = responseArray[0][responseKey].find((responseService) => responseService.service === service.label);

                    if (matchingService) {
                        return {
                            ...service,
                            checked: true,
                            selectedVisitFrequency: matchingService.caseSequence,
                        };
                    } else {
                        return {
                            ...service,
                            checked: false,
                            selectedVisitFrequency: "",
                        };
                    }
                });
            }

            return updatedDiscipline;
        });

        return updatedArray;
    };

    static calculateNextDate(inputDate, numberOfDays) {
        let currentDate = moment(inputDate);
        let nextDate = currentDate.add(numberOfDays, 'days');
        let formattedDate = nextDate.format('MM/DD/YYYY');
        return formattedDate;
    }

    static setDataInLocalStorageWithExpiry(key, value, days = 1) {
        const now = new Date();
    
        const expiryTime = now.getTime() + days * 24 * 60 * 60 * 1000;
    
        const item = {
            value: value,
            expiry: expiryTime,
        };
    
        localStorage.setItem(key, JSON.stringify(item));
    }
    
    static getLocalStorageData(key) {
        const itemStr = localStorage.getItem(key);
    
        if (!itemStr) {
            return null;
        }
    
        try {
            const item = JSON.parse(itemStr);
            if (new Date().getTime() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
    
            return item.value;
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
            return null;
        }
    }

    static hasEmptyValuesInArray(dataArray = []) {
        for (const obj of dataArray) {
            for (const key in obj) {
                if (obj[key]?.rules?.required && (obj[key]?.value === null || obj[key]?.value === '')) {
                    return true; // Found an empty value for a non-allowed property
                }
            }
        }
        return false; // No empty values found or all empty values are allowed
    }
}