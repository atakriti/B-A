import React, { useContext, useState } from 'react'
import { ImUserTie } from "react-icons/im"
import "./userChat.scss"
import {context} from "../Context"
import axios from 'axios'
import Header from '../Header/Header'
function UserChat() {
    let {signinValue,users} = useContext(context)
    let findSignedin = users.find(user => user.email === signinValue.email)
    console.log("🚀 ~ file: UserChat.jsx:8 ~ UserChat ~ findSignedin", findSignedin)
  // ==================================== Here is the full date ===========================
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let FullDate = year + "/" + month + "/" + day
    let FullTime = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds()
let result = FullDate + "–" + FullTime
    
  // ==================================== Here end the full date ===========================
   
    let [chatValue, setChatValue] = useState({
        text: "",
        from: "",
        timeStamp:result ,
        sender:""
    })
    

    let handleSubmitChat = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:4000/pushChat/${findSignedin._id}`, {...chatValue,from:findSignedin?._id,sender:findSignedin?.username})
        setChatValue({
            text: "",
            from: "",
            timeStamp:result,
            sender:""
        })
    }
  return (
      <div className='userChat'>
      <Header/>

          {/* ============== Left ============ */}
          <div className="left">
              <div className="chatWithChef">
                  <ImUserTie />
                  <h2>Chat with Admin</h2>
              </div>
          </div>
          {/* =================== right =========== */}
          <div className="right">
              <h1>Hello { findSignedin ? findSignedin.username : "Please sign in"}</h1>
              {/* ==================== chat =============== */}
              <div className="chatField">
                 {findSignedin?.chat.length === 0 && <h1>The chat is empty, no conversation</h1>}
                  {findSignedin?.chat.map(item => (
                          <span className={item.from === "639d98fe13b1053bdd4945fc" ? "leftText" : "rightText"}>
                          <h6>{item.from === "639d98fe13b1053bdd4945fc" ? "Admin" : findSignedin.username}</h6>
                          <p>{ item.text}</p>
                          <h5>{ item.timeStamp}</h5>
                          </span>
                          ))}
                  
              </div>
              {/* ===================== Form ================== */}
              <form onSubmit={handleSubmitChat}>
                  <input value={chatValue.text} onChange={(e)=>setChatValue({...chatValue,text:e.target.value})} placeholder='How can we help you ?' type="text" name="chatText" />
                  <button>Send</button>
              </form>
          </div>
    </div>
  )
}

export default UserChat