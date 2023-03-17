import React, { useState } from 'react'
import {  AiOutlinePlus } from "react-icons/ai"
import { addDoc, collection, doc, query, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/config';
import { AiOutlineClose } from "react-icons/ai";
import DeleteList from './delelteList';
import EditListData from './editListData';
function Card(props: any) {
    const [inputField, setInputField] = useState(false);
    const [newInputListData, setNewInputListData] = useState("");
    const [editListData, setEditListData] = useState(false);
    const dbInstance = collection(db, `${props.email}/${props.id}/works`);
    const q = query(dbInstance);
    const [_snapshot, error, loading] = useCollection(q);
    const allListData = _snapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    const addToCard = () => {
        setInputField(!inputField);
    }
    const inputFieldChange = (e: any) => {
        setNewInputListData(e.target.value);
    }
    const submitListData = () => {
        if (newInputListData.length == 0) return;
        const dbInstance = collection(db, `${props.email}/${props.id}/works`);
        addDoc(dbInstance, {
            title: newInputListData
        }).then((res) => {

        })
        setInputField(!inputField)
        setNewInputListData("");
    }
    const cancelListData = () => {
        setInputField(!inputField);
        setNewInputListData("");
    }
    const editList = () => {
        setEditListData(!editListData);
    }

    return <>
        <div className='w-4/12  hover:shadow-xl shadow-lg lg:w-2/12 mx-2 my-4 rounded-sm bg-[rgba(237,236,242,255)] '>
            <div className='mx-2 my-2 rounded-sm bg-[rgba(255,254,254,255)] px-3 py-2  flex justify-between'>
                <DeleteList email={props.email} id={props.id} title={props.title} />
            </div>
            {allListData?.map((e: any) => {
                return <>
                    <EditListData email={props.email} parentId={props.id} id={e.id} title={e.title} />
                </>
            })}
            {inputField &&
                <div className='mx-2 my-2 bg-[rgba(255,254,254,255)] px-1 py-1 rounded-sm'>
                    <input value={newInputListData} onChange={inputFieldChange} className='w-full px-2 border' />
                </div>}
            {!inputField && <div onClick={addToCard} className='mx-2 my-2 '>
                <div className='flex hover:cursor-pointer items-center'>
                    <AiOutlinePlus className="text-lg" />
                    <span className='mx-2'>Add a Card</span>
                </div>
            </div>}
            {inputField && <div className='mx-2 my-2 '>
                <div className='flex hover:cursor-pointer items-center'>
                    <AiOutlineClose onClick={cancelListData} className="text-lg" />
                    <span onClick={submitListData} className='mx-2'>Confirm</span>
                </div>
            </div>}
        </div>
    </>
}

export default Card