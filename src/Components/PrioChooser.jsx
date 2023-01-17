import React, { useEffect, useState } from 'react'

function PrioChooser(props) {
    const [prioText, setPrioText] = useState('');
    const [class1, setClass1] = useState('prioitem prio1');
    const [class2, setClass2] = useState('prioitem prio2');
    const [class3, setClass3] = useState('prioitem prio3'); 

    useEffect(()=>{
        //Set the class names if prio already set on load
        const cTask=props.formInfo.priority;
        cTask==='1' ? setClass1('prioitem prio1 prioactive') : cTask==='2' ? setClass2('prioitem prio2 prioactive') : cTask==='3' ? setClass3('prioitem prio3 prioactive') : null;
        //Set text name for same reason
        const value=props.formInfo.priority==='1'? 'Low' : props.formInfo.priority==='2' ? 'Medium' : props.formInfo.priority==='3' ? 'High' : ''
        setPrioText(value);
    },[props.formInfo]);


    function togglePrio(e) {       
        if(e.currentTarget.classList.contains('prioactive')) {
            if(e.currentTarget.classList.contains('prio1'))setClass1('prioitem prio1');
            else if(e.currentTarget.classList.contains('prio2'))setClass2('prioitem prio2');
            else if(e.currentTarget.classList.contains('prio3'))setClass3('prioitem prio3');       
            props.setFormInfo(prev=>{return{...prev, priority:'0'}});
            setPrioText('');
        } else {
            if(e.currentTarget.classList.contains('prio1')) {
                setClass1('prioitem prio1 prioactive');
                setClass2('prioitem prio2');
                setClass3('prioitem prio3');
                props.setFormInfo(prev=>{return{...prev, priority:'1'}});
                setPrioText('Low');
            }
            else if(e.currentTarget.classList.contains('prio2')) {
                setClass1('prioitem prio1');
                setClass2('prioitem prio2 prioactive');
                setClass3('prioitem prio3');
                props.setFormInfo(prev=>{return{...prev, priority:'2'}});
                setPrioText('Medium');
            }
            else if(e.currentTarget.classList.contains('prio3')) {
                setClass1('prioitem prio1');
                setClass2('prioitem prio2');
                setClass3('prioitem prio3 prioactive');
                props.setFormInfo(prev=>{return{...prev, priority:'3'}});
                setPrioText('High');
            }            
        }
    }

    return (
        <div className="formouter">
            <label className="formlabel">Set priority:</label>
            <div className="priohint">{prioText}</div>
            <div className="priorityinput">
                <div className={class1} data-prio="1" onClick={togglePrio}></div>
                <div className={class2} data-prio="2" onClick={togglePrio}></div>
                <div className={class3} data-prio="3" onClick={togglePrio}></div>
            </div>
        </div>
    )
}

export default PrioChooser