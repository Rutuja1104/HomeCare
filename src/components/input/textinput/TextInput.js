/**
 * @props type - Type of the input eg. text, email, password.
 * @props name: Name for the element. Name will be same as the property that we want to change (string)
 * @props onChangeCb - Callback Function which recieves event object whenever input field value changes
 * @props onBlurCb - Callback Function which recieves event object whenever user leaves input field
 * @props label: label on top of the input field (string)
 * @props labelWTooltip: use this if we want to show the label with tooltip icon. Id is mandatory for tooltip to work.
            Example: { id: null, label: "", iconName: "", iconStyles: {}, tooltipText: "" },

 * @props showSpinners - To show or hide the spinners on the input type number
 * 
 * @props suffixProps: Object containing icon or text. Set icon if we want to render the icon and set text if we want to render any text. 
                      suffixProps will set the icon or text at the right side of the text field. suffixProps can also have a callback function for click on icon (suffixIconCb: () => {})
                      Example: { icon: VEC_ICON_NAME.ICON_DROPDOWN_CARET } or { text: "+91" } or { prefixIconCb: () => { } }
 * 
 * @props prefixProps: Object containing icon or text. Set icon if we want to render the icon and set text if we want to render any text. 
                      prefixProps will set the icon or text at the left side of the text field. prefixProps can also have a callback function for click on icon (prefixIconCb: () => {})
                      Example: { icon: VEC_ICON_NAME.ICON_DROPDOWN_CARET } or { text: "+91" } or { prefixIconCb: () => { } }
 */

import { React, useEffect, useRef, useState } from "react";
import styles from "./TextInput.styles";
import Icons from "../../icon/Icon";
import './directcss/TextInput.scss'
import TxTooltipWIcon from "../../tooltip/txtooltipwicon/TxTooltipWIcon";
import ErrorsList from "../errorslist/ErrorsList";
import { VEC_ICON_NAME } from "../../icon/constants";

export default function TextInput({
    id = null,
    name,
    label = "",
    labelWTooltip = { id: null, label: "", iconName: "", iconStyles: {}, tooltipText: "" },
    type = "text",
    placeHolder = "",
    value,
    showSpinners = false,
    className = "",
    onChangeCb = () => { },
    customStyles = {},
    onFocusCb = () => { },
    suffixProps = { suffixIconCb: () => { }, suffixClearIconCb: () => { }, suffixIconStyles: {} },
    prefixProps = { prefixIconCb: () => { }, prefixIconStyles: {} },
    onClickCb = () => { },
    onBlurCb = () => { },
    hideBorder = false,
    rules = {},
    errors = {},
    formSubmitted = false,
    autoComplete = "off",
    formSubmittedCb = () => { },
    disabled = false,
    showDisabledStyles = false,
    confirmedEdit = false,
    onReset = () => { },
    isClearable = false,
    children,
    containerStyles = {},
    onKeyPress = () => { },
    min = "0",
    max = ""
}) {

    const [isTouched, setIsTouched] = useState(false);
    const [isConfirmedEditingOn, setIsConfirmedEditingOn] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (formSubmitted) {
            setIsTouched(true)
            formSubmittedCb({ target: { name, value } }, rules)
        } else {
            setIsTouched(false)
        }
    }, [formSubmitted, errors])

    const getErrorStyles = () => {
        if (Object.keys(errors)?.length > 0 || (isTouched && rules?.required && value?.length == 0)) {
            return styles.errorStyles
        } else {
            return {};
        }
    }

    const getDisabledStyles = () => {
        return (disabled && showDisabledStyles) ? { backgroundColor: "#f8f8a8" } : {}
    }

    const onIsConfirmedEditingCancel = () => {
        setIsConfirmedEditingOn(false)
        onReset();
    }

    const onIsConfirmedEditingSave = () => {
        setIsConfirmedEditingOn(false)
    }

    const handleKeyPress = (e) => {
        onKeyPress(e)

        if (e.key === '-' && type == "number") {
            e.preventDefault();
        }
    };

    return (
        <div style={{ ...styles.container, ...containerStyles }}>

            {label && <label style={styles.label}>{label} <span style={styles.errorStar}>{rules.required && ' *'}</span></label>}
            {labelWTooltip.label &&
                <div style={styles.labelWTooltipContainer}>
                    <label style={styles.label}>{labelWTooltip.label}{rules.required && '*'}</label>
                    <TxTooltipWIcon
                        id={labelWTooltip.id}
                        text={labelWTooltip.tooltipText}
                        iconName={labelWTooltip.iconName}
                        iconStyles={labelWTooltip.iconStyles}
                    />
                </div>
            }

            <div style={{ ...styles.inputContainer, ...getDisabledStyles() }} className={hideBorder ? "border-0" : null}>

                {prefixProps.icon && (
                    <div style={{ ...styles.iconPosition, ...styles.prefixIcon, ...prefixProps.prefixIconStyles }} onClick={prefixProps.prefixIconCb}>
                        {
                            (prefixProps?.iconToolTipText) ?
                                <TxTooltipWIcon
                                    id={name}
                                    text={prefixProps?.iconToolTipText}
                                    iconName={prefixProps.icon}
                                />
                                :
                                <Icons familyName="vec" iconName={prefixProps.icon} />
                        }
                    </div>
                )}

                {prefixProps.text && (
                    <div style={{ ...styles.iconPosition, ...styles.prefixIcon }}>
                        {prefixProps.text}
                    </div>
                )}

                <input
                    id={id}
                    ref={inputRef}
                    type={type}
                    placeholder={placeHolder}
                    autoComplete={autoComplete}
                    onChange={(e) => {
                        isTouched ? onChangeCb(e, rules) : onChangeCb(e)
                    }}
                    onWheel={type === 'number' ? (e) => {
                        if (inputRef && inputRef.current)
                        {
                            inputRef.current.blur()
                        }
                    } : null}
                    style={{ ...styles.textInput, ...customStyles, ...getErrorStyles() }}
                    className={`${className} ${showSpinners ? '' : 'hide-spinners'}`}
                    value={value}
                    name={name}
                    min={min}
                    max={max}
                    onFocus={onFocusCb}
                    onClick={onClickCb}
                    disabled={disabled || confirmedEdit ? !isConfirmedEditingOn : false}
                    onKeyPress={handleKeyPress}
                    onBlur={(e) => {
                        setIsTouched(true)
                        onChangeCb(e, rules)
                        onBlurCb(e)
                    }}
                />

                {suffixProps.icon && (
                    value && isClearable ?
                        <div style={{ ...styles.iconPosition, ...styles.suffixIcon, ...suffixProps.suffixIconStyles }} onClick={() => suffixProps.suffixClearIconCb(name)}>
                            <Icons familyName="vec" iconName={suffixProps.clearIcon} style={styles.widthIcon} />
                        </div> :
                        <div style={{ ...styles.iconPosition, ...styles.suffixIcon, ...suffixProps.suffixIconStyles }} onClick={suffixProps.suffixIconCb}>
                            {
                                (suffixProps?.iconToolTipText) ?
                                    <TxTooltipWIcon
                                        id={name}
                                        text={suffixProps?.iconToolTipText}
                                        iconName={suffixProps.icon}
                                    />
                                    :
                                    <Icons familyName="vec" iconName={suffixProps.icon} />
                            }

                        </div>
                )}

                {suffixProps.text && (
                    <div style={{ ...styles.iconPosition, ...styles.suffixIcon }}>
                        {suffixProps.text}
                    </div>
                )}
                {confirmedEdit && (
                    <>
                        {!isConfirmedEditingOn && (
                            <div onClick={() => setIsConfirmedEditingOn(true)}>
                                <Icons familyName="vec" iconName={VEC_ICON_NAME.EDIT_ICON} />
                            </div>
                        )
                        }

                        {isConfirmedEditingOn && (
                            <div style={styles.iconsRows}>
                                <div style={styles.cursorPointer} onClick={onIsConfirmedEditingCancel}>
                                    <Icons familyName={"vec"} iconName={VEC_ICON_NAME.RED_CROSS_ICON} transformScale={0.7} />
                                </div>
                                <div style={styles.cursorPointer} onClick={onIsConfirmedEditingSave}>
                                    <Icons familyName={"vec"} iconName={VEC_ICON_NAME.GREEN_TICK_ICON} transformScale={0.7} />
                                </div>
                            </div>
                        )
                        }
                    </>
                )
                }

                {children}

            </div>

            <ErrorsList errors={errors} />
        </div>
    );
}
