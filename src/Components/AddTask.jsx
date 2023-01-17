import React, { useEffect, useRef, useState } from 'react'
import AddToProject from './AddToProject';
import PrioChooser from './PrioChooser'

function AddTask(props) {
    const [formInfo, setFormInfo] = useState({
        title:'',
        description:'',
        priority:'0',
        dueDate: '',
        project:'',
    });
    const inputRef=useRef(null);

    useEffect(()=> {
    }, [props.projects]);
    

    function appendtask() {
        if(formInfo.title==="") {
            inputRef.current.reportValidity();
        }
        else {
            props.createTask(formInfo);
            props.toggleVisbility();        
        }
    }

    return (
        <div className="modalbody">
            <div className="cancel" onClick={props.toggleVisbility}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"></path>
                </svg>
            </div>
        <div className="formouter"><label className="formlabel"></label>
            {/* ---- name input ---- */}
            <input onKeyDown={e=>{if(e.key==='Enter')appendtask();}} autoFocus ref={inputRef} className="forminput" id="title" placeholder="Your Task" required type="text"  value={formInfo.title} onChange={e=>setFormInfo(prev=>{return {...prev, title:e.target.value }})}/>
        </div>
        <div className="formouter">
            <label className="formlabel"></label>
            {/* ---- description input ---- */}
            <textarea className="forminput" id="desc" placeholder="A brief description..." rows="2" value={formInfo.description} onChange={e=>setFormInfo(prev=>{return {...prev, description:e.target.value }})}></textarea>
        </div>
        <PrioChooser formInfo={formInfo} setFormInfo={setFormInfo}/>
        <AddToProject formInfo={formInfo} getProjects={props.getProjects} projects={props.projects} setFormInfo={setFormInfo} createProject={props.createProject}/>
        <div className="formouter">
            <label className="formlabel">Due:</label>
            <input className="forminput" type="date" id="duedate" value = {formInfo.dueDate} onChange={e=>setFormInfo(prev=>{return {...prev, dueDate:e.target.value }})}/>
        </div>
        <div className="submit" onClick={appendtask}><svg xmlns="http://www.w3.org/2000/svg" height="80" width="80" viewBox="0 0 50 50"><path d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"></path></svg>
        </div>
        </div>
    )
}

export default AddTask