import React, { useEffect, useState } from 'react'

function Backdrop(props) {
    const [output, setOutput] = useState('');
    useEffect(()=> {
        if(props.loginComponent===1) {
            setOutput(<div className='backdrop' onClick={props.setLoginComponent}></div>)
        } else setOutput('');
    },[props.loginComponent]);
    
    return (
        <>
            {output}
        </>
    )
}

export default Backdrop