'use client'
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineSwapRight } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { db } from '../firebase/config';

function DeleteList(props: any) {
    const [deleteList, setDeleteList] = useState(false);
    const onDelete = () => {
        setDeleteList(!deleteList)
    }
    const cancelDelete = () => {
        setDeleteList(!deleteList);
    }
    const submitDelete = () => {
        console.log(props.id);
        console.log(props.email);
        const docRef = doc(db, `${props.email}/${props.id}`);
        deleteDoc(docRef)
    }
    return (
        <>
            {!deleteList && <>
                <h1 className='font-bold'>{props.title}</h1>
                <MdDelete onClick={onDelete} className='hover:cursor-pointer text-xl text-red-500' />
            </>}
            {deleteList && <>
                <h1 className='font-bold'>{props.title}</h1>
                <div className='flex'>
                    <AiOutlineSwapRight onClick={submitDelete} className="text-xl -scale-y-100 hover:cursor-pointer text-green-600 rotate-[135deg]   mx-2" />
                    <AiOutlineClose onClick={cancelDelete} className="text-xl mx-2 hover:cursor-pointer" />
                </div>
            </>}
        </>
    )
}

export default DeleteList;