import React, { useContext, useState } from "react";

import styles from "./CSS/Item.module.css";
import {DataUseAndManipulateContext,host} from "../App"
import axios from "axios";

//Individual item on the to do list
const Item = ({item,category}) => {
    const {modifyToDoLists} = useContext(DataUseAndManipulateContext)

    const [loading,setLoading] = useState(false)

    const handleComplete = async (e)=>{
        setLoading(prev => !prev)

        var res = await axios({
            url:`${host}item-toggle-done`,
            method:"PUT",
            data:{
                category:category,
                line_item:item.name
            }
        })

        const { data } = res

        if(data){
            setLoading(prev => !prev)
            modifyToDoLists(category,data)
        }else{
            setLoading(prev => !prev)
            console.log(data,"error")
        }
    }

    const handleDelete = async (e)=>{
        setLoading(prev => !prev)

        var res = await axios({
            url:`${host}item-delete`,
            method:"DELETE",
            data:{
                category:category,
                line_item:item.name
            }
        })

        const { data } = res

        if(data){
            setLoading(prev => !prev)
            modifyToDoLists(category,data)
        }else{
            setLoading(prev => !prev)
            console.log(data,"error")
        }
    }
    
    return (
        <div className={`${styles.container} ${loading?styles.loading:""}`}>
            <p className={`${item.complete?styles.cut:""}`}>{item.name}</p>
            <button type="button" onClick={handleComplete}>C</button>
            <button type="button" onClick={handleDelete}>D</button>
        </div>
    )
}

export default Item;