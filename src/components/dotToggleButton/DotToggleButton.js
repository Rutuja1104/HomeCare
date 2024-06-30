import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DotToggleButton = ({ optionsData, onSelect, showToggle, dropdownSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        if (onSelect) {
            onSelect(option);
        }
        toggleDropdown();
    };

    return (
        <Dropdown isOpen={isOpen} toggle={toggleDropdown} className='cursor'>
            <DropdownToggle tag="a" className="text-decoration-none " onClick={dropdownSelect}>
                <MoreVertIcon  style={{color: '#393939'}}/>
            </DropdownToggle>
            <DropdownMenu size="lg" title="">
                {optionsData?.map((item, index) => (
                    <DropdownItem key={index} onClick={() => handleOptionClick(item)} className="flex">
                        {item ?? 'N/A'}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default DotToggleButton;
