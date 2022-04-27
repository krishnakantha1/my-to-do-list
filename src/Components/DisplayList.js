import React from "react"

import ItemHead from "./ItemHead"

import styles from "./CSS/DisplayList.module.css"

const DisplayList = ({todolist})=>{
    return (
        <div className={styles.container}>
            <h1>List</h1>
            {Object.keys(todolist).map(key =>
                (<ItemHead key={key} header = {key} todos = {todolist[key]}/>)
            )}
        </div> 
    )
}

export default DisplayList