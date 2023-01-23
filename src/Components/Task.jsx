import React, { useEffect, useState } from 'react'
import EditTask from './EditTask';

function Task(props) {
    const  [cTask, setcTask] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [classPrio, setClassPrio] = useState('taskcard prio0');
    const [check, setCheck] = useState(<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Z"/></svg>);

    useEffect(()=>{
        setcTask(props.task);
        const val=props.task.priority;
        setClassPrio(val==='1'? 'taskcard prio1' : val==='2' ? 'taskcard prio2' : val==='3' ? 'taskcard prio3' : 'taskcard prio0');
    },[props.task]);

    function toggleEdit() {
        if(showEdit)setShowEdit(false);
        else setShowEdit(true);
    }

    function validate(e) {
        setCheck(<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m10.6 16.2 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"/></svg>);
        setTimeout(()=> {
            setClassPrio('taskcard prio0 validate');
        },300);
        setTimeout(async ()=> {
            const tempData= await props.parentProps.deleteTask(props.task);
            props.parentProps.setTasks(tempData);
        },600);
    }
    async function taskDelete() {
        setClassPrio('taskcard prio0 squeeze');
        setTimeout(async ()=> {
            props.parentProps.deleteTask(cTask);
            const res=await props.parentProps.getTasks();
            props.parentProps.setTasks(res);
        },300);        
    }   

    if(!cTask) return ('');
    return (
        <div className={classPrio} data-id={cTask.id}>
            {showEdit ? <EditTask toggleEdit={toggleEdit} parentProps={props.parentProps} task={cTask} setClassPrio={setClassPrio}/> : null}
            
            <div className="checkbox" checked onClick={validate}>
            {check}
            </div>
            <div className="tasktitle">{cTask.title}</div>
            <div className="taskdescription">{cTask.description}</div>
            <div className="project">{cTask.project}</div>
            <div className="deadline">{cTask.dueDate}</div>
            <div className="edit" onClick={toggleEdit}><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg></div>
            <div className="trash" onClick={taskDelete}><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg></div>
        </div>
    )
}

export default Task