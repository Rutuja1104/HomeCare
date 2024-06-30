import React from 'react'
import Heading from '../../../../../components/heading/Heading'
import { HEADING } from '../../../../../components/heading/constants/constants'
import ResponsiveBox from '../../../../../components/responsivebox/ResponsiveBox'
import SelectDropdown from '../../../../../components/select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey as dataLoaderComponentKey } from '../../../../../components/loaders/dataloader/DataLoaderSlice'
import { componentKey, setClearSelectedUser, setRemoveAddedStaff, setSelectedNurseDetails, setSelectedProfessionalRole, setStaffSelectionData, setSelectedDiscipline } from '../CreateEpisodeSlice'
import { generalValidator } from '../../../../../libs/utility/validators/GeneralValidator'
import Button from '../../../../../components/button/Button'
import { BUTTON_TYPE } from '../../../../../libs/constant'
import { getAssigneeUsingRole, getEpisodePurposeUsingRole } from '../CreateEpisodeSaga'
import General from '../../../../../libs/utility/General'

const AssigneeStaffSelection = () => {

    const dispatch = useDispatch()

    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const { professionalRoles } = useSelector(state => state[dataLoaderComponentKey])
    const { StaffSelectionFieldsTouch, StaffSelection, userListByProfessionalRole, episodePurposeList } = useSelector(state => state[componentKey])

    const onChangeHandler = (event, rules, index) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setStaffSelectionData({ object: { [name]: { value, errors, rules } }, index }));
        } else {
            dispatch(setStaffSelectionData({ object: { [name]: { value } }, index }));
        }
    };

    return (
        <React.Fragment>
            <Heading type={HEADING.H3} customStyle={{ marginBottom: "20px" }}>Assigned Staff :</Heading>
            {StaffSelection?.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <ResponsiveBox size={500} >
                            <SelectDropdown
                                placeHolder='Please select disciplines'
                                name='discipline'
                                label='Select Disciplines'
                                options={professionalRoles}
                                value={item.discipline.value}
                                rules={item.discipline.rules}
                                errors={item.discipline.errors}
                                defaultValue={item.discipline.value.length !== 0 && { label: item.discipline.value }}
                                onChangeCb={(event, rules) => {
                                    onChangeHandler(event, rules, index)
                                    dispatch(setSelectedProfessionalRole(event.target.selectedOption))
                                    dispatch(getAssigneeUsingRole({ agencyId, role: event.target.selectedOption.code, token }))
                                    dispatch(setClearSelectedUser({ index, name: "selectedUser" }))
                                    dispatch(getEpisodePurposeUsingRole({discipline: event.target.selectedOption}))
                                    dispatch(setClearSelectedUser({ index, name: "episodePurpose" }))
                                }}
                                onBlurOnChangeAllowed={false}
                                formSubmitted={StaffSelectionFieldsTouch}
                            />
                            <SelectDropdown
                                placeHolder='Please select Purpose'
                                name='episodePurpose'
                                label='Select Purpose'
                                options={episodePurposeList}
                                value={item.episodePurpose.value}
                                rules={item.episodePurpose.rules}
                                errors={item.episodePurpose.errors}
                                defaultValue={item.episodePurpose.value.length !== 0 && { label: item.episodePurpose.value }}
                                onChangeCb={(event, rules) => {
                                    onChangeHandler(event, rules, index)
                                }}
                                formSubmitted={StaffSelectionFieldsTouch}
                            />
                            <SelectDropdown
                                placeHolder='Please select assignee'
                                name='selectedUser'
                                label='Select Assignee'
                                options={userListByProfessionalRole}
                                value={item.selectedUser.value}
                                rules={item.selectedUser.rules}
                                errors={item.selectedUser.errors}
                                defaultValue={item.selectedUser.value.length !== 0 && { label: item.selectedUser.value }}
                                onChangeCb={(event, rules) => {
                                    onChangeHandler(event, rules, index)
                                    dispatch(setSelectedNurseDetails(event.target.selectedOption))
                                    dispatch(setSelectedDiscipline(event.target.selectedOption))
                                }}
                                formSubmitted={StaffSelectionFieldsTouch}
                            />
                        </ResponsiveBox>
                        {index > 0 && <Button onClickCb={() => dispatch(setRemoveAddedStaff(index))} variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} className={`mt-2 ${(index < StaffSelection.length - 1) && 'mb-4'}`}>Remove</Button>}
                    </React.Fragment>

                )
            })}
            {/* <Button
                className='mt-2'
                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                onClickCb={() => {
                    dispatch(setAddNewStaff(STAFF_SELECTION))
                }}
                prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
            >Add New</Button> */}
        </React.Fragment>
    )
}

export default AssigneeStaffSelection
