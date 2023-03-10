import React, { useEffect, useRef, useState } from 'react'

function AddProject(props) {
    const [formInfo, setFormInfo] = useState({
        title:''
    });
    const[output, setOutput] = useState('');
    const inputRef=useRef(null);
    useEffect(()=>{
        const temp=[...props.parentProps.projects];
        let temp2;
        if(temp){temp2=temp.map(x=>(<div className='projectList' key={x.id}>{x.title}</div>));};
        setOutput(temp2);
    },[props.parentProps.projects]);
    async function submitProject() {
        if(formInfo.title==="") {
            inputRef.current.reportValidity();
        }
        else {
            const result = await props.parentProps.createProject(formInfo);
            props.parentProps.toggleVisbility();
            const tempVal=[...props.parentProps.projects, {...formInfo, id:result}];
            props.parentProps.setProjects(tempVal);
        }        
    }

    return (
        <div className="modalbody">
            <div className="cancel">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" onClick={props.toggleVisbility}>
                    <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"></path>
                </svg>
            </div>
            <label className="projectlabel">What do you want to plan?</label>
            <input onKeyDown={e=>{if(e.key==='Enter')submitProject();}} autoFocus ref={inputRef} id='projectinput' className="projectinput" placeholder="Your amazing new project" required onChange={e=>setFormInfo(prev=>{return {title:e.target.value }})}></input>
            <div className="existingProjects">Existing projects: <div className="projectItem">{output}</div>
            </div>
            <div className="projecthint"></div>
            <div className="submit" onClick={submitProject}>
                <svg xmlns="http://www.w3.org/2000/svg" height="80" width="80" viewBox="0 0 50 50">
                    <path d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"></path>
                </svg>
            </div>
        </div>
    )
}

export default AddProject