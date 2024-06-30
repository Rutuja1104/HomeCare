import { Theme } from "../../constants";

export default {
    inputContainer: {
        display: "flex",
        borderBottom: "1px solid #262626",
        gap: '10px',
        flexWrap: 'wrap'
    },

    textInput: {
        border: "none",
        backgroundColor: "inherit",
        outline: "none",
        width: "100%",
        paddingBottom: "6px",
        fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "16px",
        color: Theme.TEXT_PRIMARY_BLACK,
        paddingLeft: "5px",
    },
    buttonNoWrap: {
        whiteSpace: 'nowrap'
    },
    tags: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    }
};
