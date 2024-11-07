import React from 'react'
import './list.scss'
import Card from '../card/card'

const List = ({ posts }) => {
    return (
        <div className='list'>
            {posts.map(item => (
                <Card key={item.id} {...item} />
            ))}
        </div>
    )
}

export default List