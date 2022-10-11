import React from 'react'

function Button({ OnClick, Value, Style }) {
    return (
        <>
            <button
                style={Style}
                onClick={OnClick}>{Value}
            </button>
        </>
    )
}

export default Button