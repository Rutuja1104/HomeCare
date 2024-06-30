import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { MoreVert } from '@mui/icons-material';

const UncontrolledDropdownV2 = ({ data, action = [] }) => {
    return (
        <UncontrolledDropdown group direction="start" className="uncontrolled-dropdown">
            <DropdownToggle>
                <MoreVert style={{ color: 'black' }} />
            </DropdownToggle>
            {action.length !== 0 && (
                <DropdownMenu>
                    {action.map((item, index) => {
                        return (
                            <DropdownItem
                                key={index}
                                // className={item.disabled && item.disabled(data.row) ? 'bg-#f8f8f8' : ''}
                                style={item.disabled && item.disabled(data.row) ? { background: '#f1efef', border: "none" } : {}}

                                onClick={() => item.onClickCb(data.row, data.idx)}
                                disabled={item.disabled && item.disabled(data.row)}
                            >
                                {item.text}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            )}
        </UncontrolledDropdown>
    );
};

export default UncontrolledDropdownV2;
