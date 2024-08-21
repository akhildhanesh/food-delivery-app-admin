import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { API_URL } from '../../util/constants'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const List = () => {
    const [list, setList] = useState([])

    const fetchList = () => {
        axios.get(`${API_URL}/api/food/list`)
            .then(data => data.data.data)
            .then(setList)
            .catch(err => {
                console.error(err)
                toast.error('ERROR')
            })
    }

    const removeItem = id => {
        axios.post(`${API_URL}/api/food/remove`, { id })
            .then(() => {
                toast.success('item removed')
                fetchList()
            })
            .catch(err => {
                console.error(err)
                toast.error('Failed to remove the item. Please try again.')
        })
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
            <ToastContainer />
            <div className='list add flex-col'>
                <p>All Foods List</p>
                <div className="list-table">
                    <div className="list-table-format title">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b>Action</b>
                    </div>
                    {
                        list.map(item => {
                            return (
                                <div key={item._id} className='list-table-format'>
                                    <img src={`${API_URL}/images/${item.image}`} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.category}</p>
                                    <p>${item.price}</p>
                                    <p className='cursor' onClick={() => removeItem(item._id)}>X</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default List