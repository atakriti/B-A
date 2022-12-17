import React, { useContext, useState } from 'react'
import { RiAdminFill } from "react-icons/ri"
import { HiOutlineUsers } from "react-icons/hi"
import { AiFillWechat,AiFillFolderOpen } from "react-icons/ai"
import { GiHotMeal } from "react-icons/gi"
import { BsFillCalendarDateFill } from "react-icons/bs"
import {MdUpdate,MdOutlinePreview} from "react-icons/md"
import "./admin.scss"
import { context } from '../Context'
import axios from 'axios'
function Admin() {
  let {signinValue,users} = useContext(context)
  let [switchSections, setSwitchSections] = useState(1)
  let [colorSelectedUser,setColorSelectedUser] = useState(false)
  let [selectedUserToChat,setSelectedUserToChat] = useState()
  console.log("🚀 ~ file: Admin.jsx:15 ~ Admin ~ selectedUserToChat", selectedUserToChat)
  // ==================================== Here is the full date ===========================
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let FullDate = year + "/" + month + "/" + day
  let FullTime = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" +  new Date(Date.now()).getSeconds()
  // ==================================== Here end the full date ===========================
  //! ==================================== Here the chat =============================
  let [chatValue, setChatValue] = useState({
      text: "",
      from: "639d98fe13b1053bdd4945fc",
    timeStamp: FullDate + "–" + FullTime,
      sender:"Admin"
  })
  let handleSubmitChat = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:4000/pushChatAdmin/${selectedUserToChat._id}`, chatValue)
    setChatValue({
      text: "",
      from: "639d98fe13b1053bdd4945fc",
      timeStamp: FullDate + "–" + FullTime,
      sender:"Admin"
  })
 
  }

  let handleClickOnUser = async (user) => {
    await axios.put(`http://localhost:4000/messageSentOff/${user._id}`)
    setSelectedUserToChat(user)

    setColorSelectedUser(true)
  }
  //! ==================================== Here end the chat =============================
  //! ==================================== Here the Add product =============================
  let [productValue, setProductValue] = useState({
    name: "",
    ing: "",
    price: null,
    image: "",
    type: "",
    quan: 1,
    rate:1
  })
  console.log("🚀 ~ file: Admin.jsx:61 ~ Admin ~ productValue", productValue)
  let handleChangeProduct = (e) => {
    setProductValue({...productValue,[e.target.name]:e.target.value})
  }
  let handleAddProduct = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    await axios.post("http://localhost:4000/addProduct", formData, productValue, {
      headers:{"Content-Type":"multipart/form-data"}
    })
    alert("The product is Successfully added")
    e.target.reset()
    setProductValue({
      name: "",
      ing: "",
      price: null,
      image: "",
      type: "",
      quan: 1,
      rate:1
    })
}





  //! ==================================== Here End the Add product =============================

  return (
    <div className='admin'>
      {/* =============== */}
      <div className="adminLeft">
        <span><RiAdminFill /> <h3>Admin Dashboard</h3></span>
        <span className={switchSections === 1 && "selected"} onClick={()=>setSwitchSections(1)}><HiOutlineUsers/><h3>Customers</h3></span>
        <span className={switchSections === 2 && "selected"} onClick={()=>setSwitchSections(2)}><AiFillWechat/><h3>Chats</h3></span>
        <span className={switchSections === 3 && "selected"} onClick={()=>setSwitchSections(3)}><GiHotMeal/><h3>Add Products</h3></span>
        <span className={switchSections === 4 && "selected"} onClick={()=>setSwitchSections(4)}><AiFillFolderOpen/><h3>All Products</h3></span>
        <span className={switchSections === 5 && "selected"} onClick={()=>setSwitchSections(5)}><MdOutlinePreview/><h3>Customers Reviews</h3></span>
        <span className={switchSections === 6 && "selected"} onClick={()=>setSwitchSections(6)}><BsFillCalendarDateFill/><h3>Reservations</h3></span>
        <span className={switchSections === 7 && "selected"} onClick={()=>setSwitchSections(7)}><MdUpdate/><h3>Archives</h3></span>

      </div>
      {/* =============== right ========== */}
      {/* =================================================== 1 ========================== */}
      <div className="adminRight">
      {switchSections === 1 && (
          <>
           <div className="usersTitle">
         <h4>ID</h4>
         <h4>Username</h4>
         <h4>E-Mail</h4>
         <h4>City</h4>
         <h4>Street</h4>
         <h4>PLZ</h4>
         <h4>Tel</h4>
         </div>
         {/* ========================== get Users ========================= */}
         {users.map(user => (
           <div className="singleUser">
             <h5>{user._id}</h5>
             <h5>{ user.username}</h5>
             <h5>{ user.email}</h5>
             <h5>{ user.city}</h5>
             <h5>{ user.street}</h5>
             <h5>{ user.plz}</h5>
             <h5>{ user.tel}</h5>
           </div>
         ))}
          </>
         
      )}

      {/* =================================================== 2 ========================== */}
      {switchSections === 2 && (
          <div className='chatContainer'>
           <div className="chatFieldAdmin">
          <div className="chatLeft">
            {users.map((user,i) => (
              <button className={user.messageSent && "messageSent"} key={i} onClick={()=>handleClickOnUser(user)} title={user.email}>{ user.username}</button>
          ))}
          </div>
              <div className="chatTexts">
              {selectedUserToChat?.chat.length === 0 && <h1>The chat is empty, no conversation</h1>}
                
                {selectedUserToChat?.chat.map(singleChat => (
                  <span className={singleChat.from === "639d98fe13b1053bdd4945fc" ? "righ" : "lef"}>
                    <h6>{ singleChat.sender}</h6>
                    <p>{singleChat.text}</p>
                    <h5>{ singleChat.timeStamp}</h5>
                </span>
              ))}
              {/* <span className='lef'>
                      <h6>anwar</h6>
                      <p>this is the Left text</p>
                      <h5>17.12.2022-11:34:55</h5>
              </span>
              <span className='righ'>
                      <h6>Admin</h6>
                      <p>this is the right text</p>
                      <h5>17.12.2022-11:34:55</h5>
              </span> */}
              
            
            </div>
            
          </div>
          <form onSubmit={handleSubmitChat} >
              <input value={chatValue.text} onChange={(e)=>setChatValue({...chatValue,text:e.target.value})} placeholder='Write your message...' type="text" name="chatText"/>
              <button>Send</button>
        </form>
          </div>
        )} 
        {/* ======================================= 3 ====================================== */}
        {switchSections === 3 && (
          <div className="addProducts">
            <h1>Add Product</h1>
            <div className="addProductsContainer">
              <form onSubmit={handleAddProduct} >
                <input onChange={handleChangeProduct} value={productValue.name} placeholder='Enter name...' type="text" name="name"  />
                <input onChange={handleChangeProduct} value={productValue.ing} placeholder='Enter ingredient...' type="text" name="ing"  />
                <input onChange={handleChangeProduct} value={productValue.price} placeholder='Enter price' type="number" name="price" />
                <input onChange={handleChangeProduct} value={productValue.image} className='fileInput' type="file" name="image" />
                {/* =================== Types ================ */}
                <div className="type">
                  <h3>Select the type</h3>
                  <label htmlFor="meat">
                 <h5>   Meat</h5>
                  <input type="radio" onChange={handleChangeProduct} value="meat" name="type" id="meat" />
                  </label>
                  <label htmlFor="dessert"> 
                 <h5> Desserts</h5>  
                  <input type="radio" onChange={handleChangeProduct} value="dessert" name="type" id="dessert" />
                  </label>
                  <label htmlFor="pasta">
                 <h5>   Pasta</h5>
                  <input type="radio" onChange={handleChangeProduct} value="pasta" name="type" id="pasta" />
                  </label>
                  <label htmlFor="chicken">
                 <h5>   Chicken</h5>
                  <input type="radio" onChange={handleChangeProduct} value="chicken" name="type" id="chicken" />
                  </label>
                  <label htmlFor="vegetarian">
                 <h5>   Vegetarian</h5>
                  <input type="radio" onChange={handleChangeProduct} value="vegetarian" name="type" id="vegetarian" />
                  </label>
                  <label htmlFor="bakery">
                 <h5>   Bakery</h5>
                  <input type="radio" onChange={handleChangeProduct} value="bakery" name="type" id="bakery" />
                  </label>
                  <label htmlFor="fish">
                 <h5>   Fish</h5>
                  <input type="radio" onChange={handleChangeProduct} value="fish" name="type" id="fish" />
                  </label>
                 
                </div>
                {/* =========================================== */}
                <button>Publish</button>
            </form>
            </div>
          </div>
        )}
</div>
     
    </div>
  )
}

export default Admin