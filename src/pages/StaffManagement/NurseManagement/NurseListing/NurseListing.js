import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { LABEL_WEIGHT } from '../../../../components/label/labelV2/constants';
import {
    componentKey,
    setAutoCompleteAddressFields,
    setDataToUpdate,
    setPaginationState,
    setSelectedNurse,
    setSelectedNurseList,
    setShowDeleteNurseModal,
    setUpdateNurse
} from './NurseListingSlice';

import Label from '../../../../components/label/labelV2/Label';
import Loadable from '../../../../components/loadable/Loadable';
import RichGrid from '../../../../components/richgrid/RichGrid';
import BadgeV2 from '../../../../components/badge/BadgeV2';
import General from '../../../../libs/utility/General';
import { setHeaderLabel } from '../../../../layouts/LayoutSlice';
import UncontrolledDropdownV2 from '../../../../components/uncontrolledDropdown/UncontrolledDropdown';
import { getAllNurseList, putNurseById, putValidateUserByAgencyAdmin } from './NurseListingSaga';
import TextInput from '../../../../components/input/textinput/TextInput';
import ButtonDropdown from '../../../../components/buttonDropdown/ButtonDropdown';
import SelectDropdown from '../../../../components/select/Select';
import { NURSES_ROLES } from './constants';
import ConfirmationModal from '../../../../components/models/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { STAFF_MANAGEMENT_ROUTES } from '../../../../routes/constants';
import Button from '../../../../components/button/Button';
import { BUTTON_TYPE } from '../../../../libs/constant';
import GoogleAutoComplete from '../../../../components/googleAutoComplete/GoogleAutoComplete';
import BasicModal from '../../../../components/modal/Modal';
import GeneralValidator, { generalValidator } from '../../../../libs/utility/validators/GeneralValidator';
import { toast } from 'react-toastify';
import DatePicker from '../../../../components/datePicker/DatePicker';

const NurseListing = () => {
    const dispatch = useDispatch();

    const token = General.getLocalStorageData('token');
    const agencyId = General.getLocalStorageData('agencyId');
    const navigate = useNavigate();
    const [openUpdateNurseModal, setUpdateNurseOpenModal] = useState(false);
    const [clickedRowIndex, setClickedRowIndex] = useState(-1);

    const {
        allNurseList,
        loadingState,
        selectedNurseList,
        PaginationState,
        showDeleteNurseModal,
        selectedNurse,
        dataToUpdate
    } = useSelector((state) => state[componentKey]);

    const ACTION_BUTTONS = [
        {
            text: 'View Details',
            onClickCb: (row, idx) => {
                dispatch(setSelectedNurse(row));
                navigate(
                    `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.NURSE_DETAILS}?nid=${row.id}&type=Nurse`
                );
            }
        },
        {
            text: 'Update Details',
            onClickCb: (row, idx) => {
                setUpdateNurseOpenModal(true);
                dispatch(setSelectedNurse(row));
                dispatch(setDataToUpdate(row));
                setClickedRowIndex(idx);
            }
        },
        ...(PaginationState.Status == 'Active'
            ? [
                {
                    text: 'De-Activate',
                    onClickCb: (row, idx) => {
                        dispatch(setSelectedNurse(row));
                        dispatch(setShowDeleteNurseModal(true));
                    }
                }
            ]
            : [
                {
                    text: 'Activate',
                    onClickCb: (row, idx) => {
                        dispatch(setSelectedNurse(row));
                        dispatch(setShowDeleteNurseModal(true));
                    }
                }
            ])
    ];

    const DROPDOWN_BUTTON_ACTION = [
        {
            title: 'Active',
            onClickCb: () => {
                dispatch(setPaginationState({ Status: 'Active' }));
                dispatch(
                    getAllNurseList({
                        token,
                        agencyId,
                        status: 'Active',
                        page: PaginationState.PageNumber,
                        limit: PaginationState.PageSize,
                        firstName: PaginationState.FilterText,
                        lastName: '',
                        role: PaginationState.Role
                    })
                );
            }
        },
        {
            title: 'De-Activate',
            onClickCb: () => {
                dispatch(setPaginationState({ Status: 'De-Activate' }));
                dispatch(
                    getAllNurseList({
                        token,
                        agencyId,
                        status: 'De-Activate',
                        page: PaginationState.PageNumber,
                        limit: PaginationState.PageSize,
                        firstName: PaginationState.FilterText,
                        lastName: '',
                        role: PaginationState.Role
                    })
                );
            }
        }
    ];

    const NURSE_LISTING_COLUMNS = [
        {
            field: 'userName',
            header: <Label weight={LABEL_WEIGHT[700]}>Name</Label>,
            renderLogic: (row, idx) => (
                <span>
                    {row?.firstName} {row?.lastName}
                </span>
            )
        },
        {
            field: 'email',
            header: <Label weight={LABEL_WEIGHT[700]}>Email</Label>,
            renderLogic: (row, idx) => <span>{row?.email}</span>
        },
        {
            field: 'role',
            header: <Label weight={LABEL_WEIGHT[700]}>Phone Number</Label>,
            renderLogic: (row, idx) => <span>{row?.Telephone}</span>
        },
        {
            field: 'Field 3',
            header: <Label weight={LABEL_WEIGHT[700]}>Date Of Birth</Label>,
            renderLogic: (row, idx) => <>{row?.dob !== null ? moment(row?.dob).format('LL') : '-'}</>
        },
        {
            field: 'Field 3',
            header: <Label weight={LABEL_WEIGHT[700]}>SSN</Label>,
            renderLogic: (row, idx) => <>{row?.ssn}</>
        },
        {
            field: 'Field 3',
            header: <Label weight={LABEL_WEIGHT[700]}>Experience</Label>,
            renderLogic: (row, idx) => <>{row?.yearofExperience} Years</>
        },
        {
            field: 'Field 3',
            header: <Label weight={LABEL_WEIGHT[700]}>Employer Name</Label>,
            renderLogic: (row, idx) => <>{row?.previousEmployerName}</>
        },
        {
            field: 'Field 3',
            header: <Label weight={LABEL_WEIGHT[700]}>Role</Label>,
            renderLogic: (row, idx) => <BadgeV2 color={General.renderBadgeColor(row?.role || '')}>{row?.role}</BadgeV2>
        },
        {
            field: 'Field 3',
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.onboardingStatus || '')}>{row?.onboardingStatus}</BadgeV2>
            )
        },
        {
            field: 'Field 3',
            header: <Label weight={LABEL_WEIGHT[700]}>Action</Label>,
            renderLogic: (row, idx) => <UncontrolledDropdownV2 data={{ row, idx }} action={ACTION_BUTTONS} />
        }
    ];

    useEffect(() => {
        dispatch(setHeaderLabel('Nurse Management'));
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            dispatch(
                getAllNurseList({
                    token,
                    agencyId,
                    status: PaginationState.Status,
                    page: PaginationState.PageNumber,
                    limit: PaginationState.PageSize,
                    firstName: PaginationState.FilterText,
                    lastName: '',
                    role: PaginationState.Role
                })
            );
        }, 300);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [PaginationState.FilterText]);

    const handlePlaceSelect = (place) => {
        const mappingKey = {
            addressLine2: { type: 'locality', required: false },
            city: { type: 'administrative_area_level_2', required: true },
            state: { type: 'administrative_area_level_1', required: true },
            country: { type: 'country', required: true },
            pinCode: { type: 'postal_code', required: true }
        };

        const streetNumberComponent = place.address_components.find((component) =>
            component.types.includes('street_number')
        );
        const routeComponent = place.address_components.find((component) => component.types.includes('route'));

        let addressLine1Value = `${streetNumberComponent ? streetNumberComponent.long_name : ''} ${
            routeComponent ? routeComponent.long_name : ''
        }`;

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
            setUpdateNurse({
                object: { addressLine1: result.addressLine1 },
                filedName: 'updatePatient'
            })
        );

        dispatch(setAutoCompleteAddressFields(result));
    };
    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }
    const onUpdateChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;
    
        let regex = /\d/;
        let noWhiteSpaceRegex = /^\s|\s/;
        let alphanumericRegex = /^[a-zA-Z0-9-]+$/;
    
        
        if (name === 'firstName' || name === 'lastName') {
            if (value.includes('-')) {
                return;
            }
        }
    
        if (
            (regex.test(value) && type === 'text') ||
            (type === 'text' && containsSpecialChars(value)) ||
            (noWhiteSpaceRegex.test(value) && type === 'text')
        ) {
            return;
        }
    
        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setUpdateNurse({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setUpdateNurse({ [name]: { value } }));
        }
    };
    

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className="episode-listing-header">
                <div className="episode-filter">
                    <SelectDropdown
                        type="text"
                        placeHolder="Select Nurse Role"
                        name="role"
                        onChangeCb={(event) => {
                            dispatch(
                                setPaginationState({
                                    ...PaginationState,
                                    NursesRole: event.target.selectedOption,
                                    Role: event.target.selectedOption.value
                                })
                            );
                            dispatch(
                                getAllNurseList({
                                    token,
                                    agencyId,
                                    status: PaginationState.Status,
                                    page: PaginationState.PageNumber,
                                    limit: PaginationState.PageSize,
                                    firstName: PaginationState.FilterText,
                                    lastName: '',
                                    role: event.target.selectedOption.value
                                })
                            );
                        }}
                        defaultValue={PaginationState.NursesRole}
                        options={NURSES_ROLES}
                    />
                    <TextInput
                        type="text"
                        placeHolder={'Search nurse by name'}
                        name="MiddleName"
                        className="ms-2"
                        value={PaginationState.FilterText}
                        onChangeCb={(e) => {
                            dispatch(setPaginationState({ FilterText: e.target.value }));
                        }}
                    />
                </div>
                <ButtonDropdown buttonTitle="Change Status" actions={DROPDOWN_BUTTON_ACTION} />
            </div>

            <RichGrid
                data={allNurseList}
                columns={NURSE_LISTING_COLUMNS}
                selectable={false}
                extractRowKey={(row) => row.id}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedNurseList(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) => dispatch(setSelectedNurseList(selectedData))}
                selectedRows={selectedNurseList}
                paginationProps={{
                    page: PaginationState.PageNumber,
                    take: PaginationState.PageSize,
                    total: PaginationState.totalNurse,
                    onChangeTakeCb: (newTake) => {
                        dispatch(setPaginationState({ ...PaginationState, PageNumber: 1, PageSize: newTake }));
                        dispatch(
                            getAllNurseList({
                                token,
                                agencyId,
                                status: PaginationState.Status,
                                page: 1,
                                limit: newTake,
                                firstName: PaginationState.FilterText,
                                lastName: '',
                                role: PaginationState.Role
                            })
                        );
                    },
                    onChange: (page) => {
                        dispatch(
                            getAllNurseList({
                                token,
                                agencyId,
                                status: PaginationState.Status,
                                page: page,
                                limit: PaginationState.PageSize,
                                firstName: PaginationState.FilterText,
                                lastName: '',
                                role: PaginationState.Role
                            })
                        );
                        dispatch(setPaginationState({ PageNumber: page }));
                    }
                }}
            />

            <ConfirmationModal
                isOpen={showDeleteNurseModal}
                bodyContent={
                    PaginationState.Status == 'Active'
                        ? 'Are you sure you want to De-activate this user?'
                        : 'Are you sure you want to Activate this user?'
                }
                onSuccessCb={() => {
                    dispatch(
                        putValidateUserByAgencyAdmin({
                            nurseId: selectedNurse.id,
                            data: { onboardingStatus: PaginationState.Status == 'Active' ? 'De-Activate' : 'Active' },
                            token,
                            agencyId,
                            PaginationState
                        })
                    );
                }}
                toggle={() => dispatch(setShowDeleteNurseModal(!showDeleteNurseModal))}
                successButtonText={PaginationState.Status == 'Active' ? 'De-Activate' : 'Active'}
            />

            {openUpdateNurseModal && (
                <BasicModal
                    open={openUpdateNurseModal}
                    title={'Update Nurse Details'}
                    closeButtonHandler={() => setUpdateNurseOpenModal(false)}
                    handleClose={() => setUpdateNurseOpenModal(false)}
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
                                    label="Firstname"
                                    onChangeCb={(event, rules) =>
                                        onUpdateChangeHandler(event, dataToUpdate.firstName.rules)
                                    }
                                    value={dataToUpdate?.firstName.value}
                                    rules={dataToUpdate.firstName.rules}
                                    errors={dataToUpdate.firstName.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter lastname'}
                                    name="lastName"
                                    label="Lastname"
                                    onChangeCb={(event, rules) =>
                                        onUpdateChangeHandler(event, dataToUpdate?.lastName.rules)
                                    }
                                    value={dataToUpdate?.lastName.value}
                                    rules={dataToUpdate?.lastName.rules}
                                    errors={dataToUpdate?.lastName.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
                                />
                            </div>
                        </div>
                        <div className="information">
                            <div className="block">
                                <TextInput
                                    type="email"
                                    placeHolder={'Please enter email'}
                                    name="email"
                                    label="Email"
                                    onChangeCb={(event, rules) =>
                                        onUpdateChangeHandler(event, dataToUpdate.email.rules)
                                    }
                                    value={dataToUpdate.email.value}
                                    rules={dataToUpdate.email.rules}
                                    errors={dataToUpdate.email.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter phone number'}
                                    name="Telephone"
                                    label="Telephone"
                                    onChangeCb={(event, rules) =>
                                        onUpdateChangeHandler(event, dataToUpdate.Telephone.rules)
                                    }
                                    value={dataToUpdate?.Telephone.value}
                                    rules={dataToUpdate.Telephone.rules}
                                    errors={dataToUpdate.Telephone.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
                                />
                            </div>
                        </div>
                        <div className="information">
                            <div className="block">
                                <DatePicker
                                    label="Date Of Birth"
                                    name="dob"
                                    onChangeCb={(event, rules) => onUpdateChangeHandler(event, dataToUpdate.dob.rules)}
                                    value={dataToUpdate.dob.value}
                                    rules={dataToUpdate.dob.rules}
                                    errors={dataToUpdate.dob.errors}
                                    // formSubmitted={dataToUpdateFieldTouched}
                                    maxDate={new Date()}
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
                                        onUpdateChangeHandler(event, dataToUpdate?.addresses[0]?.addressLine1?.rules)
                                    }
                                    value={dataToUpdate?.addresses[0]?.addressLine1?.value}
                                    rules={dataToUpdate?.addresses[0]?.addressLine1?.rules}
                                    errors={dataToUpdate?.addresses[0]?.addressLine1?.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
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
                                        onUpdateChangeHandler(event, dataToUpdate.addresses[0]?.addressLine2.rules)
                                    }
                                    value={dataToUpdate?.addresses[0]?.addressLine2.value}
                                    rules={dataToUpdate.addresses[0]?.addressLine2.rules}
                                    errors={dataToUpdate.addresses[0]?.addressLine2.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}c
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
                                        onUpdateChangeHandler(event, dataToUpdate.addresses[0]?.city.rules)
                                    }
                                    value={dataToUpdate?.addresses[0]?.city?.value}
                                    rules={dataToUpdate.addresses[0]?.city.rules}
                                    errors={dataToUpdate.addresses[0]?.city.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter state'}
                                    name="state"
                                    label="State"
                                    onChangeCb={(event) =>
                                        onUpdateChangeHandler(event, dataToUpdate.addresses[0]?.state.rules)
                                    }
                                    value={dataToUpdate.addresses[0]?.state.value}
                                    rules={dataToUpdate.addresses[0]?.state.rules}
                                    errors={dataToUpdate.addresses[0]?.state.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
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
                                        onUpdateChangeHandler(event, dataToUpdate.addresses[0]?.pinCode.rules)
                                    }
                                    value={dataToUpdate.addresses[0]?.pinCode?.value}
                                    rules={dataToUpdate.addresses[0]?.pinCode.rules}
                                    errors={dataToUpdate.addresses[0]?.pinCode.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter country'}
                                    name="country"
                                    label="Country"
                                    onChangeCb={(event) =>
                                        onUpdateChangeHandler(event, dataToUpdate.addresses[0]?.country.rules)
                                    }
                                    value={dataToUpdate.addresses[0]?.country?.value}
                                    rules={dataToUpdate.addresses[0]?.country.rules}
                                    errors={dataToUpdate.addresses[0]?.country.errors}
                                    // formSubmitted={updatePhysicianFieldTouched}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="nextbuttons">
                        <Button
                            type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                            className="button-width primary-light-with-border-btn me-4"
                            onClickCb={() => {
                                setUpdateNurseOpenModal(false);
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            type={BUTTON_TYPE.PRIMARY}
                            className="button-width primary-btn"
                            onClickCb={() => {
                                // dispatch(setUpdatePhysicianFieldTouched(true));
                                if (!GeneralValidator.validateRequiredFields(dataToUpdate)) {
                                    const id = selectedNurse?.id;
                                    dispatch(
                                        putNurseById({
                                            agencyId,
                                            id,
                                            dataToUpdate,
                                            token,
                                            selectedNurse,
                                            PaginationState
                                        })
                                    );
                                    setUpdateNurseOpenModal(false);
                                } else {
                                    toast.error('Please enter all the required fields');
                                }
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </BasicModal>
            )}
        </Loadable>
    );
};
export default NurseListing;
