import React, { useEffect, useRef} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, storage } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useState } from "react";


export function TodoForm({ addTodo }) {
    const [newItem, setNewItem] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const inputFile = useRef(null);
    
    const signOutAccount = () => {
        logout();
        navigate("/");
      }
      
    
      const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };
      useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
      }, [user, loading]);

    function handleSubmit(e) {
        e.preventDefault();
        if (newItem === "") return;
        
        addTodo(newItem);
        setNewItem("");
    }


    return (
        <div>
            <form className="new-item-form">
                <div className="form-row">
                    <label htmlFor="item" className="font-mono text-lg font-semibold text-center">Finish Your Tasks!</label>
                        <input
                        type="text"
                        id="item"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        />
                </div>
            <button className="btn" onClick={handleSubmit}>
                Add New Task
            </button>
            <div className="flex justify-center">
              <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-40 py-1 rounded cursor-pointer focus:outline-none"
              onClick={signOutAccount}
              >
                Logout
              </button>
            </div>



      
            
        </form>
        </div>
    );
}
 