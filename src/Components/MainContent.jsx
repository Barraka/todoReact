import React, { useEffect, useState } from 'react'
import List from './List';
import Project from './Project';
import Task from './Task';

function MainContent(props) {
    
    if(!props.currentStatus) {
        if(props.content==='home')return (<div className='maincontent defaultText'> You need to log in in order to view and create tasks.</div>);
        if(props.content==='projects')return (<div className='maincontent defaultText'> You need to log in in order to view and create projects.</div>);
        if(props.content==='lists')return (<div className='maincontent defaultText'> You need to log in in order to view and create lists.</div>);
    }
    const [output, setOutput] = useState('');
    const [defaultText, setDefaultText] = useState('');
    const defaultTask=<div className='defaultText'>There are currently no tasks. Create one by using the "add" button at the top of the app.</div>
    const defaultProject=<div className='defaultText'>There are currently no projects. Create one by using the "add" button at the top of the app.</div>
    const defaultList=<div className='defaultText'>There are currently no lists. Create one by using the "add" button at the top of the app.</div>

    useEffect(()=>{
        if(!output.length) {
            if(props.content==='home')setDefaultText(defaultTask);
            if(props.content==='projects')setDefaultText(defaultProject);
            if(props.content==='lists')setDefaultText(defaultList);
        }
        else setDefaultText('');
    },[output, props.content]);
    
    let overdue=[];
    let today=[];
    let tomorrow=[];
    let upcoming=[];
    function sortTasks() {
        overdue=[];
        today=[];
        tomorrow=[];
        upcoming=[];
        let sorted=[...props.tasks];
        if(sorted.length) {
            sorted.sort((a,b)=> {return new Date(a.dueDate) - new Date(b.dueDate);});
            let now=new Date();
            let tomorrowdate=new Date();
            let yesterdaydate=new Date();
            tomorrowdate.setDate(now.getDate()+1);
            yesterdaydate.setDate(now.getDate()-1);
            sorted.forEach(x=> {        
                let compDate= new Date(x.dueDate);
                //calculate overdue
                if(compDate<=yesterdaydate)overdue.push(x);
                //calculate today
                else if(compDate.getDate()===now.getDate() && compDate.getMonth()===now.getMonth() && compDate.getFullYear() && now.getFullYear())today.push(x);
                //calculate tomorrow        
                else if(compDate.getDate()===tomorrowdate.getDate() && compDate.getMonth()===tomorrowdate.getMonth() && compDate.getFullYear() && tomorrowdate.getFullYear())tomorrow.push(x);
                else upcoming.push(x);
            });
        }
        
    }

    useEffect(()=>{
        if(props.content==='home') {
            let tempoutput=[];
            
            sortTasks();
            if(overdue.length) {
                tempoutput.push((<div key='overdue' className="todaytxt categorytxt">Overdue</div>));
                overdue.forEach(x=>tempoutput.push((<Task deleteTask={props.deleteTask} getProjects={props.getProjects} createProject={props.createProject} projects={props.projects} task={x} key={x.id} setStickyBD={props.setStickyBD} setEdit={props.setEdit} updateTask={props.updateTask}/>)));
            }
            if(today.length) {
                tempoutput.push((<div key='today' className="todaytxt categorytxt">Today</div>));
                today.forEach(x=>tempoutput.push((<Task deleteTask={props.deleteTask} getProjects={props.getProjects} createProject={props.createProject} projects={props.projects} task={x} key={x.id} setStickyBD={props.setStickyBD} setEdit={props.setEdit} updateTask={props.updateTask}/>)));
            }
            if(tomorrow.length) {
                tempoutput.push((<div key='tomorrow' className="todaytxt categorytxt">Tomorrow</div>));
                tomorrow.forEach(x=>tempoutput.push((<Task deleteTask={props.deleteTask} getProjects={props.getProjects} createProject={props.createProject} projects={props.projects} task={x} key={x.id} setStickyBD={props.setStickyBD} setEdit={props.setEdit} updateTask={props.updateTask}/>)));
            }
            if(upcoming.length) {
                tempoutput.push((<div key='upcoming' className="todaytxt categorytxt">Upcoming</div>));
                upcoming.forEach(x=>tempoutput.push((<Task deleteTask={props.deleteTask} getProjects={props.getProjects} createProject={props.createProject} projects={props.projects} task={x} key={x.id} setStickyBD={props.setStickyBD} setEdit={props.setEdit} updateTask={props.updateTask}/>)));
            }

            setOutput(tempoutput);
        }
        else if(props.content==='projects') {
            let tempoutput=[];
            const curProjects=props.projects;
            if(curProjects)curProjects.forEach(x=>tempoutput.push((<Project deleteProject={props.deleteProject} tasks={props.tasks} project={x} key={x.id} setStickyBD={props.setStickyBD} setEdit={props.setEdit} updateProject={props.updateProject}/>)));
            setOutput(tempoutput);
        }
        else if(props.content==='lists') {
            let tempoutput=[];
            const curList=props.lists;
            if(curList)curList.forEach(x=>tempoutput.push((<List updateList={props.updateList} deleteList={props.deleteList} list={x} key={x.id} setStickyBD={props.setStickyBD} setEdit={props.setEdit} />)));
            setOutput(tempoutput);
        }
    },[props.content, props.tasks, props.projects, props.lists]);    

    return (
        <div className='maincontent'>
            {output}
            {defaultText}
        </div>
    )
}

export default MainContent