import React, { useEffect, useState } from 'react';
import Container from '../../../components/container/Container';
import CustomizedMenus from '../../../components/dropdownWithButton/DropdownWithButton';
import FilterButton from '../../../components/filterButton/FilterButton';
import FilterDrawer from '../../../components/filterDrawer/Drawer';
import RichGrid from '../../../components/richgrid/RichGrid';
import TextInput from '../../../components/input/textinput/TextInput';
import TextInput2 from '../../../components/input/materialinput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { deletePatientById, getAllPatients, getPatientById, patchUpadatePatientById } from './PatientManagementSaga';
import {
    componentKey,
    setAutoCompleteAddressFields,
    setDataToUpdate,
    setPaginationState,
    setSearch,
    setUpdatePatient
} from './PatientManagementSlice';
import DotToggleButton from '../../../components/dotToggleButton/DotToggleButton';
import BadgeV2 from '../../../components/badge/BadgeV2';
import General from '../../../libs/utility/General';

import { setHeaderLabel } from '../../../layouts/LayoutSlice';
import BasicModal from '../../../components/modal/Modal';
import Button from '../../../components/button/Button';
import { BUTTON_TYPE } from '../../../libs/constant';
import ViewPatient from '../ViewUpdateDelete/ViewPatient';
import Loadable from '../../../components/loadable/Loadable';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ROW_SELECTION_OPTIONS } from '../../../components/pagination/constants';
import GoogleAutoComplete from '../../../components/googleAutoComplete/GoogleAutoComplete';
import { generalValidator } from '../../../libs/utility/validators/GeneralValidator';
import { setActiveRefferalPatientIntakeStep } from '../AddPhysicianOrder/physicianOrderSlice';
import useFlexCleanup from '../../../store/FlexCleanup';
const OPTIONS = ['View', 'Update', 'Delete'];
const PatientManagement = () => {
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const { allPatients, loadingState, PaginationState, search, patientById, dataToUpdate, patientId } = useSelector(
        (state) => state[componentKey]
    );
    const token = General.getLocalStorageData("token")
    const agencyId = General.getLocalStorageData('agencyId');
    const dispatch = useDispatch();
    const [toggleIndex, setToggleIndex] = useState(-1);
    const [optionsData, setOptionsData] = useState(OPTIONS);
    const [viewPatientVisible, setViewPatientVisible] = useState(false);
    const [clickedRowIndex, setClickedRowIndex] = useState(-1);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const dropdownSelect = () => {};
    useFlexCleanup(componentKey)

    const ASSIGN_MEMBER_COLUMNS = [
        {
            field: 'firstName',
            header: 'First Name',
            renderLogic: (row, idx) => (
                <span
                    style={{
                        maxWidth: '100px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block'
                    }}
                >
                    {row?.firstName}
                </span>
            )
        },
        {
            field: 'lastName',
            header: 'Last Name',
            renderLogic: (row, idx) => (
                <span
                    style={{
                        maxWidth: '100px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block'
                    }}
                >
                    {row?.lastName}
                </span>
            )
        },
        {
            field: 'phoneNumber',
            header: 'Contact',
            renderLogic: (row, idx) => <span>{row?.phoneNumber || '-'}</span>
        },
        {
            field: 'gender',
            header: 'Gender',
            renderLogic: (row, idx) => <span>{row?.gender}</span>
        },
        {
            field: 'physicianName',
            header: 'Physician',
            renderLogic: (row, idx) => (
                <span
                    style={{
                        maxWidth: '100px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block'
                    }}
                >
                    {`${row.physician?.firstName || '-'} ${row.physician?.lastName || ''}`.trim()}
                </span>
            )
        },

        {
            field: 'insurance',
            header: 'Insurance',
            renderLogic: (row, idx) => (
                <span
                    style={{
                        maxWidth: '100px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block'
                    }}
                >
                    {row?.payer[0]?.payerName || '-'}
                </span>
            )
        },
        {
            field: 'state',
            header: 'State',
            renderLogic: (row, idx) => (
                <span
                    style={{
                        maxWidth: '100px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block'
                    }}
                >
                    {row?.homeAddress?.state}
                </span>
            )
        },
        {
            field: 'date',
            header: 'Date OnBoarding',
            renderLogic: (row, idx) => (
                <span>{moment(new Date(row?.created_at).toISOString()).format('MM-DD-YYYY')}</span>
            )
        },
        {
            field: 'mrn',
            header: 'MRN',
            renderLogic: (row, idx) => <span>{row?.mrn || '-'}</span>
        },
        {
            field: 'status',
            header: 'Status',
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.patientServiceStatus || '')}>
                    {row?.patientServiceStatus}
                </BadgeV2>
            )
        },
        {
            field: 'more',
            header: '',
            renderLogic: (row, idx) => {
                return (
                    <DotToggleButton
                        optionsData={optionsData}
                        onSelect={(item) => onSelect(item, idx, row)}
                        showToggle={toggleIndex === idx ? true : false}
                        dropdownSelect={dropdownSelect}
                    />
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(setHeaderLabel('Patient Management'));
    }, []);

    const onSearchChangeHandler = ({ target: { value } }) => {
        dispatch(setSearch(value));
    };

    const closeFilterDrawer = () => {
        setIsFilterDrawerOpen(false);
    };

    const navigate = useNavigate();
    const onSelect = (item, index, row) => {
        if (item === 'View') {
            const patientId = allPatients[index]?.id;
            navigate(`/patientmanagement/view-patient/${patientId}`);
            setViewPatientVisible(true);
            setClickedRowIndex(index);
        } else if (item === 'Update') {
            setOpenUpdateModal(true);
            setClickedRowIndex(index);
            dispatch(setDataToUpdate(row));
        } else if (item === 'Delete') {
            setOpenDeleteModal(true);
            setClickedRowIndex(index);
        }
    };
    const handleDeletePatient = (patientId) => {
        dispatch(deletePatientById({ agencyId, patientId, allPatients, PaginationState, token }));

        setOpenDeleteModal(false);
    };

    
    const handlePlaceSelect = (place) => {
        const mappingKey = {
            addressLine2: { type: 'locality', required: false },
            city: { type: 'administrative_area_level_2', required: true },
            state: { type: 'administrative_area_level_1', required: true },
            country: { type: 'country', required: true },
            pinCode: { type: 'postal_code', required: true }
        };
    
        const streetNumberComponent = place.address_components.find(component => component.types.includes('street_number'));
        const routeComponent = place.address_components.find(component => component.types.includes('route'));
    
        let addressLine1Value = `${streetNumberComponent ? streetNumberComponent.long_name : ''} ${routeComponent ? routeComponent.long_name : ''}`;
    
        if (!addressLine1Value.trim()) {
            addressLine1Value = place.formatted_address.split(',')[0].trim();
        }
    
        const result = {
            addressLine1: {
                value: addressLine1Value,
                errors: {},
                rules: {
                    required: true
                }
            },
            ...General.mapAddressToStates(place.address_components, mappingKey)
        };
    
        dispatch(
            setUpdatePatient({
                object: { addressLine1: result.addressLine1 },
                filedName: 'updatePatient'
            })
        );
    
        dispatch(setAutoCompleteAddressFields(result));
    };
    
    
    useEffect(() => {
        dispatch(setSearch(search));
        let delayedApiCall;
        if (search !== undefined && search !== '') {
            delayedApiCall = setTimeout(() => {
                dispatch(setPaginationState({ PageNumber: 1 }));
                dispatch(
                    getAllPatients({
                        agencyId,
                        pageNumber: 1,
                        limit: PaginationState.PageSize,
                        search,
                        status: PaginationState.status,
                        token

                    })
                );
            }, 300);
        } else {
            dispatch(
                getAllPatients({
                    agencyId,
                    pageNumber: PaginationState.pageNumber,
                    limit: PaginationState.PageSize,
                    search,
                    status: PaginationState.status,
                    token
                })
            );
        }

        return () => clearTimeout(delayedApiCall);
    }, [search]);

    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setUpdatePatient({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setUpdatePatient({ [name]: { value } }));
        }
    };

 
    return (
        <div>
            <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
                <Container>
                    {!viewPatientVisible && (
                        <>
                            <div className="patientMgt-container">
                                <div className="filter-section">
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please search patient by firstname/lastname or MRN'}
                                            name="firstname"
                                            onChangeCb={(event) => onSearchChangeHandler(event)}
                                            label="Search Patient"
                                        />
                                    </div>
                                </div>
                                <div className="add-patient-section">
                                    <FilterButton
                                        className="filter-button "
                                        onClickCb={() => setIsFilterDrawerOpen(true)}
                                    />
                                    <CustomizedMenus />
                                </div>
                                {isFilterDrawerOpen && (
                                    <FilterDrawer
                                        isOpen={isFilterDrawerOpen}
                                        onClose={closeFilterDrawer}
                                        setIsOpen={setIsFilterDrawerOpen}
                                    />
                                )}
                            </div>
                            <div className="patient-table mt-4">
                                <RichGrid
                                    data={allPatients}
                                    columns={ASSIGN_MEMBER_COLUMNS}
                                    selectable={false}
                                    extractRowKey={(row) => row.name}
                                    paginationProps={{
                                        page: PaginationState.PageNumber,
                                        take: PaginationState.PageSize,
                                        takeOptions: ROW_SELECTION_OPTIONS,
                                        total: PaginationState.totalPatients,
                                        onChangeTakeCb: (newTake) => {
                                            // const updatedStatus = status === 'active' ? 'active' : 'pending';
                                            dispatch(
                                                setPaginationState({
                                                    ...PaginationState,
                                                    PageNumber: 1,
                                                    PageSize: newTake,token
                                                    // limit:newTake
                                                })
                                            );
                                            dispatch(
                                                getAllPatients({
                                                    // allPatients,
                                                    agencyId,
                                                    pageNumber: PaginationState.pageNumber,
                                                    limit: newTake,
                                                    status: PaginationState.status,
                                                    search,token
                                                    // startDate
                                                })
                                            );
                                        },
                                        onChange: (page) => {
                                            dispatch(
                                                getAllPatients({
                                                    // allPatients,
                                                    agencyId,
                                                    pageNumber: page,
                                                    limit: PaginationState.PageSize,
                                                    status: PaginationState.status,
                                                    search,
                                                    token
                                                    // startDate
                                                })
                                            );

                                            dispatch(setPaginationState({ PageNumber: page }));
                                        }
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {viewPatientVisible && clickedRowIndex !== -1 && (
                        <ViewPatient
                            patientData={allPatients[clickedRowIndex]}
                            onClose={() => {
                                setViewPatientVisible(false);
                                setClickedRowIndex(-1);
                            }}
                        />
                    )}

                    {openDeleteModal && (
                        <BasicModal
                            open={openDeleteModal}
                            title={`Are you sure you want to delete ${
                                allPatients[clickedRowIndex]?.firstName + ' ' + allPatients[clickedRowIndex]?.lastName
                            }?`}
                            closeButtonHandler={() => setOpenDeleteModal(false)}
                            handleClose={() => setOpenDeleteModal(false)}
                            customStyle={{
                                width: '40%'
                            }}
                        >
                            <div className="nextbuttons">
                                <Button
                                    type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                                    className="button-width primary-light-with-border-btn me-4"
                                    onClickCb={() => {
                                        setOpenDeleteModal(false);
                                    }}
                                >
                                    No
                                </Button>
                                <Button
                                    type={BUTTON_TYPE.PRIMARY}
                                    className="button-width primary-btn"
                                    onClickCb={() => {
                                        const patientId = allPatients[clickedRowIndex]?.id;
                                        if (patientId) {
                                            handleDeletePatient(patientId);
                                        }
                                    }}
                                >
                                    Yes
                                </Button>
                            </div>
                        </BasicModal>
                    )}

                    {openUpdateModal && (
                        <BasicModal
                            open={openUpdateModal}
                            title={"Update Patient's Details"}
                            closeButtonHandler={() => setOpenUpdateModal(false)}
                            handleClose={() => setOpenUpdateModal(false)}
                            customStyle={{
                                width: '55%'
                            }}
                        >
                            <div className="update-patient">
                                <div className="information">
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter firstname'}
                                            name="firstName"
                                            onChangeCb={(event) => onChangeHandler(event, dataToUpdate.firstName.rules)}
                                            // onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                            label="Firstname"
                                            value={dataToUpdate.firstName.value}
                                            rules={dataToUpdate.firstName.rules}
                                            errors={dataToUpdate.firstName.errors}
                                            // formSubmitted={serviceDetailsFieldTouched}
                                        />
                                    </div>
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter lastname'}
                                            name="lastName"
                                            // onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                            label="Lastname"
                                            onChangeCb={(event) => onChangeHandler(event, dataToUpdate.lastName.rules)}
                                            value={dataToUpdate.lastName.value}
                                            rules={dataToUpdate.lastName.rules}
                                            errors={dataToUpdate.lastName.errors}
                                            // formSubmitted={serviceDetailsFieldTouched}
                                        />
                                    </div>
                                </div>
                                <div className="information">
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter email'}
                                            name="email"
                                            // onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                            label="Email"
                                            onChangeCb={(event) => onChangeHandler(event, dataToUpdate.email.rules)}
                                            value={dataToUpdate.email.value}
                                            rules={dataToUpdate.email.rules}
                                            errors={dataToUpdate.email.errors}
                                            // formSubmitted={serviceDetailsFieldTouched}
                                        />
                                    </div>
                                    <div className="block">
                                        <TextInput
                                            type="number"
                                            placeHolder={'Please enter phone number'}
                                            name="phoneNumber"
                                            // onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                            label="Contact"
                                            onChangeCb={(event) =>
                                                onChangeHandler(event, dataToUpdate.phoneNumber.rules)
                                            }
                                            value={dataToUpdate.phoneNumber.value}
                                            rules={dataToUpdate.phoneNumber.rules}
                                            errors={dataToUpdate.phoneNumber.errors}
                                            // formSubmitted={serviceDetailsFieldTouched}
                                        />
                                    </div>
                                </div>
                                <div className="information">
                                    <div className="block">
                                        <TextInput
                                            type="number"
                                            placeHolder={'Please enter HIC'}
                                            name="HICNumber"
                                            // onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                            label="HIC"
                                            onChangeCb={(event) => onChangeHandler(event, dataToUpdate.HICNumber.rules)}
                                            value={dataToUpdate.HICNumber.value}
                                            rules={dataToUpdate.HICNumber.rules}
                                            errors={dataToUpdate.HICNumber.errors}
                                            // formSubmitted={serviceDetailsFieldTouched}
                                        />
                                    </div>
                                    <div className="block">
                                        <TextInput
                                            type="number"
                                            placeHolder={'Please enter ssn'}
                                            name="ssn"
                                            onChangeCb={(event) => onChangeHandler(event, dataToUpdate.ssn.rules)}
                                            // onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                                            label="SSN"
                                            value={dataToUpdate.ssn.value}
                                            rules={dataToUpdate.ssn.rules}
                                            errors={dataToUpdate.ssn.errors}
                                            // formSubmitted={serviceDetailsFieldTouched}
                                        />
                                    </div>
                                </div>
                                <div className="information">
                                    <div className="block">
                                        <GoogleAutoComplete
                                            name="addressLine1"
                                            label="Address Line 1"
                                            placeHolder="Please enter address line 1"
                                            onChangeCb={(event) =>
                                                onChangeHandler(event, dataToUpdate.homeAddress?.addressLine1.rules)
                                            }
                                            value={dataToUpdate.homeAddress?.addressLine1.value}
                                            rules={dataToUpdate.homeAddress?.addressLine1.rules}
                                            errors={dataToUpdate.homeAddress?.addressLine1.errors}
                                            // formSubmitted={dataToUpdateFieldTouched}
                                            onPlaceSelectedCb={handlePlaceSelect}
                                        />
                                    </div>
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter address line 2'}
                                            name="addressLine2"
                                            label="Address Line 2"
                                            onChangeCb={(event) =>
                                                onChangeHandler(event, dataToUpdate.homeAddress?.addressLine2.rules)
                                            }
                                            value={dataToUpdate.homeAddress?.addressLine2.value}
                                            rules={dataToUpdate.homeAddress?.addressLine2.rules}
                                            errors={dataToUpdate.homeAddress?.addressLine2.errors}
                                            // formSubmitted={dataToUpdateFieldTouched}
                                        />
                                    </div>
                                </div>
                                <div className="information">
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter city'}
                                            name="city"
                                            label="City"
                                            onChangeCb={(event) =>
                                                onChangeHandler(event, dataToUpdate.homeAddress?.city.rules)
                                            }
                                            value={dataToUpdate.homeAddress?.city.value}
                                            rules={dataToUpdate.homeAddress?.city.rules}
                                            errors={dataToUpdate.homeAddress?.city.errors}
                                            // formSubmitted={dataToUpdateFieldTouched}
                                        />
                                    </div>
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter state'}
                                            name="state"
                                            label="State"
                                            onChangeCb={(event) =>
                                                onChangeHandler(event, dataToUpdate.homeAddress?.state.rules)
                                            }
                                            value={dataToUpdate.homeAddress?.state.value}
                                            rules={dataToUpdate.homeAddress?.state.rules}
                                            errors={dataToUpdate.homeAddress?.state.errors}
                                            // formSubmitted={dataToUpdateFieldTouched}
                                        />
                                    </div>
                                </div>
                                <div className="information">
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter zip'}
                                            name="pinCode"
                                            label="Zip"
                                            onChangeCb={(event) =>
                                                onChangeHandler(event, dataToUpdate.homeAddress?.pinCode.rules)
                                            }
                                            value={dataToUpdate.homeAddress?.pinCode.value}
                                            rules={dataToUpdate.homeAddress?.pinCode.rules}
                                            errors={dataToUpdate.homeAddress?.pinCode.errors}
                                            // formSubmitted={dataToUpdateFieldTouched}
                                        />
                                    </div>
                                    <div className="block">
                                        <TextInput
                                            type="text"
                                            placeHolder={'Please enter country'}
                                            name="country"
                                            onChangeCb={(event) =>
                                                onChangeHandler(event, dataToUpdate.homeAddress?.country.rules)
                                            }
                                            label="Country"
                                            value={dataToUpdate.homeAddress?.country.value}
                                            rules={dataToUpdate.homeAddress?.country.rules}
                                            errors={dataToUpdate.homeAddress?.country.errors}
                                            // formSubmitted={dataToUpdateFieldTouched}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="nextbuttons">
                                <Button
                                    type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                                    className="button-width primary-light-with-border-btn me-4"
                                    onClickCb={() => {
                                        setOpenUpdateModal(false);
                                    }}
                                >
                                    Back
                                </Button>
                                <Button
                                    type={BUTTON_TYPE.PRIMARY}
                                    className="button-width primary-btn"
                                    onClickCb={() => {
                                        const patientId = allPatients[clickedRowIndex]?.id;
                                        dispatch(
                                            patchUpadatePatientById({
                                                patientId,
                                                agencyId,
                                                dataToUpdate,
                                                PaginationState,
                                                token
                                            })
                                        );
                                        setOpenUpdateModal(false);

                                        // if (patientId) {
                                        //     handleDeletePatient(patientId);
                                        // }
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </BasicModal>
                    )}
                </Container>
            </Loadable>
        </div>
    );
};

export default PatientManagement;
