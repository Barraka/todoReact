import React, { useEffect, useState } from 'react'
import google from '../assets/google.png'

function Login(props) {
    const [output, setOutput] = useState('');

    function signout() {
        props.setLoginComponent();
        props.logout();
    }
    function signin() {
        props.setLoginComponent();
        props.login();
    }
    useEffect(()=> {
        if(props.loginComponent===1) {
            if(props.currentStatus===0) {
                setOutput(
                    <div className='login'>
                        <div>
                            <div className="loginText">You are not logged in.</div>
                            <button className='signinButton' onClick={signin}><img src={google} alt='sign'></img> Sign in with Google</button>
                        </div>
                    </div>
                );
            } else {
                setOutput(
                    <div className='login'>
                        <div>
                            <div className="loginText">You are signed in as {props.currentStatus.currentUser.displayName}.</div>
                            <button className='signinButton' onClick={signout}>Sign out</button>
                        </div>
                    </div>
                );
            }
        } else setOutput('');
        
    }, [props.loginComponent]);


    return (
        <>
            {output}
        </>
            
    )
}

export default Login