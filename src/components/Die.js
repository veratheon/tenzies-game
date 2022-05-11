import React from "react";

export default function Die(props) {
    return (
    <div 
        onClick={props.handle} 
        className={props.hold ? "die hold" : "die"}
    >
        <h2 className="die-num">{props.value}</h2>
    </div>
    )
}