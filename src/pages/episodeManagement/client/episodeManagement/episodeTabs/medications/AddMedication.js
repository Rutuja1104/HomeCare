import React, { useEffect } from 'react';

import { BUTTON_TYPE } from '../../../../../../libs/constant';
import { VEC_ICON_NAME } from '../../../../../../components/icon/constants';
import { componentKey, setAddNewMedicationDetails, setIsMedicationCreated, setMedicationDetails, setRemoveNewMedicationDetails } from '../../ClientEpisodeManagementSlice';
import { MEDICATION_DETAILS } from '../../constants';
import { generalValidator } from '../../../../../../libs/utility/validators/GeneralValidator';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderLabel } from '../../../../../../layouts/LayoutSlice';
import { getMedicationDetailsById, postMedications, updateMedicationDetails } from '../../ClientEpisodeManagementSaga';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CLIENT_EPISODE_MANAGEMENT, EPISODE_MANAGEMENT } from '../../../../../../routes/constants';
import { componentKey as episodeManagementComponentKey } from "../../../ClientEpisodeSlice"

import SelectDropdown from '../../../../../../components/select/Select';
import DatePicker from '../../../../../../components/datePicker/DatePicker';
import TextInput from '../../../../../../components/input/textinput/TextInput';
import Button from '../../../../../../components/button/Button';
import Container from '../../../../../../components/container/Container';
import Loadable from '../../../../../../components/loadable/Loadable';
import ResponsiveBox from '../../../../../../components/responsivebox/ResponsiveBox';
import Heading from '../../../../../../components/heading/Heading';
import { HEADING } from '../../../../../../components/heading/constants/constants';
import General from '../../../../../../libs/utility/General';

const AddMedication = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const { episodeId } = useParams()

    const medicationId = searchParams.get('mi');

    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const { medicationDetails, serviceDetailsFieldTouched, isMedicationCreated } = useSelector((state) => state[componentKey]);
    const { loadingState } = useSelector(state => state[episodeManagementComponentKey])

    useEffect(() => {
        if (medicationId) {
            dispatch(getMedicationDetailsById({ agencyId, medicationId, token }))
        }
    }, [medicationId])

    useEffect(() => {
        dispatch(setHeaderLabel('Medications'));
    }, []);

    useEffect(() => {
        if (isMedicationCreated) {
            dispatch(setIsMedicationCreated(false))
            navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}?at=4`)
        }
    }, [isMedicationCreated])

    const onChangeHandler = (event, rules, index) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setMedicationDetails({ object: { [name]: { value, errors, rules } }, index }));
        } else {
            dispatch(setMedicationDetails({ object: { [name]: { value } }, index }));
        }
    };

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <Heading type={HEADING.H3} customStyle={{ margin: "10px 0" }}>{medicationId ? "Update Medication" : "Add Medication"}</Heading>
            {medicationDetails.map((item, index) => (
                <Container header={`Drug ${index + 1}`} key={index} containerMainClassName='mt-3'>
                    <ResponsiveBox>
                        <TextInput
                            type="text"
                            placeHolder={'Type drug name here'}
                            name="drug"
                            onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                            label="Drug Name"
                            value={item?.drug.value}
                            rules={item?.drug.rules}
                            errors={item?.drug.errors}
                            formSubmitted={serviceDetailsFieldTouched}
                        />
                        <SelectDropdown
                            name="status"
                            label="Status"
                            onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                            placeHolder="Please select Status"
                            value={item?.status?.value}
                            defaultValue={item?.status?.value.length ? { label: item?.status?.value } : ''}
                            rules={item?.status?.rules}
                            errors={item?.status?.errors}
                            formSubmitted={serviceDetailsFieldTouched}
                            options={[
                                { value: 'New', label: 'New' },
                                { value: 'Changed', label: 'Changed' },
                                { value: 'Long_Standing', label: 'Long_Standing' }
                            ]}
                        />
                        <TextInput
                            type="text"
                            placeHolder={'Type drug name here'}
                            name="dosageUnit"
                            onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                            label="Dosage Unit"
                            value={item?.dosageUnit.value}
                            rules={item?.dosageUnit.rules}
                            errors={item?.dosageUnit.errors}
                            formSubmitted={serviceDetailsFieldTouched}
                        />
                        <DatePicker
                            label="Start Date"
                            name="startDate"
                            onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                            value={item.startDate.value}
                            rules={item.startDate.rules}
                            errors={item.startDate.errors}
                            formSubmitted={serviceDetailsFieldTouched}
                        />
                        <DatePicker
                            label="Discontinued"
                            name="discontinued"
                            onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                            value={item.discontinued.value}
                            rules={item.discontinued.rules}
                            errors={item.discontinued.errors}
                            formSubmitted={serviceDetailsFieldTouched}
                        />
                        <SelectDropdown
                            name="class"
                            label="Class"
                            onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                            placeHolder="Please select class"
                            value={item?.class?.value}
                            defaultValue={item?.class?.value.length !== 0 ? { label: item?.class?.value } : null}
                            rules={item?.class?.rules}
                            errors={item?.class?.errors}
                            formSubmitted={serviceDetailsFieldTouched}
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' }
                            ]}
                        />
                        <SelectDropdown
                            name="indication"
                            label="Indication"
                            onChangeCb={(event, rules) => onChangeHandler(event, rules, index)}
                            placeHolder="Please select indication"
                            value={item?.indication?.value}
                            defaultValue={item?.indication?.value.length !== 0 ? { label: item?.indication?.value } : null}
                            rules={item?.indication?.rules}
                            errors={item?.indication?.errors}
                            formSubmitted={serviceDetailsFieldTouched}
                            options={[
                                { value: 'Yes', label: 'Yes' },
                                { value: 'No', label: 'No' }
                            ]}
                        />
                    </ResponsiveBox>

                    {index > 0 && (
                        <Button
                            onClickCb={() => dispatch(setRemoveNewMedicationDetails(index))}
                            variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                            className={`mt-2`}
                        >
                            Remove
                        </Button>
                    )}
                </Container>
            ))}

            {!medicationId &&
                <div className="add-new-medication-block">
                    <Button
                        className="mt-2 "
                        variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                        onClickCb={() => dispatch(setAddNewMedicationDetails(MEDICATION_DETAILS))}
                        prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
                    >
                        Add More
                    </Button>
                </div>
            }

            <Button
                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                onClickCb={() => {
                    navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}?at=4`)
                }}
            >
                Back
            </Button>
            <Button
                type={BUTTON_TYPE.PRIMARY}
                className="mt-4 ms-3"
                onClickCb={() => {
                    if (medicationId) {
                        dispatch(updateMedicationDetails({ agencyId, medicationId, medicationDetails, token }))
                    } else {
                        dispatch(postMedications({ agencyId, episodeId, medicationDetails }))
                    }
                }}>
                Save
            </Button>
        </Loadable>
    );
};
export default AddMedication;
