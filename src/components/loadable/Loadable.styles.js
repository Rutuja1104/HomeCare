export default {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: "column",
        rowGap: "10px",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },

    loadingText: {
        color: "#FFF"
    },

    loader: {
        border: "5px solid #f3f3f3",
        borderTop: " 5px solid #3498db",
        borderRadius: "50 %",
        width: "50px",
        height: '50px',
        animation: 'spin 1s linear infinite'
    }

}