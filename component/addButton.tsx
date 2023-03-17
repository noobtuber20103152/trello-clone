import React from 'react'
import SignOut from './signOut';

function AddButton(props: any) {
    const addList = props.addList;
    return (
        <>
            <div onClick={addList} className=' hover:cursor-pointer  lg:w-2/12 my-4 rounded-sm  mx-2 '>
                <div className='px-2 bg-[rgba(69,137,183,255)] py-2'>
                    <span className='text-white  font-semibold'>Add another list</span>
                </div>
                <SignOut />
            </div>

        </>
    )
}

export default AddButton