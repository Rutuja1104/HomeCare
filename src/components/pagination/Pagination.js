import React from 'react'
import { Pagination as PaginationCtr } from "reactstrap";
import { VEC_ICON_NAME } from '../icon/constants';
import { BUTTON_TYPE } from '../../libs/constant';
import styles from './Pagination.styles';
import SelectDropdown from '../dropdown/selectdropdown/SelectDropdown';
import Button from '../button/Button';
import { ROW_SELECTION_OPTIONS } from './constants';

export default function Pagination({
    page = 1,
    take = 10,
    total = 10,
    onChange = () => { },
    takeOptions = ROW_SELECTION_OPTIONS,
    onChangeTakeCb = () => { }
}) {
    const totalPages = Math.ceil(total / take);

    return (
        <div style={styles.paginationContainer}>

            <div style={styles.rowsSelectionContainer}>
                <span>Showing</span>
                <div style={styles.rowSelectionDropdownContainer}>
                    <SelectDropdown
                        value={{ label: `${take} Rows` }}
                        onSelectCb={(name, option) => {
                            onChangeTakeCb(option.value)
                        }}
                        hideBorder
                        suffixProps={{ icon: VEC_ICON_NAME.CARET_DOWN, suffixIconStyles: styles.rowSelectionDropdownIcon }}
                        customInputStyles={styles.rowSelectionDropdown}
                        options={takeOptions}
                        isClearable={false}
                    />
                </div>
            </div>

            <PaginationCtr style={styles.pageNumbers}>
                <Button
                    prefixProps={{ icon: VEC_ICON_NAME.ICON_LEFT_2 }}
                    variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                    disabled={page === 1}
                    onClickCb={e => {
                        e.preventDefault()
                        onChange(page - 1);
                    }}
                >
                    Previous
                </Button>

                Page {page} of {totalPages}

                <Button
                    suffixProps={{ icon: VEC_ICON_NAME.ICON_RIGHT }}
                    variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                    disabled={page === totalPages}
                    onClickCb={e => {
                        e.preventDefault()
                        onChange(page + 1);
                    }}
                >
                    Next
                </Button>
            </PaginationCtr>
        </div>
    )
}
