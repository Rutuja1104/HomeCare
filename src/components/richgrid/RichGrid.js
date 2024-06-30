import React, { useState } from "react";
import { Table } from "reactstrap";
import Checkbox from "../checkbox/basecheckbox/Checkbox";
import { VEC_ICON_NAME } from "../icon/constants";
import Pagination from "../pagination/Pagination";

const RichGrid = ({
    columns = [],
    data = [],
    selectable = null,
    selectedRows = [],
    onSelectionChangeCallBack = (rows) => { },
    onHeaderSelectionChangeCallBack = (rows) => { },
    extractRowKey,
    sortProps = {
        field: null,
        // dir: SORT_DIRECTIONS.NONE,
        onChange: () => { }
    },
    paginationProps = null,
    rowStyleFn = null,
    sortFields,
    onSortChange,
    checkboxProps = { checkboxContainerStyle: {} },
    groupBy = null,
    groupByRowProps = {},
    setSelectTotalRecordsCb = () => { },
    isAllSelectable = true,
    hideTableHeader = false,
    showRowInfo = false,
    onRowClick = () => { },
}) => {
    const [headerCheckbox, setHeaderCheckbox] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState([]);

    let gridColumns = [...columns];
    if (selectable) {
        gridColumns.unshift({
            field: "checkbox",
            header: (
                <>
                    {isAllSelectable ? (
                        <Checkbox
                            checked={headerCheckbox || data.length === selectedRows.length}
                            iconName={VEC_ICON_NAME.CHECKBOX_DASH_ICON}
                            onChangeCb={(status) => {
                                const isChecked = status.target.checked;
                                onHeaderSelectionChangeCallBack(isChecked ? data : []);
                                setHeaderCheckbox(isChecked);
                                if (!isChecked) {
                                    setSelectTotalRecordsCb(isChecked);
                                }
                            }}
                        />
                    ) : (
                        <></>
                    )}
                </>
            ),
            renderLogic: (row) => (
                <Checkbox
                    onChangeCb={(status) => {
                        const isChecked = status.target.checked;
                        let newSelectedRows;
                        if (!isChecked) {
                            newSelectedRows = [...selectedRows].filter(
                                (selectedRow) => extractRowKey(row) !== extractRowKey(selectedRow)
                            );
                        } else {
                            newSelectedRows = [...selectedRows];
                            newSelectedRows.push(row);
                        }
                        onSelectionChangeCallBack(newSelectedRows);
                        if (!isChecked) {
                            setSelectTotalRecordsCb(isChecked);
                        }
                    }}
                    checked={selectedRows.find((selectedRow) => extractRowKey(row) === extractRowKey(selectedRow))}
                    containerStyles={checkboxProps.checkboxContainerStyle}
                />
            )
        });
    }

    let groupedData = [...data];

    if (groupBy) {
        groupedData = [];
        const groups = {};
        data.forEach((row) => {
            const groupValue = row[groupBy];
            if (groupValue in groups) {
                groups[groupValue].push(row);
            } else {
                groups[groupValue] = [row];
            }
        });

        Object.entries(groups).forEach(([groupValue, rows]) => {
            const groupRows = rows.filter((row) => !row.isGroupHeader);
            const hasRed = groupRows.some((row) => row.payerColor === "red");
            const hasYellow = !hasRed && groupRows.some((row) => row.payerColor === "yellow");

            groupedData.push({
                isGroupHeader: true,
                groupValue,
                payerTin: rows[0]?.PayerTIN ?? null,
                FormId: rows[0]?.FormId,
                groupHeaderCircleColor: hasRed ? "red" : hasYellow ? "yellow" : "green"
            });
            if (expandedGroups.includes(groupValue)) {
                groupedData.push(...rows);
            }
        });
    }

    return (
        <div className="table-container">
            <div className="table-scrollable">
                <Table hover responsive cssModule={{ overflowClip: { overflowX: "clip" } }}>
                    {!hideTableHeader && (
                        <thead>
                            <tr>
                                {gridColumns.map((column, key) => {
                                    return (
                                        <th className={`table-header ${column.field == "checkbox" && "table-row-checkbox"}`} key={`col-${key}`}  >
                                            <div>{column.header}</div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                    )}
                    <tbody className="table-body">
                        {groupedData.map((row, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <tr
                                        onClick={() => onRowClick(row)}
                                    >
                                        {gridColumns.map((column, index) => (
                                            <td className="table-data" key={`td-${index + 5}`}>
                                                {column.renderLogic(row, idx)}
                                            </td>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            {data.length == 0 && <p className="d-flex justify-content-center">No records were found</p>}

            {paginationProps && data.length !== 0 && <Pagination {...paginationProps} />}
        </div>
    );
};

export default RichGrid;
