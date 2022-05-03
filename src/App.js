import React, { createContext, useState } from "react";

import styles from "./App.module.css";

import DisplayList from "./Components/DisplayList"
import AddNewItem from "./Components/AddNewItem"
import axios from "axios";

export var host = "https://my-all-todo-list.herokuapp.com/"

export const DataUseAndManipulateContext = createContext()

const App = ()=>{

    const [categories,setCategories] = useState([])
    const [todolist,setTodolist] = useState({})

    useState(async ()=>{
        var res = await axios({
            url:host,
            method :"GET"
        })

        const {categories,itembatch} = res.data
        setCategories(categories)
        setTodolist(itembatch)
    },[])


    const deleteCategory = (toBeDeletedCategory)=>{
        var i = categories.findIndex((c)=>{
            return c===toBeDeletedCategory
        })

        setTodolist((prev)=>{
            delete prev[toBeDeletedCategory]
            return {...prev}
        })

        categories.splice(i,1)
        setCategories([...categories])
    }

    const modifyToDoLists = (category,newTodoList) => {
        if(Object.keys(newTodoList).length===0){
            delete todolist[category]
            setTodolist({...todolist})
            return
        }

        setTodolist((prev)=>(
            {...prev,...newTodoList}
        ))
    }

    
    return(
        <div className={styles.wholeContainer}>
            <div className={styles.container}>
            <DataUseAndManipulateContext.Provider value={{
                categories,
                setCategories,
                todolist,
                setTodolist,
                deleteCategory,
                modifyToDoLists
                }}>
                <AddNewItem />
                <DisplayList todolist = {todolist}/>
            </DataUseAndManipulateContext.Provider>
            </div>
        </div>
    )
}

export default App; 