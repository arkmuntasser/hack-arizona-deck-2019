import React from 'react'

export default ({ children }) => (
    <div
        style={{
            width: '100vw',
            height: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem'
        }}
    >
        {children}
    </div>
)
