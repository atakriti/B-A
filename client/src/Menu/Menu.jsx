import React, { useRef } from 'react'
import {useNavigate} from "react-router-dom"
import HTMLFlipBook from 'react-pageflip';
import { useMediaQuery } from 'react-haiku';
import "./menu.scss";
import wallpaper from "../images/chat-wallpaper.jpg"
import bakery from "../images/bakery.jpg"
import chicken from "../images/chicken.jpg"
import dessert from "../images/dessert.jpg"
import drinks from "../images/drinks.jpg"
import fish from "../images/fish.jpg"
import meat from "../images/meat.jpg"
import pasta from "../images/Pasta.jpg"
import vegetarian from "../images/vegetarian.jpg"
function Menu() {
  let navigate = useNavigate()
  const book = useRef();
  const breakpoint = useMediaQuery('(max-width: 1000px)');
  let navigateToFood = (item) => {
    navigate(`/food/${item}`)
  }
  return (
      <div className='menu'>
      <h1>Our Menu</h1>
      {breakpoint ? (
 <HTMLFlipBook useMouseEvents={false} ref={book} width={500} height={500}>
 <div onClick={()=>navigateToFood("bakery")} data-info="Bakery" className="demoPage"><img src={bakery} alt="" /></div>
   <div onClick={()=>navigateToFood("chicken")} data-info="Chicken" className="demoPage"><img src={chicken} alt="" /></div>
 <div onClick={()=>navigateToFood("dessert")} data-info="Dessert" className="demoPage"><img src={dessert} alt="" /></div>
 <div onClick={()=>navigateToFood("drink")} data-info="Drinks" className="demoPage"><img src={drinks} alt="" /></div>
 <div onClick={()=>navigateToFood("fish")} data-info="Fish" className="demoPage"><img src={fish} alt="" /></div>
 <div onClick={()=>navigateToFood("meat")} data-info="Meat" className="demoPage"><img src={meat} alt="" /></div>
 <div onClick={()=>navigateToFood("pasta")} data-info="Pasta" className="demoPage"><img src={pasta} alt="" /></div>
 <div onClick={()=>navigateToFood("vegetarian")} data-info="Vegetarian" className="demoPage"><img src={vegetarian} alt="" /></div>
   
   
</HTMLFlipBook>
      ): (
        <HTMLFlipBook useMouseEvents={false} ref={book} width={500} height={500}>
        <div className="demoPage"><img src={wallpaper} alt="" /></div>
      <div onClick={()=>navigateToFood("bakery")} data-info="Bakery" className="demoPage"><img src={bakery} alt="" /></div>
      <div className="demoPage"><img src={wallpaper} alt="" /></div>
        <div onClick={()=>navigateToFood("chicken")} data-info="Chicken" className="demoPage"><img src={chicken} alt="" /></div>
        <div className="demoPage"><img src={wallpaper} alt="" /></div>
      <div onClick={()=>navigateToFood("dessert")} data-info="Dessert" className="demoPage"><img src={dessert} alt="" /></div>
      <div className="demoPage"><img src={wallpaper} alt="" /></div>
      <div onClick={()=>navigateToFood("drink")} data-info="Drinks" className="demoPage"><img src={drinks} alt="" /></div>
      <div className="demoPage"><img src={wallpaper} alt="" /></div>
      <div onClick={()=>navigateToFood("fish")} data-info="Fish" className="demoPage"><img src={fish} alt="" /></div>
      <div className="demoPage"><img src={wallpaper} alt="" /></div>
      <div onClick={()=>navigateToFood("meat")} data-info="Meat" className="demoPage"><img src={meat} alt="" /></div>
      <div className="demoPage"><img src={wallpaper} alt="" /></div>
      <div onClick={()=>navigateToFood("pasta")} data-info="Pasta" className="demoPage"><img src={pasta} alt="" /></div>
      <div className="demoPage"><img src={wallpaper} alt="" /></div>
      <div onClick={()=>navigateToFood("vegetarian")} data-info="Vegetarian" className="demoPage"><img src={vegetarian} alt="" /></div>
      <div className="demoPage"><img src={wallpaper} alt="" /></div>
        
        
</HTMLFlipBook>
      )}
     

          <div className="menu_btns">
          <button onClick={() => book.current.pageFlip().flipPrev()}>Prev page</button>
          <button onClick={() => book.current.pageFlip().flipNext()}>Next page</button>
          </div>
          
    </div>
  )
}

export default Menu