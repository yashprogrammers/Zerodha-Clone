import React from 'react'
import "./BuyActionWindow.css"
import { useParams } from 'react-router-dom';

const BuyActionWindow = () => {
    const { id } = useParams();

  return (
    <form className="buy-action-window">
      <h2>BUY STOCK</h2>
      <div className='flex'>
        <div className='input'>
          <label htmlFor="quantity">QTY</label>
          <input type="number" placeholder='00'/>
        </div>
        <div className='input'>
          <label htmlFor="quantity">PRICE</label>
          <input type="number"/>
        </div>
      </div>
      <button>BUY NOW!</button>
    </form>
  )
}

export default BuyActionWindow
