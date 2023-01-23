import React, { useEffect, useState } from 'react'
import CreateProject from './CreateProject';

function AddToProject(props) {
    const [projects, setProjects] = useState([]);
    const [displayAdd, setDisplayAdd] = useState('');
    const [select, setSelect] = useState(''); //react doesn't like the 'selected' attribute

    useEffect(()=>{
        const output=[...props.parentProps.projects].map(x=> {
            if(props.formInfo.projectid===x.id) {
                setSelect(x.title);
                return <option key={x.id} data-id={x.id} className="optiondiv" value={x.title}>{x.title}</option>
            }
        return<option key={x.id} data-id={x.id} className="optiondiv" value={x.title}>{x.title}</option>
        });
        setProjects(output);
    },[props.formInfo, props.parentProps.projects]);  

    function getselected(e) {
        const select = document.querySelector('select');
        const options=select.options;
        const id=options[options.selectedIndex].getAttribute('data-id');
        const title=options[options.selectedIndex].getAttribute('value');
        props.setFormInfo(prev=>({...prev, project: title, projectid: id}));
        setSelect(e.target.value);
    }

    async function selectNewProject(pid, pname) {
        props.setFormInfo(prev=>({...prev, 'project': pname, 'projectid': pid}));
        setSelect(pname);
    }

    return (
        <div className="joinproject">Add to project: 
            {displayAdd}
            <select id='theprojects' value={select} className="projectddl" onChange={getselected}>
                <option className="optiondiv" value=''></option>
                {projects}                
            </select>
            <div className="createProject" onClick={()=>setDisplayAdd(<CreateProject selectNewProject={selectNewProject} parentProps={props.parentProps} setDisplayAdd={setDisplayAdd}/>)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                    <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"></path>
                </svg>
            </div>
        </div>
    )
}

export default AddToProject