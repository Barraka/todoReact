import React, { useEffect, useState } from 'react'

function Backdrop(props) {

    function closeAll() {
        props.setLoginComponent(false);
        props.toggleBackdrop();
    }
    
    return (
        <>
            <div className='backdrop' onClick={closeAll}></div>
        </>
    )
}

export default Backdrop