import React from 'react'

const Description = ({ label, children }) => {
    return (
        <div className="disclaimer">
            <div className="disclaimerName"><h6><strong>{label}</strong></h6></div>
            <div className="disclaimerDescription"><p>{children}</p></div>
        </div>
    )
}

export default Description
