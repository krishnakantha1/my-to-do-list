import React, { createContext, useState } from "react";

import styles from "./App.module.css";

import DisplayList from "./Components/DisplayList"
import AddNewItem from "./Components/AddNewItem"
import axios from "axios";

export var host = "http://localhost:8080/"

export const DataUseAndManipulateContext = createContext()

const App = ()=>{

    const DataUseAndManipulateContext = createContext()

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

        categories.splice(i,1)
        setCategories([...categories])
    }

    
    return(
        <div className={styles.wholeContainer}>
            <div className={styles.container}>
            <DataUseAndManipulateContext.Provider value={{
                categories,
                setCategories,
                todolist,
                setTodolist
                }}>
                <AddNewItem 
                    setTodolist = {setTodolist} 
                    categories={categories} 
                    setCategories={setCategories} 
                    deleteCategory={deleteCategory}/>
                <DisplayList todolist = {todolist}/>
            </DataUseAndManipulateContext.Provider>
            </div>
        </div>
    )
}

export default App; 