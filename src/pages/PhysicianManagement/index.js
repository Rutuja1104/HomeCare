import React, { useEffect, useState } from 'react';
import Loadable from '../../components/loadable/Loadable';
import { useDispatch, useSelector } from 'react-redux';
import {
    componentKey,
    setCreatePhysicianOnChange,
    setDataToUpdate,
    setIsCreatePhysicianFieldTouch,
    setIsMultiRecord,
    setIsSingleRecord,
    setPaginationState,
    setSearch,
    setSelectedData,
    setUpdatePhysician,
    setUpdatePhysicianFieldTouched
} from './PhysicianManagementSlice';
import RichGrid from '../../components/richgrid/RichGrid';
import {
    deletePhysicianById,
    getAllPhysicians,
    getPhysicianByNameOrNumber,
    patchUpadatePhysicianById,
    postPhysician
} from './PhysicianManagementSaga';
import BadgeV2 from '../../components/badge/BadgeV2';
import DotToggleButton from '../../components/dotToggleButton/DotToggleButton';
import General from '../../libs/utility/General';
import TextInput from '../../components/input/textinput/TextInput';
import Container from '../../components/container/Container';
import FilterDrawer from '../../components/filterDrawer/Drawer';
import Button from '../../components/button/Button';
import { ROW_SELECTION_OPTIONS } from '../../components/pagination/constants';
import BasicModal from '../../components/modal/Modal';
import { BUTTON_TYPE } from '../../libs/constant';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/heading/Heading';
import GeneralValidator, { generalValidator } from '../../libs/utility/validators/GeneralValidator';
import { toast } from 'react-toastify';
import { setHeaderLabel } from '../../layouts/LayoutSlice';
import useFlexCleanup from '../../store/FlexCleanup';
import GoogleAutoComplete from '../../components/googleAutoComplete/GoogleAutoComplete';

const OPTIONS = ['View', 'Update', 'Delete'];
const PhysicianManagement = () => {
    const {
        allPhysicians,
        loadingState,
        PaginationState,
        search,
        createPhysician,
        isMultiRecord,
        isSingleRecord,
        physician,
        isCreatePhysicianFieldTouch,
        updatePhysician,
        updatePhysicianFieldTouched,
        dataToUpdateselectedData,
        dataToUpdate
    } = useSelector((state) => state[componentKey]);
    const token = General.getLocalStorageData("token")
    const agencyId = General.getLocalStorageData('agencyId');
    const dispatch = useDispatch();
    const [optionsData, setOptionsData] = useState(OPTIONS);
    const [viewPatientVisible, setViewPatientVisible] = useState(false);
    const [clickedRowIndex, setClickedRowIndex] = useState(-1);
    const [toggleIndex, setToggleIndex] = useState(-1);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openPhysicianModal, setOpenPhysicianModal] = useState(false);
    const [physicianFirstName, setFirstName] = useState('');
    const [physicianLastName, setLastName] = useState('');
    const [selectedRow, setSelectedRow] = useState([]);
    const [npi, setNPI] = useState('');
    const closeFilterDrawer = () => {
        setIsFilterDrawerOpen(false);
    };
    const dropdownSelect = () => {};
    useFlexCleanup(componentKey);

    const ASSIGN_MEMBER_COLUMNS = [
        {
            field: 'firstName',
            header: 'First Name',
            renderLogic: (row, idx) => <span>{row?.firstName || '-'}</span>
        },
        {
            field: 'lastName',
            header: 'Last Name',
            renderLogic: (row, idx) => <span>{row?.lastName || '-'}</span>
        },
        {
            field: 'contactNumber',
            header: 'Contact No',
            renderLogic: (row, idx) => <span>{row?.contactNumber || '-'}</span>
        },
        {
            field: 'fax',
            header: 'Fax',
            renderLogic: (row, idx) => <span>{row?.fax || '-'}</span>
        },
        {
            field: 'primaryEmail',
            header: 'Primary Email',
            renderLogic: (row, idx) => <span>{row?.primaryEmail || '-'}</span>
        },
        {
            field: 'NPI',
            header: 'NPI',
            renderLogic: (row, idx) => <span>{row?.NPI || '-'}</span>
        },
        {
            field: 'status',
            header: 'Status',
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.status || '-')}>{row?.status}</BadgeV2>
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
    const ASSIGN_MEMBER_COLUMNS_PHYSICIAN = [
        {
            field: 'Name',
            header: 'Name',
            renderLogic: (row, idx) => <span>{row.basic.name}</span>
        },

        {
            field: 'npi',
            header: 'NPI',
            renderLogic: (row, idx) => <span>{row.number || '-'}</span>
        },
        {
            field: 'address',
            header: 'Primary Address',
            renderLogic: (row, idx) => (
                <span>
                    {row?.primaryAddress.addressLine1 +
                        '' +
                        row?.primaryAddress.addressLine2 +
                        ' , ' +
                        row?.primaryAddress.city +
                        ', ' +
                        row?.primaryAddress.state +
                        ', ' +
                        row?.primaryAddress.postalCode +
                        ', ' +
                        row?.primaryAddress.countryCode || '-'}
                </span>
            )
        },
        {
            field: 'addPhysician',
            header: 'Add Physician',
            renderLogic: (row, idx) => {
                return (
                    <div>
                        <input
                            className="form-check-input"
                            type="radio"
                            onChange={(item) => onSelectOfPhysician(item, idx)}
                        ></input>
                    </div>
                );
            }
        }
    ];
    useEffect(() => {
        dispatch(setHeaderLabel('Physician Management'));
    }, []);
    const onSearchChangeHandler = ({ target: { value } }) => {
        dispatch(setSearch(value));
    };
    useEffect(() => {
        dispatch(setSearch(search));
        let delayedApiCall;
        if (search !== undefined && search !== '') {
            delayedApiCall = setTimeout(() => {
                dispatch(setPaginationState({ PageNumber: 1 }));

                dispatch(getAllPhysicians({ agencyId, limit: PaginationState.PageSize, pageNumber: 1, search }));
            }, 300);
        } else {
            dispatch(getAllPhysicians({ agencyId, limit: 10, pageNumber: 1, search }));
        }

        return () => clearTimeout(delayedApiCall);
    }, [search]);

    const handleDeletePatient = (physicianId) => {
        dispatch(deletePhysicianById({ agencyId, physicianId, allPhysicians, PaginationState,token }));

        setOpenDeleteModal(false);
    };

    const navigate = useNavigate();
    const onSelect = (item, index, row) => {
        if (item === 'View') {
            const physicianId = allPhysicians[index]?.id;
            navigate(`/physicianmanagement/view-physician/${physicianId}`);
            setViewPatientVisible(true);
            setClickedRowIndex(index);
        } else if (item === 'Update') {
            
            setOpenUpdateModal(true);
            dispatch(setDataToUpdate(row));
            setClickedRowIndex(index);
        } else if (item === 'Delete') {
            setOpenDeleteModal(true);
            setClickedRowIndex(index);
        }
    };
    const onChangeHandler = (event, rules) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(
                setCreatePhysicianOnChange({
                    object: { [name]: { value, errors, rules } }
                })
            );
        } else {
            dispatch(setCreatePhysicianOnChange({ object: { [name]: { value } } }));
        }
    };
    function containsSpecialChars(str) {
        var specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }
    const onUpdateChangeHandler = (event, rules) => {
        const { name, value, type } = event.target;
        if (name === 'contactNumber') {
            const numericValue = value.replace(/\D/g, '');

            let formattedValue = '';
            if (numericValue.length > 0) {
                formattedValue += `(${numericValue.slice(0, 3)}`;
            }
            if (numericValue.length > 3) {
                formattedValue += `)-${numericValue.slice(3, 6)}`;
            }
            if (numericValue.length > 6) {
                formattedValue += `-${numericValue.slice(6, 10)}`;
            }

            if (rules) {
                const errors = generalValidator.validate(numericValue, rules);
                dispatch(setUpdatePhysician({ [name]: { value: formattedValue, errors, rules } }));
            } else {
                dispatch(setUpdatePhysician({ [name]: { value: formattedValue } } ));
            }
        } else{
            let regex = /\d/;
            let noWhiteSpaceRegex = /^\s|\s/;
            let alphanumericRegex = /^[a-zA-Z0-9-]+$/;
            if (
                (regex.test(value) && type == 'text') ||
                (type == 'text' && containsSpecialChars(value)) ||
                (noWhiteSpaceRegex.test(value) && type == 'text')
            ) {
                return;
            }
            if (rules) {
                const errors = generalValidator.validate(value, rules);
                dispatch(setUpdatePhysician({ [name]: { value, errors, rules } }));
            } else {
                dispatch(setUpdatePhysician({ [name]: { value } }));
            }
        }
    };
    const onSelectOfPhysician = (item, idx) => {
        dispatch(setIsMultiRecord({ state: false }));
        dispatch(setIsSingleRecord({ state: true }));

        dispatch(getPhysicianByNameOrNumber({ npi: physician[idx].number }));

        setClickedRowIndex(idx);
    };

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <Container>
                <div className="patientMgt-container">
                    <div className="filter-section">
                        <div className="block">
                            <TextInput
                                type="text"
                                placeHolder={'Please search phyisician by firstname/lastname or NPI'}
                                name="firstname"
                                onChangeCb={(event) => onSearchChangeHandler(event)}
                                label="Search Physician"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button onClickCb={() => setOpenPhysicianModal(true)}>Add Physician</Button>
                    </div>
                    {isFilterDrawerOpen && <FilterDrawer isOpen={isFilterDrawerOpen} onClose={closeFilterDrawer} />}
                </div>
                <div className="patient-table mt-4">
                    <RichGrid
                        data={allPhysicians}
                        columns={ASSIGN_MEMBER_COLUMNS}
                        selectable={false}
                        extractRowKey={(row) => row.name}
                        paginationProps={{
                            page: PaginationState.PageNumber,
                            take: PaginationState.PageSize,
                            takeOptions: ROW_SELECTION_OPTIONS,
                            total: PaginationState.totalPhysicians,
                            onChangeTakeCb: (newTake) => {
                                dispatch(
                                    setPaginationState({
                                        ...PaginationState,
                                        PageNumber: 1,
                                        PageSize: newTake
                                    })
                                );
                                dispatch(
                                    getAllPhysicians({
                                        // allPatients,
                                        agencyId,
                                        pageNumber: PaginationState.pageNumber,
                                        limit: newTake,
                                       
                                        search
                                        // startDate
                                    })
                                );
                            },
                            onChange: (page) => {
                                dispatch(
                                    getAllPhysicians({
                                        // allPatients,
                                        agencyId,
                                        pageNumber: page,
                                        limit: PaginationState.PageSize,
                                        // status,
                                        search

                                        // startDate
                                    })
                                );

                                dispatch(setPaginationState({ PageNumber: page }));
                            }
                        }}
                    />
                </div>

                {openDeleteModal && (
                    <BasicModal
                        open={openDeleteModal}
                        title={`Are you sure you want to delete ${
                            allPhysicians[clickedRowIndex]?.firstName + ' ' + allPhysicians[clickedRowIndex]?.lastName
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
                                    const physicianId = allPhysicians[clickedRowIndex]?.id;
                                    if (physicianId) {
                                        handleDeletePatient(physicianId);
                                    }
                                }}
                            >
                                Yes
                            </Button>
                        </div>
                    </BasicModal>
                )}
                <BasicModal
                    title={'Add Physician'}
                    open={openPhysicianModal}
                    closeButtonHandler={() => {
                        setOpenPhysicianModal(false);
                        setOpenPhysicianModal(false);
                        dispatch(setIsSingleRecord(false));
                        dispatch(setIsMultiRecord(false));
                        setFirstName('');
                        setLastName('');
                        setNPI('');
                    }}
                    handleClose={() => {
                        setOpenPhysicianModal(false);
                        setOpenPhysicianModal(false);
                        dispatch(setIsSingleRecord(false));
                        dispatch(setIsMultiRecord(false));
                        setFirstName('');
                        setLastName('');
                        setNPI('');
                    }}
                    className="add-physician-modal"
                    customStyle={{ width: '80%' }}
                >
                    <div className="">
                        <div className="fileds">
                            <div className="block">
                                <TextInput
                                    type="number"
                                    placeHolder={'Please enter physician npi'}
                                    name="npi"
                                    onChangeCb={(event) => setNPI(event.target.value)}
                                    label="NPI ID"
                                    value={npi}
                                />
                            </div>
                            <div className="or-block">OR</div>
                            <div className="block me-4">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter physician firstname'}
                                    name="firstName"
                                    onChangeCb={(event) => setFirstName(event.target.value)}
                                    label="Physician's Firstname"
                                    value={physicianFirstName}
                                />
                            </div>
                            <div className="block">
                                <TextInput
                                    type="text"
                                    placeHolder={'Please enter physician lastname'}
                                    name="lastName"
                                    onChangeCb={(event) => setLastName(event.target.value)}
                                    label="Physician's Lastname"
                                    value={physicianLastName}
                                />
                            </div>
                            <div className="button">
                                <Button
                                    type={BUTTON_TYPE.PRIMARY}
                                    onClickCb={() => {
                                        dispatch(
                                            getPhysicianByNameOrNumber({ npi, physicianFirstName, physicianLastName })
                                        );
                                    }}
                                >
                                    Verify
                                </Button>
                            </div>
                        </div>

                        <>
                            <div>
                                {isMultiRecord && !isSingleRecord && (
                                    <div>
                                        <RichGrid
                                            data={physician}
                                            columns={ASSIGN_MEMBER_COLUMNS_PHYSICIAN}
                                            // selectable={true}
                                            // isAllSelectable={false}
                                            extractRowKey={(row) => row.number}
                                            onSelectionChangeCallBack={(selectedData) => setSelectedRow(selectedData)}
                                            onHeaderSelectionChangeCallBack={(selectedData) =>
                                                setSelectedRow(selectedData)
                                            }
                                            selectedRows={selectedRow}
                                        />
                                    </div>
                                )}
                            </div>
                            {isSingleRecord && (
                                <div className="extraFields">
                                    <div>
                                        <Heading>Primary Addresss</Heading>
                                        <div className="block">
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter Address Line 1'}
                                                    name="addressLine1"
                                                    onChangeCb={onChangeHandler}
                                                    label="Address Line 1"
                                                    value={createPhysician?.primaryAddress?.addressLine1?.value}
                                                    rules={createPhysician?.primaryAddress?.addressLine1?.rules}
                                                    // errors={createPhysician?.primaryAddress?.addressLine1.errors}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter Address Line 2'}
                                                    name="addressLine2"
                                                    onChangeCb={onChangeHandler}
                                                    label="Address Line 2"
                                                    value={createPhysician?.primaryAddress?.addressLine2?.value}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter city'}
                                                    name="city"
                                                    onChangeCb={onChangeHandler}
                                                    label="City"
                                                    value={createPhysician?.primaryAddress?.city?.value}
                                                    rules={createPhysician?.primaryAddress?.city?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                        </div>
                                        <div className="block">
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter state'}
                                                    name="state"
                                                    onChangeCb={onChangeHandler}
                                                    label="State"
                                                    value={createPhysician?.primaryAddress?.state?.value}
                                                    rules={createPhysician?.primaryAddress?.state?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter pincode'}
                                                    name="pinCode"
                                                    onChangeCb={onChangeHandler}
                                                    label="Zip"
                                                    value={createPhysician?.primaryAddress?.pinCode?.value}
                                                    rules={createPhysician?.primaryAddress?.pinCode?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter country'}
                                                    name="country"
                                                    onChangeCb={onChangeHandler}
                                                    label="Country"
                                                    value={createPhysician?.primaryAddress?.country?.value}
                                                    rules={createPhysician?.primaryAddress?.country?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Heading>Mailing Addresss</Heading>
                                        <div className="block">
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter Address Line 1'}
                                                    name="addressLine1"
                                                    onChangeCb={onChangeHandler}
                                                    label="Address Line 1"
                                                    value={createPhysician?.mailingAddress?.addressLine1?.value}
                                                    rules={createPhysician?.mailingAddress?.addressLine1?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter Address Line 2'}
                                                    name="addressLine2"
                                                    onChangeCb={onChangeHandler}
                                                    label="Address Line 2"
                                                    value={createPhysician?.mailingAddress?.addressLine2?.value}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter city'}
                                                    name="city"
                                                    onChangeCb={onChangeHandler}
                                                    label="City"
                                                    value={createPhysician?.mailingAddress?.city?.value}
                                                    rules={createPhysician?.mailingAddress?.city?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                        </div>
                                        <div className="block">
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter state'}
                                                    name="state"
                                                    onChangeCb={onChangeHandler}
                                                    label="State"
                                                    value={createPhysician?.mailingAddress?.state?.value}
                                                    rules={createPhysician?.mailingAddress?.state?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter pincode'}
                                                    name="pinCode"
                                                    onChangeCb={onChangeHandler}
                                                    label="Zip"
                                                    value={createPhysician?.mailingAddress?.pinCode?.value}
                                                    rules={createPhysician?.mailingAddress?.pinCode?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                            <div>
                                                <TextInput
                                                    type="text"
                                                    placeHolder={'Please enter country'}
                                                    name="country"
                                                    onChangeCb={onChangeHandler}
                                                    label="Country"
                                                    value={createPhysician?.mailingAddress?.country?.value}
                                                    rules={createPhysician?.mailingAddress?.country?.rules}
                                                    formSubmitted={isCreatePhysicianFieldTouch}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please Provide Primary Email Address'}
                                                name="primaryEmail"
                                                onChangeCb={onChangeHandler}
                                                label="Primary Email"
                                                value={createPhysician?.primaryEmail?.value}
                                                rules={createPhysician?.primaryEmail?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please Provide Secondary Email Address'}
                                                name="secondaryEmail"
                                                onChangeCb={onChangeHandler}
                                                label="Secondary Email"
                                                value={createPhysician?.secondaryEmail?.value}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please Provide Contact Number'}
                                                name="contactNumber"
                                                onChangeCb={onChangeHandler}
                                                label="Contact"
                                                value={createPhysician?.contactNumber?.value}
                                                rules={createPhysician?.contactNumber?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>{' '}
                                    </div>
                                    <div className="block">
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={'Please Provide Fax Number'}
                                                name="fax"
                                                onChangeCb={onChangeHandler}
                                                label="Fax"
                                                value={createPhysician?.fax?.value}
                                                rules={createPhysician?.fax?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                        <div className="">
                                            <TextInput
                                                type="text"
                                                placeHolder={''}
                                                name="status"
                                                onChangeCb={onChangeHandler}
                                                label="Status"
                                                value={createPhysician?.status?.value}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="text"
                                                placeHolder={''}
                                                name="npi"
                                                onChangeCb={onChangeHandler}
                                                label="NPI"
                                                value={createPhysician?.NPI?.value}
                                                rules={createPhysician?.NPI?.rules}
                                                formSubmitted={isCreatePhysicianFieldTouch}
                                            />
                                        </div>
                                    </div>
                                    <div className="submit-button">
                                        {/* <Button
                                            className="mt-4"
                                            onClickCb={() => {
                                                setOpenPhysicianModal(true);
                                                dispatch(setIsSingleRecord(false));
                                                dispatch(setIsMultiRecord(true));
                                            }}
                                        >
                                            Back
                                        </Button> */}
                                        <Button
                                            className="mt-4"
                                            onClickCb={() => {
                                                dispatch(setIsCreatePhysicianFieldTouch(true));
                                                if (createPhysician.primaryEmail.value.length === 0) {
                                                    toast.error(`Please Provide Primary Email`);
                                                    return;
                                                }
                                                if (createPhysician.fax.value.length === 0) {
                                                    toast.error(`Please Provide Fax`);
                                                    return;
                                                }
                                                if (
                                                    !GeneralValidator.validateRequiredFields(
                                                        createPhysician.mailingAddress
                                                    ) &&
                                                    !GeneralValidator.validateRequiredFields(
                                                        createPhysician.primaryAddress
                                                    )
                                                ) {
                                                    dispatch(postPhysician({ agencyId, createPhysician, token }));
                                                    setOpenPhysicianModal(false);
                                                    dispatch(setIsSingleRecord(false));
                                                    dispatch(setIsMultiRecord(false));
                                                    setFirstName('');
                                                    setLastName('');
                                                    setNPI('');
                                                }
                                            }}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            className="mt-4 me-5"
                                            onClickCb={() => {
                                                setOpenPhysicianModal(false);
                                                dispatch(setIsSingleRecord(false));
                                                dispatch(setIsMultiRecord(false));
                                                setFirstName('');
                                                setLastName('');
                                                setNPI('');
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                        {/* })} */}
                    </div>
                </BasicModal>
                {openUpdateModal && (
                    <BasicModal
                        open={openUpdateModal}
                        title={"Update Physician's Details"}
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
                                        onChangeCb={(event, rules) => onUpdateChangeHandler(event, rules)}
                                        label="Firstname"
                                        value={dataToUpdate?.firstName.value}
                                        rules={dataToUpdate.firstName.rules}
                                        errors={dataToUpdate.firstName.errors}
                                        formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                                <div className="block">
                                    <TextInput
                                        type="text"
                                        placeHolder={'Please enter lastname'}
                                        name="lastName"
                                        onChangeCb={(event, rules) => onUpdateChangeHandler(event, rules)}
                                        label="Lastname"
                                        value={dataToUpdate?.lastName.value}
                                        rules={dataToUpdate.lastName.rules}
                                        errors={dataToUpdate.lastName.errors}
                                        formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                            </div>
                            <div className="information">
                                <div className="block">
                                    <TextInput
                                        type="text"
                                        placeHolder={'Please enter email'}
                                        name="primaryEmail"
                                        onChangeCb={(event, rules) => onUpdateChangeHandler(event, rules)}
                                        label="primary Email"
                                        value={dataToUpdate.primaryEmail.value}
                                        rules={dataToUpdate.primaryEmail.rules}
                                        errors={dataToUpdate.primaryEmail.errors}
                                        formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                                <div className="block">
                                    <TextInput
                                        type="text"
                                        placeHolder={'Please enter phone number'}
                                        name="contactNumber"
                                        onChangeCb={(event, rules) =>
                                            onUpdateChangeHandler(event, dataToUpdate.contactNumber.rules)
                                        }
                                        label="Contact"
                                        value={dataToUpdate?.contactNumber.value}
                                        rules={dataToUpdate.contactNumber.rules}
                                        errors={dataToUpdate.contactNumber.errors}
                                        formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                            </div>
                            <div className="information">
                                <div className="block">
                                    <TextInput
                                        type="number"
                                        placeHolder={'Please enter fax'}
                                        name="fax"
                                        onChangeCb={(event, rules) => onUpdateChangeHandler(event, rules)}
                                        label="FAX"
                                        value={dataToUpdate?.fax?.value.replace(/[-]/g, '')}
                                        rules={dataToUpdate.fax.rules}
                                        errors={dataToUpdate.fax.errors}
                                        formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                                <div className="block">
                                    <TextInput
                                        type="number"
                                        placeHolder={'Please enter ssn'}
                                        name="NPI"
                                        // onChangeCb={(event, rules) => onUpdateChangeHandler(event, rules)}
                                        label="NPI"
                                        dataToUpdate
                                        value={dataToUpdate?.NPI?.value}
                                        rules={dataToUpdate.NPI.rules}
                                        errors={dataToUpdate.NPI.errors}
                                        formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                            </div>
                            {/* <div className="information">
                                <div className="block">
                                    <GoogleAutoComplete
                                        name="addressLine1"
                                        label="Address Line 1"
                                        placeHolder="Please enter address line 1"
                                        onChangeCb={(event) =>
                                            onChangeHandler(event, dataToUpdate.practiceAddress?.addressLine1.rules)
                                        }
                                        value={dataToUpdate?.practiceAddress?.addressLine1}
                                        rules={dataToUpdate.practiceAddress?.addressLine1.rules}
                                        errors={dataToUpdate.practiceAddress?.addressLine1.errors}
                                        // formSubmitted={updatePhysicianFieldTouched}
                                        // onPlaceSelectedCb={handlePlaceSelect}
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
                                        value={dataToUpdate?.practiceAddress?.addressLine2.value}
                                        rules={dataToUpdate.homeAddress?.addressLine2.rules}
                                        errors={dataToUpdate.homeAddress?.addressLine2.errors}
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
                                            onChangeHandler(event, dataToUpdate.homeAddress?.city.rules)
                                        }
                                        value={dataToUpdate?.practiceAddress?.city?.value}
                                        rules={dataToUpdate.homeAddress?.city.rules}
                                        errors={dataToUpdate.homeAddress?.city.errors}
                                        // formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                                <div className="block">
                                    <TextInput
                                        type="text"
                                        placeHolder={'Please enter state'}
                                        name="state"
                                        label="State"
                                        // onChangeCb={(event) =>
                                        //     onChangeHandler(event, updatePhysician.homeAddress?.state.rules)
                                        // }
                                        value={dataToUpdate.practiceAddress?.state.value}
                                        rules={dataToUpdate.homeAddress?.state.rules}
                                        errors={dataToUpdate.homeAddress?.state.errors}
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
                                            onChangeHandler(event, dataToUpdate.homeAddress?.pinCode.rules)
                                        }
                                        value={dataToUpdate.practiceAddress?.pinCode?.value}
                                        rules={dataToUpdate.homeAddress?.pinCode.rules}
                                        errors={dataToUpdate.homeAddress?.pinCode.errors}
                                        // formSubmitted={updatePhysicianFieldTouched}
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
                                        value={dataToUpdate.practiceAddress?.country?.value}
                                        rules={dataToUpdate.homeAddress?.country.rules}
                                        errors={dataToUpdate.homeAddress?.country.errors}
                                        // formSubmitted={updatePhysicianFieldTouched}
                                    />
                                </div>
                            </div> */}
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
                                    dispatch(setUpdatePhysicianFieldTouched(true));
                                    if (!GeneralValidator.validateRequiredFields(dataToUpdate)) {
                                        const physicianId = allPhysicians[clickedRowIndex]?.id;
                                        dispatch(
                                            patchUpadatePhysicianById({
                                                physicianId,
                                                agencyId,
                                                dataToUpdate,
                                                PaginationState,
                                                search,
                                                token
                                            })
                                        );
                                        setOpenUpdateModal(false);
                                    } else{
                                        toast.error('Please enter all the required fields')
                                    }

                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </BasicModal>
                )}
            </Container>
        </Loadable>
    );
};
export default PhysicianManagement;
