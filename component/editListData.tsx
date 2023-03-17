import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { AiFillEdit, AiOutlineSwapRight } from 'react-icons/ai'
import { db } from '../firebase/config';

function EditListData(props: any) {
    const [editListData, setEditListData] = useState(false)
    const editList = () => {
        setEditListData(!editListData);
    }
    const updateInputField = (e: any, id: any) => {
        console.log(e.target.value + id);
        const docRef = doc(db, `${props.email}/${props.parentId}/works/${id}`)
        updateDoc(docRef, {
            title: e.target.value.trim()
        })
    }
    return (
        <>
            {!editListData && <div className='mx-2 my-2 px-2 flex bg-white shadow-lg justify-between  py-1 rounded-sm'>
                <h1 className='w-11/12'>
                    {props.title}
                </h1>
                <AiFillEdit onClick={editList} className='text-xl hover:cursor-pointer' />
            </div>}
            {editListData && <div className='mx-2 flex justify-between my-2 bg-[rgba(255,254,254,255)]  py-1 rounded-sm'>
                <textarea rows={5} onChange={(event) => updateInputField(event, props.id)} className='w-11/12 outline-none px-2' defaultValue={props.title} />
                <AiOutlineSwapRight onClick={editList} className="text-xl -scale-y-100 hover:cursor-pointer text-green-600 rotate-[135deg]   mx-2" />
            </div>}
        </>
    )
}

export default EditListData