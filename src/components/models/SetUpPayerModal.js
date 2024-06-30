import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { BUTTON_TYPE } from "../../libs/constant";
import Button from "../button/Button";
import { useDispatch} from "react-redux";
import { setJobPostStates } from "../../pages/JobPostings/JobPostingSlice";
import { generalValidator } from "../../libs/utility/validators/GeneralValidator";
import Icons from "../icon/Icon";
import { VEC_ICON_NAME } from "../icon/constants";

const SetUpPayerModal = ({
    isOpen,
    toggle = () => {},
    onSuccessCb = () => {},

}) => {
    const dispatch = useDispatch();
    const onChangeHandler = (name, value, rules) => {
        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setJobPostStates({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setJobPostStates({ [name]: { value } }));
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
            <ModalHeader className="modal-title">
                <span onClick={() => toggle()}>
                    <Icons iconName={VEC_ICON_NAME.HEADER_BACK_ARROW} />
                </span>
                Warning
            </ModalHeader>
            <ModalBody className="p-6">
                Are you sure you want to leave? Your changes will be discarded.
                <div className="mt-5">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={toggle}>
                        Cancel
                    </Button>
                    <Button className="ms-3" onClickCb={onSuccessCb}>
                        Ok
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default SetUpPayerModal;
