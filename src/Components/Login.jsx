import React, { useEffect, useState } from 'react'
import google from '../assets/google.png'

function Login(props) {
    const [output, setOutput] = useState('');
    const [displayname, setDisplayname] = useState('');

    function signout() {
        props.toggleLogin();
        props.logOut();
        props.setProfilePic(undefined);
        props.setCurrentStatus(0);
        props.setTasks('');
    }
    async function signin() {
        props.toggleLogin();
        const loginResult= await props.logIn();
        props.setProfilePic(loginResult.pic);
        props.setCurrentStatus(loginResult.getAuth);
    }
    useEffect(()=>{
        if(props.currentStatus) {
            if(props.currentStatus.currentUser)setDisplayname(props.currentStatus.currentUser.displayName);
            else setDisplayname(props.currentStatus.email);
        }
    },[]);


    if(!props.currentStatus) {
        return (
            <div className='login'>
                <div>
                    <div className="loginText">You are not logged in.</div>
                    <button className='signinButton' onClick={signin}><img src={google} alt='sign'></img> Sign in with Google</button>
                    <button className='signinButton' onClick={()=>props.setSignin(true)}> Sign in with Email</button>
                    <button className='signinButton signup' onClick={()=>props.setSignup(true)}>Sign up</button>
                    
                </div>
            </div>
        );
    }
    else return (
        <div className='login'>
            <div>
                <div className="loginText">You are signed in as:<br/> {displayname}.</div>
                <button className='signinButton' onClick={signout}>Sign out</button>
            </div>
        </div>
            
    )
}

export default Login