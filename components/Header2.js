import React from 'react'

export default ({ children }) => (
    <div
        style={{
            position: 'relative',
            fontSize: '64px',
            fontWeight: '700'
        }}
        >
        <div
            style={{
                position: 'absolute',
                transform: 'translate(-36%,-16%)',
                backgroundColor: '#F50057',
                width: '.75em',
                height: '.75em'
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