import "../../checkbox/directcss/Checkbox.scss"
import React from "react"

export default function CheckBoxIcon({ style, fill = "white" }) {

    return (<svg style={style} className="custom-checkbox__checkmark" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.02277 6.92857L4.85735 10.5L13.8799 0.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    )
}
