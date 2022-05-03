import React from "react"

import Item from "./Item"

const ItemList = ({todos,category}) => {
    return (
        <div>
            {todos.map((item,i)=>(
                <Item key={i} item = {item} category={category}/>
            ))}
        </div>
    )
}

export default ItemList