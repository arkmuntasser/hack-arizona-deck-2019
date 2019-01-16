import React from 'react'

export default ({ children }) => (
    <span
        style={{
            display: 'block',
            position: 'relative',
            fontSize: '64px',
            fontWeight: '700'
        }}
    >
        <span
            style={{
                display: 'block',
                position: 'absolute',
                transform: 'translate(-36%,-16%)',
                backgroundColor: '#F50057',
                width: '.75em',
                height: '.75em'
            }}
        ></span>
        <span
            style={{
                display: 'block',
                position: 'relative'
            }}
        >
            {children}
        </span>
    </span>
)