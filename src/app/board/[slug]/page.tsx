"use client";
import React, { useState } from "react";
import Navbar from "../../../../component/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../firebase/config";
import { usePathname } from "next/navigation";
import { addDoc, collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
function Slug(props: any) {
  const pathname = usePathname();
  const [popUp, setPopUp] = useState(false);
  const [user] = useAuthState(auth);
  const [data, setData] = useState({ subject: "", image: "", desc: "" });
  const dbInstance = collection(
    db,
    `${user?.email}/${pathname.split("/")[2]}/board`
  );
  const q = query(dbInstance);
  const [_snapshot, error, loading] = useCollection(q);
  const allListData = _snapshot?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const onchange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const createPost = () => {
    console.log(data);
    const dbInstance = collection(
      db,
      `${user?.email}/${pathname.split("/")[2]}/board`
    );
    addDoc(dbInstance, data).then((res) => {
      setPopUp(!popUp);
    });
  };
  const changeModal = () => {
    console.log(popUp);
    setPopUp(!popUp);
  };
  return (
    <>
      {/* {pathname.split("/")[2]} */}
      {popUp && (
        <div className="w-full fixed flex items-center top-0 h-full  bg-gray-900 bg-opacity-25">
          <div className="relative w-full  h-full mx-auto max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <button
                onClick={changeModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-hide="authentication-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-bold ">Create a post</h3>
                <p className="mb-4 ">Write something for your post</p>
                <div className="space-y-6">
                  <div>
                    <input
                      onChange={onchange}
                      type="text"
                      name="subject"
                      id="email"
                      className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Enter your subject"
                      required
                    />
                    <input
                      onChange={onchange}
                      type="text"
                      name="image"
                      id="email"
                      className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Enter image link"
                      required
                    />
                    <textarea
                      onChange={onchange}
                      name="desc"
                      id="email"
                      className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="What's on your mind"
                      required
                    />
                  </div>
                  <button
                    onClick={createPost}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Navbar /> */}
      <div className=" h-screen bg-blue-50 flex-wrap py-10 px-10 ">
        <div className="flex items-start w-full justify-between">
          <h1 className="text-4xl font-bold">Your posts</h1>
          <button
            onClick={changeModal}
            className="px-5 py-2 rounded-lg bg-red-600 text-white text-xl font-bold"
          >
            Create new post
          </button>
        </div>
        <div className="my-10 flex flex-wrap">
          {allListData?.map((e: any) => {
            return (
              <>
                <div className="w-[300px] bg-white px-2 py-2 rounded-lg mr-4 ">
                  <h1 className="text-2xl font-bold">{e?.subject}</h1>
                  <img src={e.image} className="rounded-lg my-2" alt="" />
                  <p>{e.desc}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Slug;
