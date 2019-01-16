import React from 'react'

export default ({ children }) => (
    <span
        style={{
            display: 'block',
            position: 'relative',
            fontSize: '96px',
            fontWeight: '700'
        }}
        >
        <span
            style={{
                display: 'block',
                backgroundColor: '#F50057',
                marginBottom: '32px',
                width: '2em',
                height: '14px'
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