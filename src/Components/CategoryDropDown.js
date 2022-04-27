import axios from "axios";
import React, { useState } from "react";
import Category from "./Category";

import styles from "./CSS/CategoryDropDown.module.css"


var host = "http://localhost:8080/"


const CategoryDropDown = ({categories,setCategories,selectedCategory,setSelectedCategory,setTodolist,deleteCategory}) => {

    const [drop,setDrop] = useState(false)

    const [newCategory,setNewCategory] = useState("")

    const handleDrop = ()=>{
        setDrop((prev)=>(!prev))
    }

    const handleTextChange = (e)=>{
        setNewCategory(e.target.value)
    }

    const requestToAddCategory = async (e)=>{
        if(newCategory.length==0){
            return
        }

        var res = await axios({
            url:`${host}add-category`,
            method:"POST",
            data:{
                category:newCategory
            }
        })

        const {data:{error,message}} = res

        if(error){
            setNewCategory("")
            console.log(message)
        }else{
            setCategories((prev)=>(
                [...prev,newCategory.toUpperCase()]
            ))
            setNewCategory("")
        }
    }

     return (
         <div className={styles.container}>
             <div className={styles.display} onClick={handleDrop}>
                <p>{selectedCategory}</p>
                <button type="button">{!drop && ("▼")}{drop && ("▲")}</button>
             </div>
             <div className={`${styles.list} ${drop?styles.visible:""}`}>
                {categories.map((cat,i)=>(
                        <Category 
                            category={cat} 
                            key={i} 
                            setSelectedCategory={setSelectedCategory} 
                            selectedCategory={selectedCategory}
                            setDrop={setDrop}
                            setTodolist={setTodolist}
                            deleteCategory={deleteCategory}/>
                    ))}
                <div className={styles.add}>
                    <input type="text" placeholder="Add New Category" value={newCategory} onChange={handleTextChange}/>
                    <button type="button" onClick={requestToAddCategory}>+</button>
                </div>
             </div>
         </div>
     )
}

export default CategoryDropDown