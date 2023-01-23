import React, { useEffect, useRef, useState } from 'react'
import AddToProject from './AddToProject';
import PrioChooser from './PrioChooser';

function EditTask(props) {
    const [formInfo, setFormInfo] = useState('');
    const inputRef=useRef(null);
    useEffect(()=> {
        setFormInfo(props.task);
    }, []);
    useEffect(()=> {
        setFormInfo(props.task);
    }, [props.task]);
    
    async function submit() {
        if(formInfo.title==='') {
            inputRef.current.reportValidity();
        } else {
            await props.parentProps.updateTask(formInfo);
            props.toggleEdit();
            props.setClassPrio(`taskcard prio${formInfo.priority}`);
            props.parentProps.setTasks(prev=>{
                let temp=[...prev];
                const index=temp.findIndex(x=>x.id===formInfo.id)
                temp[index]=formInfo;
                return temp;
            })
        }
        
    }

    return (
        <div className="modalouter">
            <div className="modalbody">
                <div className="cancel" onClick={props.toggleEdit}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"></path></svg>
                </div>
                <div className="modaltitle">Edit task:</div>
                <div className="formouter">
                    <label className="formlabel"></label>
                    <input ref={inputRef} autoFocus className="forminput" id="title" placeholder="Your Task" required type="text" value={formInfo.title} onChange={e=>setFormInfo(prev=>{return {...prev, title:e.target.value }})}/>
                </div>
                <div className="formouter">
                    <label className="formlabel"></label>
                    <textarea className="forminput" id="desc" placeholder="A brief description..." rows="2" value={formInfo.description} onChange={e=>setFormInfo(prev=>{return {...prev, description:e.target.value }})}></textarea>
                </div>
                <PrioChooser setFormInfo={setFormInfo} formInfo={formInfo}/>
                <AddToProject parentProps={props.parentProps} formInfo={formInfo} task={props.task} setFormInfo={setFormInfo} />
                <div className="formouter">
                    <label className="formlabel">Due:</label>
                    <input className="forminput" type="date" value = {formInfo.dueDate} onChange={e=>setFormInfo(prev=>{return {...prev, dueDate:e.target.value }})}/>
                </div>
                <div className="submit" onClick={submit}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M21.05 33.1 35.2 18.95l-2.3-2.25-11.85 11.85-6-6-2.25 2.25ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"></path></svg></div>
            </div>
        </div>
    )
}

export default EditTask