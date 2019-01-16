import React from 'react'

export default ({ children }) => (
    <div
        style={{
            position: 'relative',
            fontSize: '96px',
            fontWeight: '700'
        }}
        >
        <div
            style={{
                backgroundColor: '#F50057',
                marginBottom: '32px',
                width: '2em',
                height: '14px'
            }}
        ></div>
        <div
            style={{
                position: 'relative'
            }}
        >
            {children}
        </div>
    </div>
)