import React from 'react';

import { Navigate } from 'react-router-dom';
import { ROLES } from '../libs/constant';

import {
    HOME_SECTION_ROUTES,
    JOB_POSTING,
    JOB_POSTING_ROUTES,
    STAFF_MANAGEMENT_ROUTES,
    NURSE_ONBOARDING_ROUTES,
    PHYSICIANS,
    PHYSICIAN_MANAGEMENT_ROUTES,
    NURSE_DASHBOARD,
} from './constants';

import Home from '../pages/Home';
import ComponentDirectory from '../components/ComponentDirectory';
import PatientManagement from '../pages/PatientManagement/referral-intake';
import NurseOnboarding from '../pages/NurseOnboarding';
import AddNewPatient from '../pages/PatientManagement/referral-intake/AddNewPatient';
import Login from '../pages/Authentication/login/Login';
import ForgotPassword from '../pages/Authentication/ForgotPassword/ForgotPassword';
import NewPassword from '../pages/Authentication/newPassword/NewPassword';
import JobApplicationList from '../pages/JobPostings/JobApplicationList/JobApplicationList';
import AddPhysicianOrder from '../pages/PatientManagement/AddPhysicianOrder/AddPhysicianOrder';
import PhysicianOrderFlow from '../pages/PatientManagement/PhysicianOrder';
import Posting from '../pages/JobPostings/JobPosting/Posting';
import ViewPatient from '../pages/PatientManagement/ViewUpdateDelete/ViewPatient';
import NurseListing from '../pages/StaffManagement/NurseManagement/NurseListing/NurseListing';
import JobApplicationDetails from '../pages/JobPostings/JobApplicationDetails/JobApplicationDetails';
import JobApplicants from '../pages/JobPostings/JobApplicants/JobApplicants';
import NurseDetails from '../pages/StaffManagement/NurseManagement/NurseDetails/NurseDetails';
import TherapistListing from '../pages/StaffManagement/TherapistManagement/TherapistListing/TherapistListing';
import PhysicianManagement from '../pages/PhysicianManagement';
import ViewPhysician from '../pages/PhysicianManagement/ViewPhyisican/Viewphysician';
import OtherRoleListing from '../pages/StaffManagement/OtherRoleManagements/OtherRoleListing/OtherRoleListing';
import InHouseListing from '../pages/StaffManagement/InHouseManagement/InHouseListing/InHouseListing';
import ResetPassword from '../pages/Authentication/resetPassword/ResetPassword';
import ViewJobPostPage from '../pages/JobPostings/JobApplicationList/ViewJobPostPage';
import NurseDashboard from '../pages/episodeManagement/client/NurseDashboard/NurseDashboard';

const PUBLIC_ROUTES = [
    { path: '/login', component: <Login /> },

    { path: '/forgot-password', component: <ForgotPassword /> },
    { path: '/new-password', component: <NewPassword /> },
    { path: '/reset-password/:userId', component: <ResetPassword /> },
    { path: '/', component: <Navigate to="/home" /> }
];

const AUTH_PROTECTED_ROUTES = [
    { path: `/${HOME_SECTION_ROUTES.HOME}`, component: <Home />, roles: [ROLES.ADMIN] },
    { path: `/${NURSE_DASHBOARD.NURSE_DASHBOARD}`, component: <NurseDashboard />, roles: [ROLES.NURSE, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },
    { path: `/${HOME_SECTION_ROUTES.HOME}/${HOME_SECTION_ROUTES.CHILD_ROUTS.PROFILE_DETAILS}`, component: <Home />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },
    { path: '/patientmanagement', component: <PatientManagement />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON] },
    { path: '/patientmanagement/view-patient/:patientId', component: <ViewPatient />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },
    { path: '/patientmanagement/add-new-patient', component: <AddNewPatient />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },
    { path: '/patientmanagement/add-physician-orders', component: <AddPhysicianOrder />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },

    // physicianmanagement
    { path: `/${PHYSICIAN_MANAGEMENT_ROUTES.PHYSICIAN_MANAEMENT}`, component: <PhysicianManagement />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },
    { path: `/${PHYSICIAN_MANAGEMENT_ROUTES.PHYSICIAN_MANAEMENT}/view-physician/:physicianId`, component: <ViewPhysician />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },

    //Nurse Management Routes
    { path: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.NURSE_LIST}`, component: <NurseListing />, roles: [ROLES.ADMIN] },
    { path: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.THERAPIST_LIST}`, component: <TherapistListing />, roles: [ROLES.ADMIN] },
    { path: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.NURSE_DETAILS}`, component: <NurseDetails />, roles: [ROLES.ADMIN] },
    { path: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.OTHER_LIST}`, component: <OtherRoleListing />, roles: [ROLES.ADMIN] },
    { path: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.IN_HOUSE_STAFF}`, component: <InHouseListing />, roles: [ROLES.ADMIN] },

    { path: '/component-directory', component: <ComponentDirectory />, roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM] },
    { path: '*', component: <Navigate to="/home" replace /> },

    // Job Posting Routes
    { path: `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_APPLICATION_DETAILS}/:nurseId`, component: <JobApplicationDetails />, roles: [ROLES.ADMIN] },
    { path: `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_APPLICATIONS}`, component: <JobApplicants />, roles: [ROLES.ADMIN] },
    { path: `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_POSTING_LIST}`, component: <Posting />, roles: [ROLES.ADMIN] },
];

const NURSE_ONBOARDING_ROUTE = [
    { path: `/${NURSE_ONBOARDING_ROUTES.JOB_APPLICATION}/:role/:applicationId/:agencyId`, component: <NurseOnboarding /> },
    { path: `/${JOB_POSTING_ROUTES.JOB_POSTING}/:agencyId`, component: <JobApplicationList /> },
    { path: `/${JOB_POSTING_ROUTES.JOB_POST}/:agencyId/post/:postId`, component: <ViewJobPostPage /> },

    { path: `/${PHYSICIANS.PHYISICIAN_ORDER}/:agencyId/:physicianId/:patientId`, component: <PhysicianOrderFlow /> },
];

export { AUTH_PROTECTED_ROUTES, PUBLIC_ROUTES, NURSE_ONBOARDING_ROUTE };
