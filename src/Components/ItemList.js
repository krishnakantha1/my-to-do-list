import React from "react"

import Item from "./Item"

const ItemList = ({todos}) => {
    return (
        <div>
            {todos.map((item,i)=>(
                <Item key={i} item = {item}/>
            ))}
        </div>
    )
}

export default ItemList