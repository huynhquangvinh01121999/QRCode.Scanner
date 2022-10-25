import React from 'react'

function FieldInput({ type, title, value }) {
    return (
        <>
            <label>{title}: </label>
            <input type={type} value={value}
                style={{
                    width: "100%", padding: "10px 10px",
                    margin: "8px 0", boxSizing: "border-box",
                    backgroundColor: "#121212", border: "1px solid white",
                    borderRadius: "5px", color: "white"
                }} />
        </>
    )
}

export default FieldInput