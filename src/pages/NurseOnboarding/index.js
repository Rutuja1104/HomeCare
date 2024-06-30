import React, { useEffect } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import {
    componentKey,
    setActiveTabIndex,
    setApplicationId,
    setAttestationAgreementFormAllRequiredFieldsTouched,
    setConflictOfInterestAllRequiredFieldsTouched,
    setDrugFreeWorkplaceFormAllRequiredFieldsTouched,
    setEthicalProfessionalRespectfullFormsAllRequiredFieldsTouched,
    setOrientationChecklistAllRequiredFieldsTouched,
    setReferenceCheckAllRequiredFieldsTouched,
    setSignatureOnAgreement,
    setUserId,
    setUserRole,
    setWeCareHomeCareFormAllRequiredFieldsTouched,
    setWeCareHomeCareLLCFormAllRequiredFieldsTouched
} from "./NurseOnboardingSlice";
import {
    setBackgroundCheck,
    setBackgroundCheckDocument,
    setJobApplicationActiveStep,
    setJobApplicationFormType,
    setUploadedDocumentForAll,
    setUploadedDocuments
} from "../NurseOnboarding/JobApplication/JobApplicationSlice";
import {
    componentKey as professionalInfoComponentKey,
    setPersonalInformationInitialStates,
    setProfessionalDetails,
    setUpdatedQuestionnaires
} from "../NurseOnboarding/JobApplication/ProfessionalInformation/ProfessionalInformationSlice";
import { componentKey as jobApplicationComponentKey } from "../NurseOnboarding/JobApplication/JobApplicationSlice";
import { setNonAuthLayoutHeader } from "../../layouts/LayoutSlice";

import JobApplication from "./JobApplication";
import Loadable from "../../components/loadable/Loadable";
import JobDescription from "./JobDescription/JobDescription";
import ConfidentialAgreement from "./Agreement/ConfidentialAgreement";
import CustomNavigation from "../../components/CustomNavigation/CustomNavigation";
import { getJobApplicationStatus, getUserDetailsById, postCreateDynamicForm, postNurseOnboardingApplication, postUpdateNurseOnboardingStatus } from "./JobApplication/JobApplicationSaga";
import { useParams, useSearchParams } from "react-router-dom";
import { JOB_APPLICATION_TYPE } from "./constants";
import General from "../../libs/utility/General";
import { JOB_ROLES } from "../JobPostings/constants";
import { postAppendDocument, postCheckOnboardingExpiration } from "./NurseOnboardingSaga";
import ImageWithDescription from "../../components/ImageWithDescription/ImageWithDescription";
import { PERSONAL_INFO_INITIAL_STATES } from "./JobApplication/ProfessionalInformation/constants";
import AbuserRegistryAnnualNotice from "../../components/nurseOnboardingNewForms/abuserRegistryAnnualNotice";
import OrientationChecklist from "../../components/nurseOnboardingNewForms/orientationChecklist";
import ReferenceCheck from "../../components/nurseOnboardingNewForms/referenceCheck";
import ConflictOfInterest from "../../components/nurseOnboardingNewForms/conflictOfInterest";
import WecareHomecareLLC from "../../components/nurseOnboardingNewForms/wecareHomecareLLC";
import DrugFreeWorkplace from "../../components/nurseOnboardingNewForms/drugFreeWorkplace";
import EthicalProfessionalRespectfull from "../../components/nurseOnboardingNewForms/ethicalProfessionalRespectfull";
import AttestationAgreementEmployeer from "../../components/nurseOnboardingNewForms/attestationAgreementEmployeer";
import WeCareHomeCare from "../../components/nurseOnboardingNewForms/weCareHomeCare";
import GeneralValidator from "../../libs/utility/validators/GeneralValidator";
import { componentKey as NurseOnboardingKey } from "./NurseOnboardingSlice";
import { toast } from "react-toastify";

const NurseOnboarding = () => {
    const dispatch = useDispatch();

    const { applicationId, agencyId, role } = useParams();
    const [searchParams] = useSearchParams();
    const nurseId = General.getLocalStorageData("nurseId");

    const validatedToken = searchParams.get("token");

    const {loadingState, activeTabIndex, isOnboardingUrlValid, signatureInBase64 } = useSelector(
        (state) => state[componentKey]
    );
    const { userDetailsById, professionalInformation, questionnaires } = useSelector(
        (state) => state[professionalInfoComponentKey]
    );
    const { backgroundCheck, jobApplicationStatus } = useSelector((state) => state[jobApplicationComponentKey]);
    const {
        OrientationChecklistForm: OrientationChecklistFormFields,
        WeCareHomeCareForm: WeCareHomeCareFormFields,
        EthicalProfessionalRespectfullForms: EthicalProfessionalRespectfullFormsFields,
        DrugFreeWorkplace: DrugFreeWorkplaceFields,
        ConflictOfInterest: WeCareHomeCareConflictOfInterestFields,
        AttestationAgreementForm: AttestationAgreementFormFields,
        ReferenceCheckForm: ReferenceCheckFormFields,
        WeCareHomeCareLLCForm: WeCareHomeCareLLCFormFields,
        ReferenceCheck: ReferenceCheckFields,
        ConflictOfInterest: ConflictOfInterestFields,
        AttestationAgreementForm: AttestationAgreementEmployeerFields,
        OrientationChecklistCheckBoxResult,
        ReferenceCheckFormCheckBoxResult,
        weCareHomeCareLLCFormCheckBoxResult
    } = useSelector((state) => state[NurseOnboardingKey]);

    useEffect(() => {
        if (validatedToken) {
            dispatch(postCheckOnboardingExpiration({ token: validatedToken }));
        }
    }, [validatedToken]);

    useEffect(() => {
        if (role) {
            const roleName = JOB_ROLES?.find((item) => item?.code == role);
            dispatch(
                setNonAuthLayoutHeader(
                    `Job Application - ${
                        roleName?.name == roleName?.name.toUpperCase()
                            ? roleName?.name.charAt(0) + roleName?.name?.slice(1).toLowerCase()
                            : roleName?.name
                    }`
                )
            );
        }
    }, [role]);

    useEffect(() => {
        if (applicationId && isOnboardingUrlValid) {
            dispatch(getJobApplicationStatus({ applicationId, agencyId }));
            dispatch(setApplicationId(applicationId));
            dispatch(setUserRole(role));
            dispatch(getUserDetailsById({ applicationId, agencyId }));
        }
    }, [applicationId, isOnboardingUrlValid]);

    useEffect(() => {
        /* eslint-disable */
        if (userDetailsById) {
            switch (userDetailsById.onboardingStatus) {
                case null:
                    dispatch(setActiveTabIndex(0));
                    break;
                case "Step-1":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationActiveStep(1));
                    break;
                case "Step-2":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationActiveStep(2));
                    break;
                case "Step-3":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationActiveStep(3));
                    break;
                case "Step-4":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationActiveStep(4));
                    break;
                case "Step-5":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    } 
                    if(["RN","LPN"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setJobApplicationActiveStep(5));
                    }else{
                        dispatch(setJobApplicationActiveStep(1));
                        dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    }
                    break;
                case "Step-6":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    } 
                    if(["RN","LPN"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setJobApplicationActiveStep(1));
                    }else{
                        dispatch(setJobApplicationActiveStep(2));
                    }
                        dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    break;
                case "Step-7":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                        dispatch(setJobApplicationActiveStep(2));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                        dispatch(setJobApplicationActiveStep(2));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                        dispatch(setJobApplicationActiveStep(3));
                    }else{
                        dispatch(setActiveTabIndex(10));
                        dispatch(setJobApplicationActiveStep(3));
                    } 
                        dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    break;
                case "Step-8":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    } 
                        dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                        dispatch(setJobApplicationActiveStep(3));
                    break;
                case "Step-9":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                        dispatch(setJobApplicationActiveStep(3));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                        dispatch(setJobApplicationActiveStep(4));
                    }else if(["HHA"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                        dispatch(setJobApplicationActiveStep(4));
                    }else{
                        dispatch(setActiveTabIndex(10));
                        dispatch(setJobApplicationActiveStep(4));
                    } 
                        dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    break;
                case "validating-1":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "validating-2":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "validating-3":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "validating-4":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "validating-5":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "validating-6":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "Pending":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setActiveTabIndex(7));
                            dispatch(setJobApplicationActiveStep(5));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "Scheduled":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                            dispatch(setActiveTabIndex(7));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "Fail":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                            dispatch(setActiveTabIndex(7));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "Active":
                    if (["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Final_Steps));
                    if (
                        ![
                            "ADMINISTRATOR",
                            "DCS",
                            "QAPI",
                            "HR",
                            "DSP",
                            "RECEPTIONIST",
                            "MARKETINGMANAGER",
                            "CM"
                        ].includes(userDetailsById.role.toUpperCase())
                    ) {
                        if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                            dispatch(setJobApplicationActiveStep(5));
                            dispatch(setActiveTabIndex(7));
                        } else {
                            dispatch(setJobApplicationActiveStep(4));
                        }
                    } else {
                        dispatch(setJobApplicationActiveStep(3));
                    }
                    break;
                case "Step-NO-1":
                    dispatch(setActiveTabIndex(2));
                    break; 
                case "Step-NO-2":
                    dispatch(setActiveTabIndex(3));
                    break;  
                case "Step-NO-3":
                    dispatch(setActiveTabIndex(4));
                    break;
                case "Step-NO-4":
                    dispatch(setActiveTabIndex(5));
                    break;
                case "Step-NO-5":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST",'MARKETINGMANAGER'].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(3));
                    } else if(["DSP","ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(5));
                    }else{
                        dispatch(setActiveTabIndex(6));
                    }
                    break;
                case "Step-NO-6":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(4));
                    } else if(["DSP","ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(6));
                    }else{
                        dispatch(setActiveTabIndex(7));
                    }
                    break;
                case "Step-NO-7":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(5));
                    } else if(["DSP","ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(7));
                    }else{
                        dispatch(setActiveTabIndex(8));
                    }         
                    break;
                case "Step-NO-8":
                    if (["HHA","COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(5));
                    } else if(["DSP","ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(8));
                    }else{
                        dispatch(setActiveTabIndex(9));
                    }
                    break;
                case "Step-NO-9":
                    if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(6));
                    } else if(["DSP","ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }else{
                        dispatch(setActiveTabIndex(10));
                    }
                    break;
                case "Step-NO-10":
                    if (["HHA"].includes(userDetailsById.role.toUpperCase())) {
                        dispatch(setActiveTabIndex(7));
                    } else if(["DSP","HR"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(10));
                    }else if(["COTA","OT","LPTA","MSW","RN","LPN","DON","PT","ST","MARKETINGMANAGER"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(6));
                    }
                    else if(["ADMINISTRATOR","QAPI","CM","RECEPTIONIST"].includes(userDetailsById.role.toUpperCase())){
                        dispatch(setActiveTabIndex(9));
                    }
                    else{
                        dispatch(setActiveTabIndex(11));
                    }
                    dispatch(setJobApplicationActiveStep(0));
                    break;            
                default:
                    dispatch(setActiveTabIndex(0));
            }
        }
        /* eslint-enable */
    }, [userDetailsById, userDetailsById.onboardingStatus]);
    useEffect(() => {
        if (Object.keys(professionalInformation.personalInfo).length == 0) {
            dispatch(setPersonalInformationInitialStates(PERSONAL_INFO_INITIAL_STATES));
        }
    }, [professionalInformation.personalInfo]);

    useEffect(() => {
        if (userDetailsById && isOnboardingUrlValid) {
            const copiedProfessionalInfo = JSON.parse(JSON.stringify(professionalInformation));
            const userDetails = userDetailsById;

            // Update personal info
            copiedProfessionalInfo.personalInfo.FirstName.value = userDetails.firstName || "";
            copiedProfessionalInfo.personalInfo.MiddleName.value = userDetails.middleName || "";
            copiedProfessionalInfo.personalInfo.LastName.value = userDetails.lastName || "";
            copiedProfessionalInfo.personalInfo.TelephoneNumber.value = userDetails.Telephone || "";
            copiedProfessionalInfo.personalInfo.TelephoneNumber.rules =
                { required: true, regex: { pattern: /\b\d{10}\b/, message: "Please enter 10 digits only" } } || "";
            copiedProfessionalInfo.personalInfo.EmailID.value = userDetails.email || "";
            copiedProfessionalInfo.personalInfo.EmailID.rules =
                { pattern: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address" } || "";
            copiedProfessionalInfo.personalInfo.DateOfBirth.value = userDetails.dob
                ? moment(userDetails.dob).format("MM/DD/YYYY")
                : "";
            copiedProfessionalInfo.personalInfo.SSN.value = userDetails.ssn || "";
            copiedProfessionalInfo.personalInfo.SSN.rules = {
                required: true,
                regex: { pattern: /\b\d{9}\b/, message: "Please enter 9 digits only" }
            };

            // Update address information if available
            if (userDetails.addresses && userDetails.addresses.length > 0) {
                const firstAddress = userDetails.addresses[0];
                copiedProfessionalInfo.personalInfo.AddressId.value = firstAddress?.id || "";
                copiedProfessionalInfo.personalInfo.AddressLine1.value = firstAddress?.addressLine1 || "";
                copiedProfessionalInfo.personalInfo.AddressLine2.value = firstAddress?.addressLine2 || "";
                copiedProfessionalInfo.personalInfo.Landmark.value = firstAddress?.landmark || "";
                copiedProfessionalInfo.personalInfo.City.value = firstAddress?.city || "";
                copiedProfessionalInfo.personalInfo.State.value = firstAddress?.state || "";
                copiedProfessionalInfo.personalInfo.Country.value = firstAddress?.country || "";
                copiedProfessionalInfo.personalInfo.ZipCode.value = firstAddress?.pinCode || "";
            }

            // Update educational information if available
            if (userDetails.educations && userDetails.educations.length > 0) {
                copiedProfessionalInfo.EducationalInformation = userDetails.educations.map((education) => ({
                    id: { value: education?.id || "", errors: {}, rules: { required: false } },
                    InstituteName: { value: education?.instituteName || "", errors: {}, rules: { required: true } },
                    Degree: { value: education?.type || "", errors: {}, rules: { required: true } },
                    Branch: { value: education?.stream || "", errors: {}, rules: { required: true } },
                    EducationalCity: {
                        value: education?.addressId?.length ? education?.addressId.split(",")[0]?.trim() : "" || "",
                        errors: {},
                        rules: { required: true }
                    },
                    EducationalState: {
                        value: education?.addressId?.length ? education?.addressId.split(",")[1]?.trim() : "" || "",
                        errors: {},
                        rules: { required: true }
                    },
                    EducationStartDate: {
                        value: `01/01/${education?.yearAttended}` || "",
                        errors: {},
                        rules: { required: true }
                    },
                    EducationEndDate: {
                        value: `01/01/${education?.yearofPassout}` || "",
                        errors: {},
                        rules: { required: true }
                    }
                }));
            }

            if (userDetails.employments && userDetails.employments.length > 0) {
                copiedProfessionalInfo.PreviousEmployerInfo = userDetails.employments.map((employment) => ({
                    id: { value: employment?.id || "", errors: {}, rules: { required: false } },
                    CompanyName: { value: employment?.Employername || "", errors: {}, rules: { required: true } },
                    JobTitle: { value: employment?.jobTitle || "", errors: {}, rules: { required: true } },
                    JobType: { value: employment?.responsibilities || "", errors: {}, rules: { required: true } },
                    PreviousEmployerContactNumber: {
                        value: employment?.phoneNumber || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerStartingSalary: {
                        value: employment?.startingSalary || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerEndingSalary: {
                        value: employment?.endingSalary || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerStartDate: {
                        value: moment(employment?.startDate).format("MM/DD/YYYY") || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerEndDate: {
                        value: moment(employment?.endDate).format("MM/DD/YYYY") || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerAddressline1: {
                        value: employment?.address?.addressLine1 || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerAddressline2: {
                        value: employment?.address?.addressLine2 || "",
                        errors: {},
                        rules: { required: false }
                    },
                    PreviousEmployerAddresscity: {
                        value: employment?.address?.city || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerAddressstate: {
                        value: employment?.address?.state || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerAddresspinCode: {
                        value: employment?.address?.pinCode || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerAddresscountry: {
                        value: employment?.address?.country || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerCompanyContactNumber: {
                        value: employment?.companyContactNumber || "",
                        errors: {},
                        rules: { required: false }
                    },
                    PreviousEmployerReasonForLeavingCompany: {
                        value: employment?.reasonForLeavingCompany || "",
                        errors: {},
                        rules: { required: true }
                    },
                    PreviousEmployerContactPersonName: {
                        value: employment?.contactPersonName || "",
                        errors: {},
                        rules: { required: true }
                    }
                }));
            }

            // Update reference information if available
            if (userDetails.contacts && userDetails.contacts.length > 0) {
                copiedProfessionalInfo.ReferencesInfo =
                    userDetails.contacts.length !== 0
                        ? userDetails.contacts.map((contact) => ({
                            FirstName: {
                                value: contact.contactFirstName || "",
                                errors: {},
                                rules: { required: true }
                            },
                            LastName: { value: contact.contactLastName || "", errors: {}, rules: { required: true } },
                            id: { value: contact?.id || "", errors: {}, rules: { required: false } },
                            ReferenceRelationship: {
                                value: contact?.contactType || "",
                                errors: {},
                                rules: { required: true }
                            },
                            PhoneNumber: {
                                value: contact?.phoneNumber || "",
                                errors: {},
                                rules: {
                                    required: true,
                                    regex: { pattern: /\b\d{10}\b/, message: "Please enter 10 digits only" }
                                }
                            },
                            email: { value: contact?.email || "", errors: {}, rules: { required: false } },
                            ReferenceTitle: { value: contact.title || "", errors: {}, rules: { required: true } },
                            ReferenceCompany: { value: contact.company || "", errors: {}, rules: { required: true } }
                        }))
                        : [];
            }

            // Update license information if available
            if (userDetails.certifications && userDetails.certifications.length > 0) {
                copiedProfessionalInfo.LicenseInformation = userDetails.certifications.map((certification) => ({
                    id: { value: certification?.id || "", errors: {}, rules: { required: false } },
                    LicenseName: { value: certification?.type || "", errors: {}, rules: { required: true } },
                    LicenseNumber: {
                        value: certification?.certificateNumber || "",
                        errors: {},
                        rules: { required: true }
                    },
                    LicenseState: { value: certification?.stateIssued || "", errors: {}, rules: { required: true } },
                    LicenseExpirationDate: {
                        value: moment(certification?.expiryDate).format("MM/DD/YYYY") || "",
                        errors: {},
                        rules: { required: true }
                    },
                    LicenseDateIssued: {
                        value: moment(certification?.dateIssued).format("MM/DD/YYYY") || "",
                        errors: {},
                        rules: { required: true }
                    }
                }));
            }

            if (
                backgroundCheck.selectedResidingYear.value.length == 0 &&
                backgroundCheck.stateResiding.value.length == 0
            ) {
                let copiedBackgroundCheck = { ...backgroundCheck };
                copiedBackgroundCheck = {
                    selectedResidingYear: {
                        value: userDetails.residenceYears || "",
                        label: userDetails?.residenceYears !== null ? `${userDetails.residenceYears} Years` : "" || ""
                    },
                    stateResiding: { value: userDetails.StateResidence || "", label: userDetails.StateResidence || "" }
                };
                dispatch(setBackgroundCheck(copiedBackgroundCheck));
            }

            const filteredDocuments = {};

            // Loop through the documents and organize them by document type
            userDetails?.documents?.forEach((document) => {
                const documentType = document.documentType;

                if (!filteredDocuments[documentType]) {
                    filteredDocuments[documentType] = [];
                }

                filteredDocuments[documentType].push(document);
            });
            dispatch(setProfessionalDetails(copiedProfessionalInfo));
            dispatch(setUserId(userDetails.id));
            dispatch(setUploadedDocuments(filteredDocuments));
            dispatch(setSignatureOnAgreement(userDetails.digitalSignature));
            dispatch(
                setBackgroundCheckDocument(
                    General.convertDocumentListToWellFormat(filteredDocuments.BackgroundCheck)
                ) || []
            );

            const filteredDocumentArray = userDetails?.documents?.filter(
                (item) => item.documentType !== "BackgroundCheck"
            );
            dispatch(
                setUploadedDocumentForAll(
                    filteredDocumentArray?.map((item) => {
                        return { s3Url: item.s3Url, documentType: item.documentType, id: item.id };
                    })
                ) || []
            );

            const questions = [
                {
                    name: "question 1",
                    question: "Are you of legal age to work?",
                    choices: [
                        { checked: userDetailsById.isLegalToWork == "true", label: "Yes" },
                        { checked: userDetailsById.isLegalToWork == "false", label: "No" }
                    ]
                },
                {
                    name: "question 2",
                    question: "Are you a U.S. citizen?",
                    choices: [
                        { checked: userDetailsById.usCitizen == "true", label: "Yes" },
                        { checked: userDetailsById.usCitizen == "false", label: "No" }
                    ]
                },
                {
                    name: "question 3",
                    question: "Are you available to work full-time?",
                    choices: [
                        { checked: userDetailsById.workType == "Full-time", label: "Full-time" },
                        { checked: userDetailsById.workType == "Part-time", label: "Part-time" }
                    ]
                },
                {
                    name: "question 4",
                    question: "Have you ever been convicted of a crime other than a routine traffic citation?",
                    choices: [
                        { checked: userDetailsById.convictedCrime == "true", label: "Yes" },
                        { checked: userDetailsById.convictedCrime == "false", label: "No" }
                    ]
                }
            ];

            dispatch(setUpdatedQuestionnaires(questions));
        }
    }, [userDetailsById, isOnboardingUrlValid]);

    const commonDataForForm = {
        applicationId: applicationId,
        agencyId: agencyId,
    };
    
    const onboardingSteps = [
        {
            title: "Confidentiality Agreement",
            stepBodyComponent: <ConfidentialAgreement />
        },
        {
            title: "Job Description",
            stepBodyComponent: <JobDescription />,
            submitCb: () => {
                dispatch(
                    postAppendDocument({
                        applicationId: applicationId || "",
                        imageBase64: signatureInBase64,
                        agencyId: agencyId,
                        fileName: "job-description.pdf",
                        fileType: "jobDescription",
                        activeTabIndex: 2
                    })
                );
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-1' }})
                );
                dispatch(setActiveTabIndex(activeTabIndex+1));
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next"
        },
        (role === 'ADMINISTRATOR'||role==='QAPI'||role==='RECEPTIONIST'||role==='HR'||role==='DSP'||role==="MarketingManager"||role==='CM')?{
            title: "Abuser Registry Annual Notice",
            stepBodyComponent: <AbuserRegistryAnnualNotice />,
            submitCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(
                    postAppendDocument({
                        applicationId: applicationId || "",
                        imageBase64: signatureInBase64,
                        agencyId: agencyId,
                        fileName: "job-description.pdf",
                        fileType: "jobDescription",
                        activeTabIndex: 3
                    })
                );
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-2' }})
                );
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(1));
            },
            submitButtonText: "Next"
        }:null,
        (role === 'ADMINISTRATOR'||role==='QAPI'||role==='RECEPTIONIST'||role==='HR'||role==='DSP'||role==="MarketingManager"||role==='CM')?{
            title: "Orientation Checklist",
            stepBodyComponent: <OrientationChecklist />,
            submitCb: () => {
                let result = {};
                
                Object.keys(OrientationChecklistFormFields).forEach(key => {
                    if (OrientationChecklistFormFields[key]?.value || (typeof OrientationChecklistFormFields[key] == 'object')) {
                        result[key] = OrientationChecklistFormFields[key].value ?? " ";
                    }
                    else{
                        result[key]=OrientationChecklistFormFields[key]
                    }
                });
                const formData = {
                    ...result,
                    "OrientationChecklistCheckBoxResult":OrientationChecklistCheckBoxResult,
                    "sign":signatureInBase64
                };
                const id = OrientationChecklistFormFields?.id ? Object.values(OrientationChecklistFormFields['id']).join(''):undefined;
                const data = {
                    fromType: "OrientationChecklist",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data }));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-3' }})
                );
                dispatch(setActiveTabIndex(activeTabIndex+1));
            },

            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([OrientationChecklistFormFields])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setOrientationChecklistAllRequiredFieldsTouched(true));
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next"
        }:null,
        (role === 'HR')? {
            title: "Reference check",
            stepBodyComponent: <ReferenceCheck />,
            submitCb: () => {
                let result = {};
                
                Object.keys(ReferenceCheckFormFields).forEach(key => {
                    if (ReferenceCheckFormFields[key]?.value || (typeof ReferenceCheckFormFields[key] == 'object')) {
                        result[key] = ReferenceCheckFormFields[key].value ?? " ";
                    }
                    else{
                        result[key]=ReferenceCheckFormFields[key]
                    }
                });
                const formData = {
                    ...result,
                    'ReferenceCheckFormCheckBoxResult':ReferenceCheckFormCheckBoxResult
                };
                const id = ReferenceCheckFormFields?.id ? Object.values(ReferenceCheckFormFields['id']).join(''):undefined;

                const data = {
                    fromType: "referenceCheck",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data }));
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-4' }})
                );
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next",
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([ReferenceCheckFormFields])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setReferenceCheckAllRequiredFieldsTouched(true));
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            }
        }:null,
        {
            title: "Conflict of interest",
            stepBodyComponent: <ConflictOfInterest />,
            submitCb: () => {
                let result = {};
                Object.keys(ConflictOfInterestFields).forEach(key => {
                    if (ConflictOfInterestFields[key]?.value || (typeof ConflictOfInterestFields[key] == 'object')) {
                        result[key] = ConflictOfInterestFields[key].value ?? " ";
                    }
                    else{
                        result[key]=ConflictOfInterestFields[key]
                    }
                });
                const formData = {
                    ...result,
                    "sign":signatureInBase64
                };
                const id = ConflictOfInterestFields?.id ? Object.values(ConflictOfInterestFields['id']).join(''):undefined;
                const data = {
                    fromType: "conflictOfInterest",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data }));
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-5' }})
                );
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next",
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([ConflictOfInterestFields])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            }
        },
        {
            title: "Non-Compete Agreement",
            stepBodyComponent: <WeCareHomeCare />,
            submitCb: () => {
                let result = {};
                
                Object.keys(WeCareHomeCareFormFields).forEach(key => {
                    if (WeCareHomeCareFormFields[key]?.value || (typeof WeCareHomeCareFormFields[key] == 'object')) {
                        result[key] = WeCareHomeCareFormFields[key].value ?? " ";
                    }
                    else{
                        result[key]=WeCareHomeCareFormFields[key]
                    }
                });
                const formData = {
                    ...result,
                    "sign":signatureInBase64
                };
                const id = WeCareHomeCareFormFields?.id ? Object.values(WeCareHomeCareFormFields['id']).join(''):undefined;
                const data = {
                    fromType: "nonCompeteAgreement",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data }));
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-6' }})
                );
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next",
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([WeCareHomeCareFormFields])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setWeCareHomeCareFormAllRequiredFieldsTouched(true));
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            }
        },
        (role === 'ADMINISTRATOR'||role==='QAPI'||role==='RECEPTIONIST'||role==='HR'||role==='DSP'||role==="MarketingManager"||role==='CM')?{
            title: "Orientation Checklist",
            stepBodyComponent: <WecareHomecareLLC />,
            submitCb: () => {

                let result = {};
                
                Object.keys(WeCareHomeCareLLCFormFields).forEach(key => {
                    if (WeCareHomeCareLLCFormFields[key]?.value || (typeof WeCareHomeCareLLCFormFields[key] == 'object')) {
                        result[key] = WeCareHomeCareLLCFormFields[key].value ?? " ";
                    }
                    else{
                        result[key]=WeCareHomeCareLLCFormFields[key]
                    }
                });
                const formData = {
                    ...result,
                    'weCareHomeCareLLCFormCheckBoxResult':weCareHomeCareLLCFormCheckBoxResult,
                    "EmployeeSign":signatureInBase64
                };
                const id = WeCareHomeCareLLCFormFields?.id ? Object.values(WeCareHomeCareLLCFormFields['id']).join(''):undefined;
                const data = {
                    fromType: "weCareHomeCareLLC",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data }));
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-7' }})
                );
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next",
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([WeCareHomeCareLLCFormFields])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setWeCareHomeCareLLCFormAllRequiredFieldsTouched(true));
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            }
        }:null,
        {
            title: "Drug Free Workplace",
            stepBodyComponent: <DrugFreeWorkplace />,
            submitCb: () => {
                let result = {};
                
                Object.keys(DrugFreeWorkplaceFields).forEach(key => {
                    if (DrugFreeWorkplaceFields[key]?.value || (typeof DrugFreeWorkplaceFields[key] == 'object')) {
                        result[key] = DrugFreeWorkplaceFields[key].value ?? " ";
                    }
                    else{
                        result[key]=DrugFreeWorkplaceFields[key]
                    }
                });
                const formData = {
                    ...result,
                    "Sign":signatureInBase64
                };
                const id = DrugFreeWorkplaceFields?.id ? Object.values(DrugFreeWorkplaceFields['id']).join(''):undefined;
                const data = {
                    fromType: "drugFreeWorkplace",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data }));  
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-8' }})
                );     
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next",
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([DrugFreeWorkplaceFields])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setDrugFreeWorkplaceFormAllRequiredFieldsTouched(true));
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            }
        },
        (role==='HHA' || role ==='DSP')?{
            title: "Standards Requirements For Provider",
            stepBodyComponent: <EthicalProfessionalRespectfull />,
            submitCb: () => {
                let result = {};
                
                Object.keys(EthicalProfessionalRespectfullFormsFields).forEach(key => {
                    if (EthicalProfessionalRespectfullFormsFields[key]?.value || (typeof EthicalProfessionalRespectfullFormsFields[key] == 'object')) {
                        result[key] = EthicalProfessionalRespectfullFormsFields[key].value ?? " ";
                    }
                    else{
                        result[key]=EthicalProfessionalRespectfullFormsFields[key]
                    }
                });
                const id = EthicalProfessionalRespectfullFormsFields?.id ? Object.values(EthicalProfessionalRespectfullFormsFields['id']).join(''):undefined;
                const formData = {
                    ...result,
                    "sign":signatureInBase64
                };
                const data = {
                    fromType: "standardsRequirementsForProvider",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data }));  
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-9' }})
                );
            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next",
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([
                EthicalProfessionalRespectfullFormsFields
            ])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setEthicalProfessionalRespectfullFormsAllRequiredFieldsTouched(true));
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            }
        }:null,
        {
            title: "Attestation and Agreement to Notify Employer",
            stepBodyComponent: <AttestationAgreementEmployeer />,
            submitCb: () => {

                let result = {};
                
                Object.keys(AttestationAgreementEmployeerFields).forEach(key => {
                    if (AttestationAgreementEmployeerFields[key]?.value || (typeof AttestationAgreementEmployeerFields[key] == 'object')) {
                        result[key] = AttestationAgreementEmployeerFields[key].value ?? " ";
                    }
                    else{
                        result[key]=AttestationAgreementEmployeerFields[key]
                    }
                });
                const formData = {
                    ...result,
                    "sign":signatureInBase64
                };
                const id = AttestationAgreementEmployeerFields?.id ? Object.values(AttestationAgreementEmployeerFields['id']).join(''):undefined;
                const data = {
                    fromType: "attestationAgreementEmployeer",
                    ...commonDataForForm,
                    data: formData,
                    id:id
                };
                dispatch(postCreateDynamicForm({ data })); 
                dispatch(setActiveTabIndex(activeTabIndex+1));
                dispatch(setJobApplicationActiveStep(0));
                dispatch(
                    postUpdateNurseOnboardingStatus({ agencyId:agencyId, applicationId:applicationId, data: { onboardingStatus: 'Step-NO-10' }})
                );   

            },
            backButtonText: "Back",
            prevCb: () => {
                dispatch(setActiveTabIndex(activeTabIndex-1));
            },
            submitButtonText: "Next",
            submitButtonDisabled: GeneralValidator.validateRequiredFieldsArray([AttestationAgreementEmployeerFields])
                ? true
                : false,
            submitButtonDisabledInfoCb: () => {
                dispatch(setAttestationAgreementFormAllRequiredFieldsTouched(true));
                toast.error("Please fill in the required input fields");
                window.scrollTo(0, 0);
            }
        },
        {
            title: "Job Application Form",
            stepBodyComponent: <JobApplication />
        }
    ].filter(step => step !== null);

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            {isOnboardingUrlValid && jobApplicationStatus !== "Discarded" ? (
                <CustomNavigation steps={onboardingSteps} activeTabIndex={activeTabIndex} />
            ) : (
                <>
                    {(isOnboardingUrlValid == false || jobApplicationStatus == "Discarded") && (
                        <ImageWithDescription
                            className="assign-episode-img"
                            content={
                                jobApplicationStatus == "Discarded"
                                    ? "Please try again later. The agency has rejected your application."
                                    : "The link to apply for a job has expired. Please contact the agency."
                            }
                        />
                    )}
                </>
            )}
        </Loadable>
    );
};

export default NurseOnboarding;
