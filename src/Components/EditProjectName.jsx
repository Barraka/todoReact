import React, { useEffect, useRef, useState } from 'react'

function EditProjectName(props) {
    const inputRef = useRef(null);
    const [project, setProject] = useState({title: ''});
    useEffect(()=>{
        if(props.project)setProject({...props.project});
    },[props.project]);

    function nameUpdate() { 
        if(project.title==='') {
            inputRef.current.reportValidity();
        } else {
            props.update(project);
            props.parentProps.setProjects(prev=>{
                let temp=[...prev];
                const index=temp.findIndex(x=>x.id===project.id)
                temp[index]=project;
                return temp;
            });

            //Update corresponding tasks:
            let temp=[...props.parentProps.tasks];
            temp.forEach(x=> {
                if(x.projectid===project.id)x.project=project.title;
            });
            props.parentProps.setTasks(temp);
        }
    }

    return (
        <input onKeyDown={e=>{if(e.key==='Enter')nameUpdate();}} ref={inputRef} required className="projectUpdate" autoFocus value={project.title} onChange={e=>setProject(prev=>({...prev, title: e.target.value}))}  onBlur={nameUpdate}></input>
    )
}

export default EditProjectName