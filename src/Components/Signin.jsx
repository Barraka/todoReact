import React, { useRef } from 'react'
import face from '../assets/face.svg';

function Signin(props) {
    const emailRef=useRef(null);
    const pwdRef=useRef(null);
    

    async function submit() {
        const email=emailRef.current.value;
        const pwd=pwdRef.current.value;
        const res= await props.signInEmail(email, pwd);
        console.log('res: ', res);
        if(res) {
            props.setCurrentStatus(res);
            props.setSignin(false);
            props.setProfilePic(face);
        }
        
    }

    return (
        <div className='signupForm'>
            <form action="#">
                <div onClick={()=>props.setSignin(false)} className="closeButton">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6Zm3.6 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
                </div>
                <div className="signupTxt">
                    Sign in:
                </div>
                <div className="emailWrapper">
                    <label htmlFor="email">email:</label>
                    <input autoComplete='email' ref={emailRef} type="text" id="email" name="email" />
                </div>
                <div className="passwordWrapper">
                    <label htmlFor="password">Password:</label>
                    <input autoComplete='password' ref={pwdRef} type="password" id="password" name="password" />
                </div>
                <button className='signinButton' onClick={submit}>Sign in</button>
            </form>
        </div>
    )
}

export default Signin