import React, { useEffect, useState } from 'react'

function List(props) {
    const [listObject, setListObject] = useState({});
    const [edit, setEdit] = useState('');
    const [nameClass, setnameClass] = useState('categoryOuter');
    useEffect(()=>{
        setListObject(
            {
                title: props.list.title,
                id:props.list.id,
                body: props.list.body
            }
        );
    },[props.list]); 
    useEffect(()=>{
        if(edit)setEdit(<div className='listEdit'>
        <input type='text' autoFocus value={listObject.title} onBlur={validate} onChange={e=>setListObject(prev=>({...prev, title: e.target.value}))}></input>
    </div>);
    },[listObject]);

    function validate() {
        props.updateList(listObject);
        setEdit('');
    }
    function toggleEdit() {
        setEdit(
            <div className='listEdit'>
                <input type='text' autoFocus value={listObject.title} onBlur={validate} onChange={e=>setListObject(prev=>({...prev, title: e.target.value}))}></input>
            </div>
        );  
    }
    function listDelete() {
        setnameClass('categoryOuter projectDelete');
        setTimeout(()=> {
            props.deleteList(listObject)
        }, 300);                
    }


    return (
        <div className={nameClass} data-id="1">
            {edit}
            <div className="projectAddOuter">
                <div className="projectTitle categorytxt">{listObject.title}</div>
                <div className="projectEditIcon" onClick={toggleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>
                </div>
                <div className="projectTrashIcon" onClick={listDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
                </div>
            </div>
            <textarea className="textArea" draggable="true" value={listObject.body} onBlur={validate} onChange={e=>setListObject(prev=>({...prev, body:e.target.value}))}></textarea>
        </div>
    )
}

export default List