import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className='text-[var(--primary)] text-2xl font-bold ml-4'>
      <Link to='/'>
       Digital E-Cart
      </Link>
       
    </div>
  )
}

export default Logo