import React from 'react'

const Header = () => {
  return (
    <div className='headerSection'>
        <div className='left'>
            <h2>Shoppe</h2>
        </div>
        <div className='center'>
            <h3>women</h3>
            <h3>Men</h3>
            <h3>Kids</h3>
        </div>
        <div className='right'>
            <div><input className='search' type='text' placeholder='Search'></input></div>
            <div className='signIn'>
                signIn/signUp
            </div>
            <div className='cart'>
                Cart
            </div>
        </div>
    </div>
  )
}

export default Header;