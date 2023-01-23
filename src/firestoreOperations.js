import db from './firebaseConnect'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

function logOut() {
    if(getAuth().currentUser) {
        signOut(getAuth());        
    }
}
async function logIn() {
    var provider = new GoogleAuthProvider(); 
    provider.setCustomParameters({
        prompt: "select_account"
      });       
    await signInWithPopup(getAuth(), provider);     
    const pic= getAuth().currentUser.photoURL;
    return {pic:pic, getAuth: getAuth()};
}

async function deleteList(o) {
    const val=getAuth().currentUser.email;
    const docRef=doc(db,val, 'lists', 'lists', o.id);
    await deleteDoc(docRef);
    const res= await getLists();
    return res;
}

async function deleteTask(o) {
    const val=getAuth().currentUser.email;
    const docRef=doc(db,val, 'tasks', 'tasks', o.id);
    await deleteDoc(docRef);
    const res= await getTasks();
    return res;
}

async function deleteProject(o) {
    const val=getAuth().currentUser.email;
    const docRef=doc(db,val, 'projects', 'projects', o.id);
    await deleteDoc(docRef);
    const result= getProjects();
    return result;
}

async function createProject(o) {
    const tempCol=collection(db, getAuth().currentUser.email, 'projects', 'projects');        
    const projects = await addDoc(tempCol, o);
    return projects.id;
}

async function createTask(o) {
    const tempCol=collection(db, getAuth().currentUser.email, 'tasks', 'tasks');        
    const newTask = await addDoc(tempCol, o);
    const res= await getTasks();
    return res;
}

async function createList(o) {
    const tempCol=collection(db, getAuth().currentUser.email, 'lists', 'lists');        
    const cList = await addDoc(tempCol, o);
    getLists();
    return cList.id;
}
async function getProjects() {
    if(!getAuth())return;
    const tempCol=collection(db, getAuth().currentUser.email, 'projects', 'projects');  
    const data = await getDocs(tempCol);
    let tempData=[];
    data.docs.forEach(x=>tempData.push({...x.data(), id:x.id}));
    return tempData;
}
async function getTasks() {
    if(!getAuth())return;
    const tempCol=collection(db, getAuth().currentUser.email, 'tasks', 'tasks');        
    const data = await getDocs(tempCol);
    let tempData=[];
    data.docs.forEach(x=>tempData.push({...x.data(), id:x.id}));
    return tempData;
}   
async function getLists() {
    if(!getAuth())return;
    const tempCol=collection(db, getAuth().currentUser.email, 'lists', 'lists');        
    const data = await getDocs(tempCol);
    let tempData=[];
    data.docs.forEach(x=>tempData.push({...x.data(), id:x.id}));
    return tempData;
}

async function updateProject(o) {
    const val=getAuth().currentUser.email;
    const docRef=doc(db,val, 'projects', 'projects', o.id);
    await updateDoc(docRef, o);
}
async function updateTask(o) {
    const val=getAuth().currentUser.email;
    const docRef=doc(db,val, 'tasks', 'tasks', o.id);
    await updateDoc(docRef, o);
}
async function updateList(o) {
    const val=getAuth().currentUser.email;
    const docRef=doc(db,val, 'lists', 'lists', o.id);
    await updateDoc(docRef, o);
}  
async function signUp(email, pwd) {
    const user = await createUserWithEmailAndPassword(getAuth(), email, pwd);
    return user.user;
}

async function signInEmail(email, pwd) {
    const user = await signInWithEmailAndPassword(getAuth(), email, pwd);
    console.log('in functions, result: ', user);
    return user.user;
}

export {logOut, logIn, deleteList, deleteProject, deleteTask, createList, createProject, createTask, updateList, updateProject, updateTask, getProjects, getTasks, getLists, signUp, signInEmail}