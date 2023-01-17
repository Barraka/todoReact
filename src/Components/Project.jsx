import React, { useEffect, useState } from 'react'
import EditProjectName from './EditProjectName';

function Project (props) {
    
    const [project, setProject] = useState({});
    const [relatedTasks, setRelatedTasks] = useState([]);
    const [nameClass, setnameClass] = useState('wrapper');
    const [displayEdit, setDisplayEdit] = useState('');

    useEffect(()=>{
        setProject(props.project)
    },[]);
    
    //Insert related tasks
    useEffect(()=>{
        let temp=[...props.tasks];
        temp=temp.filter(x=>x.projectid===project.id);
        temp=temp.map(x=>(<li className='partOfaProject' key={x.id}>{x.title}</li>));
        setRelatedTasks(temp);
    },[project]);

    function update(o) {
        setProject(o);
        props.updateProject(o);
        setDisplayEdit('');
    }

    function editProject() {
        setDisplayEdit(<EditProjectName project={project} setProject={setProject} update={update} />);
    }
    function projectDelete() {
        if(relatedTasks.length) {
            alert('You cannot delete a project with existing tasks');
        } else {
            setnameClass('wrapper projectDelete');
            setTimeout(()=> {
                props.deleteProject(props.project)
            }, 300);
        }                
    }


    return (
        <div className={nameClass}>
            <div className="categoryOuter">
                <div className="projectAddOuter">
                    <div className="projectTitle categorytxt" >{project.title}</div>
                    {displayEdit}
                    <div className="projectEditIcon" onClick={editProject}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>
                    </div>
                    <div className="projectTrashIcon" onClick={projectDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
                    </div>
                </div>
                <div className='relatedTasks'>
                    {relatedTasks}
                </div>
                
            </div>
        </div>
    );
}

export default Project 