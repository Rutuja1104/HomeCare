// import React, { useState } from 'react';
// import BasicModal from '../../../components/modal/Modal';
// import Button from '../../../components/button/Button';
// import { BUTTON_TYPE } from '../../../libs/constant';
// const DeletePatient = ({allPatients, openDeleteModal, setOpenDeleteModal}) => {
//     // const [openDeleteModal, setOpenDeleteModal] = useState(false);

//     return (
//         <BasicModal
//             open={openDeleteModal}
//             title={"Are you sure you want to delete the patient" + `${allPatients?.firstName}`}
//             closeButtonHandler={() => setOpenDeleteModal(false)}
//             handleClose={() => setOpenDeleteModal(false)}
//         >
//             <div className="nextbuttons">
//                 <Button
//                     type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
//                     className="button-width primary-light-with-border-btn"
//                     onClickCb={() => {
//                         setOpenDeleteModal(false);
//                         // dispatch(postServiceDetails(patientId, serviceDetails));
//                         // dispatch(getAllPayers({ patientId, activeIndex: 2 }));
//                         // dispatch(setActiveRefferalPatientIntakeStep(1));
//                     }}
//                 >
//                     Back
//                 </Button>
//                 <Button
//                     type={BUTTON_TYPE.PRIMARY}
//                     className="button-width primary-btn"
//                     onClickCb={() => {
//                         // dispatch(setServiceDetailsFieldsTouched(true));
//                         // if (!GeneralValidator.validateRequiredFields(serviceDetails)) {
//                         // dispatch(postServiceDetails(patientId, serviceDetails));
//                         // dispatch(getAllPayers({ patientId, activeIndex: 2 }));
//                         // dispatch(setActiveRefferalPatientIntakeStep(3));
//                         // }
//                     }}
//                 >
//                     Next
//                 </Button>
//             </div>
//         </BasicModal>
//     );
// };

// export default DeletePatient;
