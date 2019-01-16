import React from 'react'

export default ({ children }) => (
    <div>
        <div
            style={{
                position: 'relative',
                fontSize: '54px',
                fontWeight: '700',
                marginBottom: '32px',
                paddingLeft: '32px'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: '0',
                    width: '12px',
                    height: '100%',
                    backgroundColor: '#F50057'
                }}
            ></div>
            Amir R Muntasser
            <div
                style={{
                    fontSize: '32px',
                    color: '#666'
                }}
            >
                Senior Developer Lead of CMS Operations
            </div>
        </div>

        <div
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <img src='./assets/logo-twitter.png' width="36" />&nbsp;@arkmuntasser
            &nbsp;&nbsp;
            <img src='./assets/logo-github.png' width="36" />&nbsp;@arkmuntasser
            &nbsp;&nbsp;
            <img src='./assets/logo-website.jpg' width="36" />&nbsp;arkm.xyz
        </div>
    </div>
)