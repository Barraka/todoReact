import { useEffect, useState } from 'react'
import './styles/styles.css'
import './styles/addtask.css'
import {db} from './firebaseConnect';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import person from './assets/person.png'
import Login from './Components/Login';
import Backdrop from './Components/Backdrop';
import AddItems from './Components/AddItems';
import MainContent from './Components/MainContent';

function App(props) {
    const [output2, setOutput2] = useState([]);
    const [profilePic, setProfilePic] = useState(undefined);
    const [currentStatus, setCurrentStatus] = useState(0);
    const [loginComponent, setLoginComponent] = useState(0);
    const [visibility, setVisibility] = useState(0);
    const [tasks, setTasks] = useState('');
    const [projects, setProjects] = useState('');
    const [lists, setLists] = useState('');
    const [content, setContent] = useState('home');

    useEffect(()=> {
        getTasks();
        getProjects();
        getLists();
    }, [currentStatus]);

    function toggleVisbility() {
        if(visibility===0)setVisibility(1);
        else setVisibility(0);
    }

    function changeLoginComponent() {
        if(loginComponent===0)setLoginComponent(1);
        if(loginComponent===1)setLoginComponent(0);
    }   
    function logOut() {
        if(getAuth().currentUser) {
            signOut(getAuth());
            setProfilePic(undefined);
            setCurrentStatus(0);
            setTasks('');
        }
    }
    async function logIn() {
        var provider = new GoogleAuthProvider(); 
        provider.setCustomParameters({
            prompt: "select_account"
          });       
        await signInWithPopup(getAuth(), provider);     
        setProfilePic(getAuth().currentUser.photoURL);
        setCurrentStatus(getAuth());
    }

    async function deleteList(o) {
        const val=getAuth().currentUser.email;
        const docRef=doc(db,val, 'lists', 'lists', o.id);
        await deleteDoc(docRef);
        getLists();
    }

    async function deleteTask(o) {
        const val=getAuth().currentUser.email;
        const docRef=doc(db,val, 'tasks', 'tasks', o.id);
        await deleteDoc(docRef);
        getTasks();
        console.log('deleted task');
    }

    async function deleteProject(o) {
        const val=getAuth().currentUser.email;
        const docRef=doc(db,val, 'projects', 'projects', o.id);
        await deleteDoc(docRef);
        getProjects();
    }

    async function createProject(o) {
        const tempCol=collection(db, getAuth().currentUser.email, 'projects', 'projects');        
        const projects = await addDoc(tempCol, o);
        getProjects();
        return projects.id;
    }

    async function createTask(o) {
        const tempCol=collection(db, getAuth().currentUser.email, 'tasks', 'tasks');        
        const projects = await addDoc(tempCol, o);
        getTasks();
    }

    async function createList(o) {
        const tempCol=collection(db, getAuth().currentUser.email, 'lists', 'lists');        
        const cList = await addDoc(tempCol, o);
        getLists();
        return cList.id;
    }
    async function getProjects() {
        if(!currentStatus)return;
        const tempCol=collection(db, getAuth().currentUser.email, 'projects', 'projects');  
        const data = await getDocs(tempCol);
        let tempData=[];
        data.docs.forEach(x=>tempData.push({...x.data(), id:x.id}));
        setProjects(prev=>tempData);
        return tempData;
    }
    async function getTasks() {
        if(!currentStatus)return;
        const tempCol=collection(db, getAuth().currentUser.email, 'tasks', 'tasks');        
        const data = await getDocs(tempCol);
        let tempData=[];
        data.docs.forEach(x=>tempData.push({...x.data(), id:x.id}));
        setTasks(prev=>tempData);
        console.log('tasks:', tempData);
    }   
    async function getLists() {
        if(!currentStatus)return;
        const tempCol=collection(db, getAuth().currentUser.email, 'lists', 'lists');        
        const data = await getDocs(tempCol);
        let tempData=[];
        data.docs.forEach(x=>tempData.push({...x.data(), id:x.id}));
        setLists(prev=>tempData);
    }

    function updateProject(o) {
        const val=getAuth().currentUser.email;
        const docRef=doc(db,val, 'projects', 'projects', o.id);
        updateDoc(docRef, o)
        .then(setProjects(prev=>{
            let temp=[...prev];
            const index=temp.findIndex(x=>x.id===o.id)
            temp[index]=o;
            return temp;
        }))
        .catch(e=>console.error(e));
        //Update corresponding tasks:
        let temp=[...tasks];
        temp.forEach(x=> {
            if(x.projectid===o.id)x.project=o.title;
        });
        setTasks(temp);
    }
    function updateTask(o) {
        const val=getAuth().currentUser.email;
        const docRef=doc(db,val, 'tasks', 'tasks', o.id);
        updateDoc(docRef, o)
        .then(setTasks(prev=>{
            let temp=[...prev];
            const index=temp.findIndex(x=>x.id===o.id)
            temp[index]=o;
            return temp;
        }))
        .catch(e=>console.error(e));
    }
    function updateList(o) {
        const val=getAuth().currentUser.email;
        const docRef=doc(db,val, 'lists', 'lists', o.id);
        updateDoc(docRef, o)
        .then(setLists(prev=>{
            let temp=[...prev];
            const index=temp.findIndex(x=>x.id===o.id)
            temp[index]=o;
            return temp;
        }))
        .catch(e=>console.error(e));
    }

  return (
    <div className="App">
        <Backdrop loginComponent={loginComponent} setLoginComponent={changeLoginComponent}/>
        {visibility===1? <AddItems getProjects={getProjects} projects={projects} tasks={tasks} visibility={visibility} toggleVisbility={toggleVisbility} createTask={createTask} currentStatus={currentStatus} createProject={createProject} createList={createList} deleteList={deleteList} updateList={updateList} lists={lists}/>: null}

        <div className='container'>
            <div className='header'>
                <div className='userDiv' onClick={()=>changeLoginComponent()}>
                    <img referrerPolicy="no-referrer" src={profilePic || person} alt="avatar" />
                    <Login currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} login={logIn} logout={logOut} loginComponent={loginComponent} setLoginComponent={changeLoginComponent}/>
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
            <MainContent deleteTask={deleteTask} deleteProject={deleteProject} getProjects={getProjects} content={content} tasks={tasks} currentStatus={currentStatus} updateTask={updateTask} projects={projects} createProject={createProject} updateProject={updateProject} createList={createList} deleteList={deleteList} updateList={updateList} lists={lists}/>
        </div>
    </div>
  )
}

export default App
