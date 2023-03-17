import { db, auth, provider } from "../firebase/config";

import { useAuthState } from "react-firebase-hooks/auth"
import { addDoc, collection } from "firebase/firestore";
// import { async } from "@firebase/util";
const [user] = useAuthState(auth)

const createListCollection = collection(db, user.email);
export default async function createCollectionWithData (title){
    await addDoc(createListCollection, {
        title: title
    })
}