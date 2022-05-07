import axios from "axios"
import React,{ useContext, useRef,useState } from "react"
import BatchItems from "./BatchItems"
import CategoryDropDown from "./CategoryDropDown"

import styles from "./CSS/AddNewItem.module.css"
import {DataUseAndManipulateContext,host} from "../App"


const AddNewItem = ()=>{

    const {setTodolist} = useContext(DataUseAndManipulateContext)
    
    const [newTodoitem,setTD] = useState("")

    const [selectedCategory,setSelectedCategory] = useState("DEFAULT")

    const [batch,setBatch] = useState([])

    const [textAreaOnFocus,setTAOF] = useState(false)

    const inputRef = useRef()

    const focused = ()=>{
        setTAOF(true)
    }

    const unFocused = ()=>{
        setTAOF(false)
    }

    const handleChange = (e) =>{
        setTD(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(newTodoitem!==""){
            addItemToBatch();
            return
        }

        if(batch.length===0){
            return
        }
        

        var res = await axios({
            url:`${host}add-to-do-items`,
            method:"POST",
            data:{
                category:selectedCategory,
                items:batch
            }
        })

        const {data} = res


        if(data.error){
            //error
            console.log(data.message)
        }else{
            //proper
            setTodolist((prev)=>(
                {...prev,...data}
            ))
            setBatch([])
        }
    }

    const handleEnterPressSubmit = (e) => {
        if(e.key==="Enter"){
            e.preventDefault()
            addItemToBatch()
        }
    }

    const addItemToBatch = ()=>{
        if(newTodoitem==="") return

        setTD("")
        setBatch((prev)=>(
            [...prev,newTodoitem]
        ))
        
    }

    const removeItemFromBatch = (index) => {
        
        setBatch(prev=>{
            var arr = [...prev]

            arr.splice(index,1)

            return arr
        })
    }

    const focusOnInputField = (e)=>{
        inputRef.current.focus()
    }


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit} onKeyDown={handleEnterPressSubmit}>
                <label htmlFor="tag">Select A Category For The Items </label>
                <CategoryDropDown 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory}/>

                <div className={`${styles.tempOuterBoundery} ${textAreaOnFocus?styles.textAreaBoundy:""}`} 
                    onClick={focusOnInputField} 
                    onFocus={focused} 
                    onBlur={unFocused}>
                    <div className={styles.batchContainer} >
                        {batch.map((item,i)=>{
                            return <BatchItems key={i} item={item} index={i} removeItemFromBatch={removeItemFromBatch}/>
                        })}
                        <span className={styles.inputSpan}>{newTodoitem}</span>
                        <input 
                            ref={inputRef} 
                            type="text" 
                            value={newTodoitem} 
                            onChange={handleChange} 
                            name="todoitem"/>
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <button type="button" onClick={addItemToBatch}>Add</button>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        </div>
    )
}

export default AddNewItem