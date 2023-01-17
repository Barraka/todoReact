import React, { useEffect, useState } from 'react'
import AddList from './AddList';
import AddProject from './AddProject';
import AddTask from './AddTask';

function AddItems(props) {
    //Do nothing when user is not logged in
    if(!props.currentStatus) {
        return;
    }
    const [classTask, setClassTask] = useState('newtask newitem menuSelected');
    const [classProject, setClassProject] = useState('newproject newitem');
    const [classList, setClassList] = useState('newlist newitem');
    const [output, setOutput] = useState('');

    function selectMenu(s) {
        if(s==='task')setOutput(<AddTask createProject={props.createProject} getProjects={props.getProjects} projects={props.projects} toggleVisbility={props.toggleVisbility} createTask={props.createTask}/>);
        else if(s==='project')setOutput(<AddProject projects={props.projects} toggleVisbility={props.toggleVisbility} createProject={props.createProject}/>);
        else if(s==='list') {
            setOutput(<AddList lists={props.lists} createList={props.createList} updateList={props.updateList} deleteList={props.deleteList} toggleVisbility={props.toggleVisbility} />);
        }
    }
    useEffect(()=>{
        selectMenu('task');
    },[]);
    useEffect(()=>{
        selectMenu('task');
    },[props.projects]);

    const [visibility, setVisibility] = useState('taskcontainer taskcontainerhidden');
    useEffect(()=> {
        if(props.visibility===0)setVisibility('taskcontainer taskcontainerhidden');
        else setVisibility(prev=>'taskcontainer taskcontainervisible');
    }, [props.visibility]);


    //-----------------------------
    return (
        // <div className={visibility}>
        <div className='taskcontainer taskcontainervisible'>
            <div className='taskcontainerinner'>
                <div className='addoptions'>
                    <div className={classTask} onClick={()=>selectMenu('task')}>New Task</div>
                    <div className={classProject} onClick={()=>selectMenu('project')}>New Project</div>
                    <div className={classList} onClick={()=>selectMenu('list')}>New List</div>
                </div>
                {output}
            </div>
        </div>
    )
}

export default AddItems