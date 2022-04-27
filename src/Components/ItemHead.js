import React,{ useState } from "react";
import ItemList from "./ItemList";

import styles from "./CSS/ItemHead.module.css"

const ItemHead = ({header,todos})=>{
    const [drop,setDrop] = useState(false)

    const handleDrop = ()=>{
        setDrop((prev) => !prev)
    }

    return(
        <div className={styles.container}>
            <div className={styles.header} onClick={()=> handleDrop()}> 
                <h1>{header}</h1>
                <button>{!drop && ("▼")}{drop && ("▲")}</button>
            </div>
            <div className={`${styles.listContainer} ${drop?styles.show:styles.hide}`}>
                <ItemList todos = {todos} display = {drop}/>
            </div>
        </div>
    )
}

export default ItemHead;