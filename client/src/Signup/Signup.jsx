import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./signup.scss"
import axios from "axios"
import { context } from '../Context'
function Signup() {
    let { users, setUsers, signinValue, setSigninValue } = useContext(context)
  let usersWithoutAdmin = users.filter(item => item._id !== "639d98fe13b1053bdd4945fc") //! This is important in case changed the admin id this will damage !!!!!!
    
    console.log("🚀 ~ file: Signup.jsx:8 ~ Signup ~ signinValue", signinValue)
    let [switchBtn, setSwitchBtn] = useState(1)
    let navigate = useNavigate()
    let [signupValue, setSignupValue] = useState({
        username: "",
        email: "",
        password: "",
        city: "",
        street: "",
        plz: "",
        tel:""
    }) 
    let [rePassword, setRePassword] = useState("")
    let [passwordNotMatch, setPasswordNotMatch] = useState("")
    let [passwordReq,setPasswordReq] = useState("")
    
    // ======================== Sign up =====================
    let handleChangeSignup = (e) => {
        setSignupValue({ ...signupValue, [e.target.name]: e.target.value })
       
    }
    let handleSubmitSignup = async (e) => {
        e.preventDefault()
        if (usersWithoutAdmin.some(user => user.email === signupValue.email)) {
            alert("This user is allready exist !")
        }  else if (signupValue.password === rePassword) {
            await axios.post("http://localhost:4000/newUser", signupValue)
            setSignupValue({
                username: "",
                email: "",
                password: "",
                city: "",
                street: "",
                plz: "",
                tel:""
            })
            setRePassword("")
            alert("Your registration is successfully done")
            setSwitchBtn(1)
            setPasswordNotMatch("")
            setPasswordReq("")
            setSigninValue({
                email: signupValue.email,
                password:signupValue.password
            })
            
        } else {
            setPasswordNotMatch("The passwords are not matched !")
        }
      
    }
    // ============================ Sign in ======================
    let handleChangeSignin = (e) => {
        setSigninValue({...signinValue,[e.target.name]:e.target.value})
    }
    let handleSubmitSignin = (e) => {
        e.preventDefault()

        
       


        if(usersWithoutAdmin.some(user => user.email === signinValue.email)) {
            navigate("/userChat")
        } else if (signinValue.email === "admin-ba@baTeam.com" && signinValue.password === "Admin123") {
              navigate("/admin")         
                console.log("must go to admin");
        }else{
            alert("This user is not registered")
        }
       
    }
  return (
      <div className='signup'>
          <div className="signup-container">
              {/* ===================== Titles ================== */}
              <div className="titles">
                  <button className={switchBtn === 1 && "line"} onClick={()=>setSwitchBtn(1)}>Sign in</button>
                  <button className={switchBtn === 2 && "line"} onClick={()=>setSwitchBtn(2)}>Sign up</button>
              </div>
              {/* ======================= Form ==================== */}
              {switchBtn === 1 && (
                  <form onSubmit={handleSubmitSignin}>
                  <input required onChange={handleChangeSignin} value={signinValue.email} type="email" name="email" placeholder='Enter your E-Mail...' />
                  <input required onChange={handleChangeSignin} value={signinValue.password} type="password" name="password" placeholder='Enter your Passowrd...' />
                      <button>Sign in</button>
              </form>
              )}
              {switchBtn === 2 && (
                  <form onSubmit={handleSubmitSignup} >
                      <span>
                      <input required onChange={handleChangeSignup} value={signupValue.username} type="text" name="username" placeholder='Enter your full name...' />
                      <input required onChange={handleChangeSignup} value={signupValue.email} type="email" name="email" placeholder='Enter you E-Mail...' />
                    </span>
                      <span>
                      <input title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={handleChangeSignup} value={signupValue.password} type="password" name="password" placeholder='Enter your Password...' />
                      <input title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={(e)=>setRePassword(e.target.value)} value={rePassword} type="password" name="rePassword" placeholder='Repeat your Passowrd...' />
                      </span>
                      <h4>{passwordNotMatch}</h4>
                      <h4>{passwordReq}</h4>
                      
                      <input required onChange={handleChangeSignup} value={signupValue.city} type="text" name="city" placeholder='Enter City...' />
                      <input required onChange={handleChangeSignup} value={signupValue.street} type="text" name="street" placeholder='Enter Street...' />
                      <input required onChange={handleChangeSignup} value={signupValue.plz} type="text" name="plz" placeholder='Enter PLZ...' />
                      <input required onChange={handleChangeSignup} value={signupValue.tel} type="tel" name="tel" placeholder='Enter mobile-Nr...' />
                      <button >Sign up</button>
                      
                  </form>
              )}
          </div>
    </div>
  )
}

export default Signup