import store from "../../store/store";
import { PAGE_STATE } from "../../libs/constant";

export const componentKey = "NURSE_ONBOARDING";

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        setActiveTabIndex: (state, action) => {
            state.activeTabIndex = action.payload;
        },
        setSignatureOnAgreement: (state, action) => {
            state.signatureInBase64 = action.payload;
        },
        setSignatureOnJobDescription: (state, action) => {
            state.jobDescriptionSignature = action.payload;
        },
        setApplicationId: (state, action) => {
            state.applicationId = action.payload;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setIsOnboardingUrlValid: (state, action) => {
            state.isOnboardingUrlValid = action.payload;
        },
        setAbuserRegistryAnnualNoticeSignature: (state, action) => {
            state.nurseOnboardingNewForms.abuserRegistryAnnualNoticeSignature = action.payload;
        },
        setEthicalProfessionalRespectfulFormDate: (state, action) => {
            state.nurseOnboardingNewForms.ethicalProfessionalRespectfulFormDate = action.payload;
        },
        setWeCareHomeCareFormStates: (state, action) => {
            let WeCareHomeCareForm = { ...state.WeCareHomeCareForm };

            Object.entries(action.payload).map(([key, value]) => {
                WeCareHomeCareForm = {
                    ...state.WeCareHomeCareForm,
                    [key]: {
                        ...state.WeCareHomeCareForm[key],
                        ...value
                    }
                };

                state.WeCareHomeCareForm = WeCareHomeCareForm;
            });
        },
        setEthicalProfessionalRespectfullForms: (state, action) => {
            let EthicalProfessionalRespectfullForms = { ...state.EthicalProfessionalRespectfullForms };

            Object.entries(action.payload).map(([key, value]) => {
                EthicalProfessionalRespectfullForms = {
                    ...state.EthicalProfessionalRespectfullForms,
                    [key]: {
                        ...state.EthicalProfessionalRespectfullForms[key],
                        ...value
                    }
                };

                state.EthicalProfessionalRespectfullForms = EthicalProfessionalRespectfullForms;
            });
        },
        setWeCareHomeCareFormAllRequiredFieldsTouched: (state, action) => {
            state.WeCareHomeCareForm = { ...state.WeCareHomeCareForm, allRequiredFieldsTouched: action.payload };
        },
        setNurseOnboardingNewFormsAllRequiredFieldsTouched: (state, action) => {
            state.EthicalProfessionalRespectfullForms = {
                ...state.EthicalProfessionalRespectfullForms,
                allRequiredFieldsTouched: action.payload
            };
        },
        setDrugFreeWorkplaceForm: (state, action) => {
            let DrugFreeWorkplace = { ...state.DrugFreeWorkplace };

            Object.entries(action.payload).map(([key, value]) => {
                DrugFreeWorkplace = {
                    ...state.DrugFreeWorkplace,
                    [key]: {
                        ...state.DrugFreeWorkplace[key],
                        ...value
                    }
                };

                state.DrugFreeWorkplace = DrugFreeWorkplace;
            });
        },
        setDrugFreeWorkplaceFormAllRequiredFieldsTouched: (state, action) => {
            state.DrugFreeWorkplace = { ...state.DrugFreeWorkplace, allRequiredFieldsTouched: action.payload };
        },
        setConflictOfInterestForm: (state, action) => {
            let ConflictOfInterest = { ...state.ConflictOfInterest };

            Object.entries(action.payload).map(([key, value]) => {
                ConflictOfInterest = {
                    ...state.ConflictOfInterest,
                    [key]: {
                        ...state.ConflictOfInterest[key],
                        ...value
                    }
                };

                state.ConflictOfInterest = ConflictOfInterest;
            });
        },
        setConflictOfInterestFirstCheckbox: (state, action) => {
            state.ConflictOfInterest = { ...state.ConflictOfInterest, checkBoxFirst: action.payload };
        },
        setConflictOfInterestSecondCheckbox: (state, action) => {
            state.ConflictOfInterest = { ...state.ConflictOfInterest, checkBoxSecond: action.payload };
        },
        setConflictOfInterestRequiredFieldsTouched: (state, action) => {
            state.ConflictOfInterest = { ...state.ConflictOfInterest, allRequiredFieldsTouched: action.payload };
        },
        setAttestationAgreementForm: (state, action) => {
            let AttestationAgreementForm = { ...state.AttestationAgreementForm };
            Object.entries(action.payload).map(([key, value]) => {
                AttestationAgreementForm = {
                    ...state.AttestationAgreementForm,
                    [key]: {
                        ...state.AttestationAgreementForm[key],
                        ...value
                    }
                };
                state.AttestationAgreementForm = AttestationAgreementForm;
            });
        },
        setSignAttestationAgreementForm: (state, action) => {
            state.AttestationAgreementForm = { ...state.AttestationAgreementForm, sign: action.payload };
        },
        setAttestationAgreementFormAllRequiredFieldsTouched: (state, action) => {
            state.AttestationAgreementForm = {
                ...state.AttestationAgreementForm,
                allRequiredFieldsTouched: action.payload
            };
        },
        setOrientationChecklist: (state, action) => {
            let OrientationChecklistForm = { ...state.OrientationChecklistForm };

            Object.entries(action.payload).map(([key, value]) => {
                OrientationChecklistForm = {
                    ...state.OrientationChecklistForm,
                    [key]: {
                        ...state.OrientationChecklistForm[key],
                        ...value
                    }
                };

                state.OrientationChecklistForm = OrientationChecklistForm;
            });
        },
        setOrientationChecklistAllRequiredFieldsTouched: (state, action) => {
            state.OrientationChecklistForm = {
                ...state.OrientationChecklistForm,
                allRequiredFieldsTouched: action.payload
            };
        },
        setOrientationChecklistCheckBoxResult: (state, action) => {
            state.OrientationChecklistCheckBoxResult = {
                ...state.OrientationChecklistCheckBoxResult,
                ...action.payload
            };
        },
        setReferenceCheckFormCheckBoxResult: (state, action) => {
            state.ReferenceCheckFormCheckBoxResult = {
                ...state.ReferenceCheckFormCheckBoxResult,
                ...action.payload
            };
        },
        setReferenceCheckForm: (state, action) => {
            let ReferenceCheckForm = { ...state.ReferenceCheckForm };
            Object.entries(action.payload).map(([key, value]) => {
                ReferenceCheckForm = {
                    ...state.ReferenceCheckForm,
                    [key]: {
                        ...state.ReferenceCheckForm[key],
                        ...value
                    }
                };
                state.ReferenceCheckForm = ReferenceCheckForm;
            });
        },
        setReferenceCheckSignature: (state, action) => {
            state.ReferenceCheckForm = { ...state.ReferenceCheckForm, sign: action.payload };
        },
        setReferenceCheckAllRequiredFieldsTouched: (state, action) => {
            state.ReferenceCheckForm = { ...state.ReferenceCheckForm, allRequiredFieldsTouched: action.payload };
        },
        setWeCareHomeCareLLCForm: (state, action) => {
            let WeCareHomeCareLLCForm = { ...state.WeCareHomeCareLLCForm };
            Object.entries(action.payload).map(([key, value]) => {
                WeCareHomeCareLLCForm = {
                    ...state.WeCareHomeCareLLCForm,
                    [key]: {
                        ...state.WeCareHomeCareLLCForm[key],
                        ...value
                    }
                };
                state.WeCareHomeCareLLCForm = WeCareHomeCareLLCForm;
            });
        },
        setWeCareHomeCareLLCFormSignatureAgency: (state, action) => {
            state.WeCareHomeCareLLCForm = { ...state.AgencyStaffSignature, AgencyStaffSignature: action.payload };
        },
        setWeCareHomeCareLLCFormSignatureEmployee: (state, action) => {
            state.WeCareHomeCareLLCForm = { ...state.WeCareHomeCareLLCForm, EmployeeSign: action.payload };
        },
        setWeCareHomeCareLLCFormAllRequiredFieldsTouched: (state, action) => {
            state.WeCareHomeCareLLCForm = { ...state.WeCareHomeCareLLCForm, allRequiredFieldsTouched: action.payload };
        },
        setWeCareHomeCareLLCFormCheckBoxResult: (state, action) => {
            state.weCareHomeCareLLCFormCheckBoxResult = {
                ...state.weCareHomeCareLLCFormCheckBoxResult,
                [action.payload]: !state.weCareHomeCareLLCFormCheckBoxResult[action.payload]
            };
        },
        setEthicalProfessionalRespectfullFormsSign:(state, action) => {
            state.EthicalProfessionalRespectfullForms = { ...state.EthicalProfessionalRespectfullForms, sign: action.payload };
        },
        setEthicalProfessionalRespectfullFormsAllRequiredFieldsTouched:(state, action) => {
            state.EthicalProfessionalRespectfullForms = { ...state.EthicalProfessionalRespectfullForms, allRequiredFieldsTouched: action.payload };
        },
        setWeCareHomeCareFormSign:(state, action) => {
            state.setWeCareHomeCareFormSign = { ...state.setWeCareHomeCareFormSign, sign: action.payload };
        },
        setDrugFreeWorkplace:(state, action) => {
            state.DrugFreeWorkplace = { ...state.DrugFreeWorkplace, sign: action.payload };
        },
        setConflictOfInterest:(state, action) => {
            state.ConflictOfInterest = { ...state.ConflictOfInterest, sign: action.payload };
        },
        setConflictOfInterestAllRequiredFieldsTouched:(state, action) => {
            state.ConflictOfInterest = { ...state.ConflictOfInterest, allRequiredFieldsTouched: action.payload };
        },
        setAttestationAgreementFormSign:(state, action) => {
            state.AttestationAgreementForm = { ...state.AttestationAgreementForm, sign: action.payload };
        },
        setOrientationChecklistFormSign:(state, action) => {
            state.OrientationChecklistForm = { ...state.OrientationChecklistForm, sign: action.payload };
        },
        setNurseOnboardingFormDetails:(state, action) => {
            state.nurseOnboardingformsDetail = action?.payload
        },
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.PAGE_READY, message: "" },
        activeTabIndex: 0,
        signatureInBase64: "",
        jobDescriptionSignature: "",
        applicationId: "",
        userRole: "",
        userId: "",
        isOnboardingUrlValid: null,
        nurseOnboardingNewForms: { abuserRegistryAnnualNoticeSignature: "" },
        WeCareHomeCareForm: {
            allRequiredFieldsTouched: false,
            Date: { value: "", errors: {}, rules: { required: true } },
            EmployeeName: { value: "", errors: {}, rules: { required: true } },
            CompanyRepresentative: { value: "", errors: {}, rules: { required: true } },
            sign:""
        },
        EthicalProfessionalRespectfullForms: {
            allRequiredFieldsTouched: false,
            Date: { value: "", errors: {}, rules: { required: true } },
            sign:""
        },
        DrugFreeWorkplace: {
            allRequiredFieldsTouched: false,
            Date: { value: "", errors: {}, rules: { required: true } },
            EmployeeName: { value: "", errors: {}, rules: { required: true } },
            Sign:""
        },
        ConflictOfInterest: {
            checkBoxFirst: false,
            checkBoxSecond: false,
            allRequiredFieldsTouched: false,
            Name: { value: "", errors: {}, rules: { required: true } },
            Title: { value: "", errors: {}, rules: { required: true } },
            Date: { value: "", errors: {}, rules: { required: true } },
            desc: { value: "", errors: {}, rules: { required: false } },
            dealWith:{ value: "", errors: {}, rules: { required: false } },
            sign:""
        },
        AttestationAgreementForm: {
            sign: "",
            allRequiredFieldsTouched: false,
            Name: { value: "", errors: {}, rules: { required: true } },
            Date: { value: "", errors: {}, rules: { required: true } }
        },
        OrientationChecklistForm: {
            allRequiredFieldsTouched: false,
            EmployerRepresentative: { value: "", errors: {}, rules: { required: true } },
            EmployeeName: { value: "", errors: {}, rules: { required: true } },
            Title: { value: "", errors: {}, rules: { required: true } },
            // EmployeeSignature: { value: "", errors: {}, rules: { required: true } },
            // Signature: { value: "", errors: {}, rules: { required: true } },
            DateOfHire: { value: "", errors: {}, rules: { required: true } },
            DateOfOrientation: { value: "", errors: {}, rules: { required: true } },
            sign:""
        },
        OrientationChecklistCheckBoxResult: {},
        ReferenceCheckForm: {
            allRequiredFieldsTouched: false,
            Date: { value: "", errors: {}, rules: { required: true } },
            SentTo: { value: "", errors: {}, rules: { required: true } },
            ManagerPhone: { value: "", errors: {}, rules: { required: true } },
            Address: { value: "", errors: {}, rules: { required: true } },
            NameofApplicant: { value: "", errors: {}, rules: { required: true } },
            SS: { value: "", errors: {}, rules: { required: true } },
            PositionHeld: { value: "", errors: {}, rules: { required: true } },
            StartDate: { value: "", errors: {}, rules: { required: true } },
            EndDate: { value: "", errors: {}, rules: { required: true } },
            ReferenceCheckCompletedBy: { value: "", errors: {}, rules: { required: true } },
            Date2: { value: "", errors: {}, rules: { required: true } },
            SpokeWith: { value: "", errors: {}, rules: { required: true } },
            DateMailed: { value: "", errors: {}, rules: { required: true } },
            description: { value: "", errors: {}, rules: { required: true } },
            sign: ""
        },
        ReferenceCheckFormCheckBoxResult: {},
        WeCareHomeCareLLCForm:{
            allRequiredFieldsTouched: false,
            AgencyStaffSignature: "",
            AgencyStaffName: { value: "", errors: {}, rules: { required: true } },
            AgencyStaffTitle: { value: "", errors: {}, rules: { required: true } },
            AgencyStaffDateCompleted:{ value: "", errors: {}, rules: { required: true } },
            EmployeeName:{ value: "", errors: {}, rules: { required: true } },
            EmployeeSign:"",
            Date:{ value: "", errors: {}, rules: { required: true } },
            
        },
        weCareHomeCareLLCFormCheckBoxResult:{},
        nurseOnboardingformsDetail:{}
    }
});

export const {
    setLoadingState,
    setActiveTabIndex,
    setSignatureOnAgreement,
    setSignatureOnJobDescription,
    setApplicationId,
    setUserRole,
    setUserId,
    setIsOnboardingUrlValid,
    setAbuserRegistryAnnualNoticeSignature,
    setEthicalProfessionalRespectfulFormDate,
    setWeCareHomeCareFormStates,
    setNurseOnboardingNewFormsAllRequiredFieldsTouched,
    setWeCareHomeCareFormAllRequiredFieldsTouched,
    setEthicalProfessionalRespectfullForms,
    setDrugFreeWorkplaceForm,
    setDrugFreeWorkplaceFormAllRequiredFieldsTouched,
    setConflictOfInterestForm,
    setConflictOfInterestFirstCheckbox,
    setConflictOfInterestSecondCheckbox,
    setConflictOfInterestRequiredFieldsTouched,
    setAttestationAgreementForm,
    setAttestationAgreementFormAllRequiredFieldsTouched,
    setSignAttestationAgreementForm,
    setOrientationChecklist,
    setOrientationChecklistAllRequiredFieldsTouched,
    setOrientationChecklistCheckBoxResult,
    setReferenceCheckForm,
    setReferenceCheckFormCheckBoxResult,
    setReferenceCheckAllRequiredFieldsTouched,
    setReferenceCheckSignature,
    setWeCareHomeCareLLCForm,
    setWeCareHomeCareLLCFormSignatureAgency,
    setWeCareHomeCareLLCFormAllRequiredFieldsTouched,
    setWeCareHomeCareLLCFormSignatureEmployee,
    setWeCareHomeCareLLCFormCheckBoxResult,
    setEthicalProfessionalRespectfullFormsSign,
    setWeCareHomeCareFormSign,
    setDrugFreeWorkplace,
    setConflictOfInterest,
    setAttestationAgreementFormSign,
    setOrientationChecklistFormSign,
    setConflictOfInterestAllRequiredFieldsTouched,
    setEthicalProfessionalRespectfullFormsAllRequiredFieldsTouched,
    setNurseOnboardingFormDetails
} = actions;
