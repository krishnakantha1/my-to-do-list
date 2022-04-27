import axios from "axios";
import React from "react";

import styles from "./CSS/Category.module.css"

var host = "http://localhost:8080/"

const Category = ({category,selectedCategory,setSelectedCategory,setDrop,deleteCategory})=>{



    const handleCantegoryChange= ()=>{
        setSelectedCategory(category)
        setDrop((prev)=>(!prev))
    }

    const handleCategoryDelete = async (e)=> {
        e.stopPropagation()
        
        var rep = await axios({
            url:`${host}remove-category`,
            method:"DELETE",
            data:{
                "category":category
            }
        })

        const {data:{error,count,message}} = rep

        if(error){
            console.log(message)
        }else{
            console.log(count,"list item are deleted")

            if(selectedCategory===category){
                setSelectedCategory("DEFAULT")
            }

            deleteCategory(category)

        }
    }

    return(
        <div className={`${styles.container} ${selectedCategory===category?styles.selectedCategory:""}`} onClick={handleCantegoryChange}>
            <p>{category}</p>
            {category!=="DEFAULT" && (<button type="button" onClick={handleCategoryDelete}>✖</button>)}
        </div>
    )
}

export default Category