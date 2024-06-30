import React from "react";

function BadgeBg({bgColor='',color='',children}) {
    return <span style={{backgroundColor:`${bgColor}`,borderRadius:'70px',padding:'5px 8px',color:`${color}`,fontSize:'14px',width:'500px'}}>{children}</span>;
}

export default BadgeBg;

