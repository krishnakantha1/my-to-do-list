import axios from "axios"
import React,{ useRef,useState } from "react"
import BatchItems from "./BatchItems"
import CategoryDropDown from "./CategoryDropDown"

import styles from "./CSS/AddNewItem.module.css"


var host = "http://localhost:8080/"


const AddNewItem = ({setTodolist,categories,setCategories,deleteCategory})=>{


    const [todoitem,setTD] = useState("")

    const [selectedCategory,setSelectedCategory] = useState("DEFAULT")

    const [batch,setBatch] = useState([])

    const inputRef = useRef()

    const handleChange = (e) =>{
        setTD(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(todoitem!==""){
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
        if(todoitem==="") return

        setTD("")
        setBatch((prev)=>(
            [...prev,todoitem]
        ))
    }

    const removeItemFromBatch = (index) => {
        setBatch(prev=>{
            prev.splice(index,1)
            return [...prev]
        })
    }

    const focusOnInputField = (e)=>{
        inputRef.current.focus()
    }

    const getSelectedCatrgory = (category) => {

    }


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit} onKeyDown={handleEnterPressSubmit}>
                <label htmlFor="tag">Select A Category For The Items </label>
                {/* <select value={taskDetails.tag}
                    onChange={handleChange}
                    name="tag"
                >
                    {categories.map((value,i)=>(
                        <option key={i}>{value}</option>
                    ))}
                </select> */}
                <CategoryDropDown 
                    categories={categories} 
                    setCategories={setCategories} 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory}
                    setTodolist={setTodolist}
                    deleteCategory={deleteCategory}/>
                <div className={styles.tempOuterBoundery} onClick={focusOnInputField}>
                    <div className={styles.batchContainer} >
                        {batch.map((item,i)=>{
                            return <BatchItems key={i} item={item} index={i} removeItemFromBatch={removeItemFromBatch}/>
                        })}
                        <span className={styles.inputSpan}>{todoitem}</span>
                        <input ref={inputRef} type="text" value={todoitem} onChange={handleChange} name="todoitem"/>
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