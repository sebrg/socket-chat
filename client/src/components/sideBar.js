import React from "react";



export default function SideBar(props) {
    

    return (
                                                    
        <div style={sideBarStyle}>
            {props.children}
        </div>
    )
}

const sideBarStyle = {
    display: "flex",
    flexDirection: "column",
    width: "20%",
    height: "100%",
    backgroundColor: "yellow"
}