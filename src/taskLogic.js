import {db} from './firebaseConnect';
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { async } from '@firebase/util';

let projects=(function(){
    let projectList=[];
    let id=0;
    // console.log('database: ', db);
    // let existingData=JSON.parse(localStorage.getItem('myprojects'));

    async function getData() {
        if(getAuth().currentUser) {
            const tempCol=collection(db, getAuth().currentUser.email, 'projects', 'projects');        
            const data = await getDocs(tempCol);
            console.log('data docs: ', data.docs);
            //data.docs ==> gives an array of all projects
            projectList=[];
            data.docs.forEach(x=>projectList.push(x.data()));
            console.log('projectlist: ', projectList);
        }
        else console.log('You are not signed in.');
    }
    
    async function createProject(s) {
        const tempCol=collection(db, getAuth().currentUser.email, 'projects', 'projects');        
        const thisProject = await addDoc(tempCol, {name: s});
        //set the id of the new item
        await setDoc(doc(db, getAuth().currentUser.email, 'projects', 'projects', thisProject.id), {
            id: thisProject.id
        }, {merge: true});
    }
    async function updateProject(o) {
        const tempCol=collection(db, getAuth().currentUser.email, 'projects', 'projects');  
        await setDoc(doc(db, getAuth().currentUser.email, 'projects', 'projects', o.id), {
            ...o
        });
    }

    // const answer=data.docs[0]._document.data.value.mapValue.fields
    // window.docs=data.docs;
    // output2=(data.docs.map(d=>(<div>{...d.docs.data()}</div>)));
    // setOutput2(data.docs.map(d=>(<div className='projects' key={d.id}>{d.data().name}</div>)));
    // console.log('output2: ',output2);


    // if(existingData){
    //     projectList=existingData;
    //     console.log(projectList);
    //     for(let i=projectList.length-1;i>=0;i--) {
    //         if(projectList[i].id>id)id=projectList[i].id;
    //     }
    // } else {
    //     addProject('Important Project');
    // }
    function addProject(s) {
        projectList.push({id:id,name:s});
        localStorage.setItem('myprojects',JSON.stringify(projectList));
        return id;
    }
    function getProject() {
        console.log('projectlist: ', projectList);
        return projectList;
    }
    function deleteProject(s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].name===s)projectList.splice(x,1);
        }
        localStorage.setItem('myprojects',JSON.stringify(projectList));
    }
    function getProjectName(s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].id===parseInt(s))return projectList[x].name;
        }
        return '';
    }
    function updateProjectName(id,s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].id===parseInt(id))projectList[x].name=s;
        }
        localStorage.setItem('myprojects',JSON.stringify(projectList));
    }
    // -----
    return {
        addProject,
        getProject,
        deleteProject,
        getProjectName,
        updateProjectName,
        getData,
        createProject,
        updateProject,
    }
})();

export {projects}