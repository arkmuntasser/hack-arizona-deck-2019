import React from 'react'

export default ({ children }) => (
    <span>
        <span
            style={{
                display: 'block',
                position: 'relative',
                fontSize: '54px',
                fontWeight: '700',
                marginBottom: '32px',
                paddingLeft: '32px'
            }}
        >
            <span
                style={{
                    display: 'block',
                    position: 'absolute',
                    left: '0',
                    width: '12px',
                    height: '100%',
                    backgroundColor: '#F50057'
                }}
            ></span>
            Amir R Muntasser
            <span
                style={{
                    display: 'block',
                    fontSize: '32px',
                    color: '#666'
                }}
            >
                Senior Developer Lead of CMS Operations
            </span>
        </span>

        <span
            style={{display: 'flex',alignItems: 'center'}}
        >
            <a style={{textDecoration: 'none', color: '#EC407A', marginRight: '24px',display: 'flex',alignItems: 'center'}} href="https://twitter.com/arkmuntasser" target="_blank">
                <img src={require("file-loader!../assets/logo-twitter.png")} width="36" />&nbsp;@arkmuntasser
            </a>
            <a style={{textDecoration: 'none', color: '#EC407A',marginRight: '24px',display: 'flex',alignItems: 'center'}} href="https://github.com/arkmuntasser" target="_blank">
                <img src={require("file-loader!../assets/logo-github.png")} width="36" />&nbsp;@arkmuntasser
            </a>
            <a style={{textDecoration: 'none', color: '#EC407A',marginRight: '24px',display: 'flex',alignItems: 'center'}} href="https://arkm.xyz" target="_blank">
                <img src={require("file-loader!../assets/logo-website.jpg")} width="36" />&nbsp;arkm.xyz
            </a>
        </span>
    </span>
)