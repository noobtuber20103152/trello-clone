import React, { useState } from 'react'
import AddButton from './addButton'
import Card from './card'
import { db,  } from '../firebase/config'
import PopUp from './popUp';
import { addDoc, collection, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import Navbar from './navbar';
function MainPage(props: any) {
    const listInstance = collection(db, `${props.email}`);
    const q = query(listInstance);
    const [_snapshot, error, loading] = useCollection(q);
    const totalList = _snapshot?.docs?.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    console.log(totalList);
    const [popUp, setPopUp] = useState(false);
    const [title, setTitle] = useState("");
    const changeTitle = (e: any) => {
        console.log(title);
        setTitle(e.target.value)
    }
    const addList = () => {
        setPopUp(!popUp)
    }
    const close = () => {
        setPopUp(!popUp)
    }

    const createList = async () => {
        const listInstance = collection(db, `${props.email}`);
        await addDoc(listInstance, {
            title: title
        })
        setPopUp(!popUp);
    }
    return <>
        <Navbar addList={addList}/>
        <div className='flex   flex-wrap items-start '>
            {totalList?.map((e: any) => {
                return <>
                    <Card boardId={e.id} email={props.email} id={e.id} title={e.title} listData={e.works} />
                </>
            })}
            <AddButton addList={addList} />
        </div>
        {popUp && <PopUp createList={createList} changeTitle={changeTitle} close={close} />}
    </>
}

export default MainPage