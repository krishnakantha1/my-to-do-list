import React, { useState } from "react";

import styles from "./CSS/Item.module.css";

//Individual item on the to do list
const Item = ({item}) => {
    const [loading,setLoading] = useState(false)

    const handleComplete = (e)=>{
        
    }

    const handleDelete = (e)=>{

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