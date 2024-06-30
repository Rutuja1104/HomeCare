// import * as React from 'react';
// import Box from '@mui/material/Box';

// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Button from '../button/Button';
// import { BUTTON_TYPE } from '../../libs/constant';

// const defaultStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'background.paper',
//     border: '1px solid #000',
//     boxShadow: 24,
//     width: 400,
//     // borderRadius: 5,
//     p: 4
//     // maxHeight: '80vh'
// };

// const modalContentStyle = {
//     maxHeight: '70vh',
//     overflow: 'auto'
// };
// export default function BasicModal({
//     open,
//     handleClose = () => {},
//     title,
//     children,
//     okButtonHandler,
//     closeButtonHandler,
//     isButton = false,
//     className,
//     customStyle = {}
// }) {
//     const modalStyle = {
//         ...defaultStyle,
//         ...customStyle // Merge the custom style with the default style
//     };
//     const scrollableContentStyle = {
//         maxHeight: '100%',
//         overflow: 'auto'
//     };
//     return (
//         <div>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//                 className={'' + `${className ?? ''}`}
//                 customStyle={modalStyle}
//             >
//                 <Box sx={modalStyle}>
//                     <Typography id="modal-modal-title" variant="h5" component="h2">
//                         {title}
//                     </Typography>
//                     <div style="modalContentStyle">
//                         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                             {children}
//                         </Typography>
//                     </div>
//                     {isButton && (
//                         <div className="modal-buttons">
//                             <Button type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} onClickCb={closeButtonHandler}>
//                                 Close
//                             </Button>
//                             <Button type={BUTTON_TYPE.PRIMARY} onClickCb={okButtonHandler}>
//                                 Ok
//                             </Button>
//                         </div>
//                     )}
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';

const defaultStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    width: 400,
    // borderRadius: 5,
    p: 4,
    // maxHeight: '80vh'
};

const modalContentStyle = {
    maxHeight: '70vh',
    overflow: 'auto'
};

export default function BasicModal({
    open,
    handleClose = () => {},
    title,
    children,
    okButtonHandler,
    closeButtonHandler,
    isButton = false,
    className,
    customStyle = {}
}) {
    const modalStyle = {
        ...defaultStyle,
        ...customStyle // Merge the custom style with the default style
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={'' + `${className ?? ''}`}
                customStyle={modalStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {title}
                    </Typography>
                    <div style={modalContentStyle}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {children}
                        </Typography>
                    </div>
                    {isButton && (
                        <div className="modal-buttons">
                            <Button type={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} onClickCb={closeButtonHandler}>
                                Close
                            </Button>
                            <Button type={BUTTON_TYPE.PRIMARY} onClickCb={okButtonHandler}>
                                Ok
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
