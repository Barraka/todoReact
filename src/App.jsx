import { useEffect, useState } from 'react'
import './styles/styles.css'
import './styles/addtask.css'

import person from './assets/person.png'
import Login from './Components/Login';
import Backdrop from './Components/Backdrop';
import AddItems from './Components/AddItems';
import MainContent from './Components/MainContent';
import { logIn, logOut, createList, createProject, createTask, updateList, updateProject, updateTask, deleteList, deleteProject, deleteTask, getProjects, getTasks, getLists, signUp, signInEmail } from './firestoreOperations';
import Signup from './Components/Signup';
import Signin from './Components/Signin';

function App(props) {
    const [profilePic, setProfilePic] = useState(undefined);
    const [currentStatus, setCurrentStatus] = useState(0);
    const [loginComponent, setLoginComponent] = useState(false);
    const [visibility, setVisibility] = useState(0);
    const [tasks, setTasks] = useState('');
    const [projects, setProjects] = useState('');
    const [lists, setLists] = useState('');
    const [content, setContent] = useState('home');
    const [signup, setSignup] = useState(false);
    const [signin, setSignin] = useState(false);
    const [backdrop, setBackdrop] = useState(false);


    useEffect(()=> {
        if(currentStatus) {
            window.currentStatus=currentStatus;
            const fetchData = async () => {
                const taskData=await getTasks();
                const projectData=await getProjects();
                const listData=await getLists();
                setTasks(taskData);
                setProjects(projectData);
                setLists(listData);
            }
            fetchData()
            .catch(console.error);
        }
    }, [currentStatus]);

    useEffect(()=>{

    },[loginComponent]);

    function toggleBackdrop() {
        if(backdrop)setBackdrop(false);
        else setBackdrop(true);
    }

    function toggleVisbility() {
        if(visibility===0)setVisibility(1);
        else setVisibility(0);
    }

    function toggleLogin() {
        if(loginComponent===false) {
            setLoginComponent(true);
            setBackdrop(true);
        }
        else {
            setLoginComponent(false);
            setBackdrop(false);
        }
    }   
   

  return (
    <div className="App">
        {backdrop ? <Backdrop toggleBackdrop={toggleBackdrop} setLoginComponent={setLoginComponent}/>: null}
        
        {visibility===1? <AddItems logIn={logIn} logOut={logOut} createList={createList} createTask={createTask} createProject={createProject} updateList={updateList} updateProject={updateProject} updateTask={updateTask} deleteList={deleteList} deleteProject={deleteProject} deleteTask={deleteTask} getLists={getLists}  getProjects={getProjects} getTasks={getTasks} profilePic={profilePic} setProfilePic={setProfilePic} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} loginComponent={loginComponent} toggleLogin={toggleLogin} visibility={visibility} setVisibility={setVisibility} tasks={tasks} setTasks={setTasks} projects={projects}  setProjects={setProjects} lists={lists} setLists={setLists} content={content} setContent={setContent} toggleVisbility={toggleVisbility} />: null}

        <div className='container'>
            <div className='header'>
                <div className='userDiv' onClick={toggleLogin}>
                    <img referrerPolicy="no-referrer" src={profilePic || person} alt="avatar" />
                    {loginComponent ? <Login setSignin={setSignin} setSignup={setSignup} logIn={logIn} logOut={logOut} createList={createList} createTask={createTask} createProject={createProject} updateList={updateList} updateProject={updateProject} updateTask={updateTask} deleteList={deleteList} deleteProject={deleteProject} deleteTask={deleteTask} getLists={getLists}  getProjects={getProjects} getTasks={getTasks} profilePic={profilePic} setProfilePic={setProfilePic} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} loginComponent={loginComponent} toggleLogin={toggleLogin} visibility={visibility} setVisibility={setVisibility} tasks={tasks} setTasks={setTasks} projects={projects}  setProjects={setProjects} lists={lists} setLists={setLists} content={content} setContent={setContent} toggleVisbility={toggleVisbility} /> : null}
                </div>

                <div className='title'>MyDo-List</div>
                <div className='rightaccess'>
                    <div className='adddiv' id='adddiv' onClick={toggleVisbility} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"/></svg>
                    </div>
                </div>
            </div>
            <div className='links'>
                <div className='home link' onClick={()=>setContent('home')}>Home</div>
                <div className='projects link' onClick={()=>setContent('projects')}>Projects</div>
                <div className='lists link' onClick={()=>setContent('lists')}>Lists</div>
            </div>
            {signup ? <>
                <Signup setCurrentStatus={setCurrentStatus} setSignup={setSignup} signUp={signUp}/>
            </> : null}
            {signin ? <Signin setProfilePic={setProfilePic} setCurrentStatus={setCurrentStatus} setSignin={setSignin} signInEmail={signInEmail}/> : null}
            <MainContent logIn={logIn} logOut={logOut} createList={createList} createTask={createTask} createProject={createProject} updateList={updateList} updateProject={updateProject} updateTask={updateTask} deleteList={deleteList} deleteProject={deleteProject} deleteTask={deleteTask} getLists={getLists}  getProjects={getProjects} getTasks={getTasks} profilePic={profilePic} setProfilePic={setProfilePic} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} loginComponent={loginComponent} toggleLogin={toggleLogin} visibility={visibility} setVisibility={setVisibility} tasks={tasks} setTasks={setTasks} projects={projects}  setProjects={setProjects} lists={lists} setLists={setLists} content={content} setContent={setContent} toggleVisbility={toggleVisbility} />
        </div>
    </div>
  )
}

export default App
