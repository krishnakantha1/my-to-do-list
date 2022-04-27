import React from "react"

import styles from "./CSS/BatchItems.module.css";

const BatchItems = ({item,removeItemFromBatch,index})=>{

    const removeItem = ()=>{
        removeItemFromBatch(index)
    }   

    return(
        <div className={styles.container}>
            <p className={styles.text}>{item}</p>
            <button type="button" onClick={removeItem} className={styles.removeBtn} > X</button>
        </div>
    )
}

export default BatchItems;