export const responsiveLabelValueStyles = {
    labelValueContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',

        maxWidth: '100%',
        flexWrap: 'wrap',
    },
    labelValuePair: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'start',
        marginBottom: '24px',
        marginRight: '16px',

        flexBasis: 'calc(12% - 16px)',
        '@media (minWidth: 768px)': {
            flexBasis: 'calc(33.33% - 16px)',
        },
        '@media (minWidth: 1024px)': {
            flexBasis: 'calc(25% - 16px)',
        },
    },
    label: {
        fontSize: "16px",
        fontWeight: "500",
        color: "#727272"
    },

    value: {
        color: "var(--grey-90, var(--grey-90, #393939))",
        fontSize: "16px",
        fontWeight: "600",
    }
};