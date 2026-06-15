import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-2 group'>

      {/* Icon */}
      <div className='w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 flex-shrink-0'>
        <ShoppingBag size={20} className='text-white' strokeWidth={2.5} />
      </div>

      {/* Text */}
      <div className='flex flex-col leading-tight'>
        <span className='text-white font-extrabold text-lg tracking-tight group-hover:text-yellow-300 transition-colors duration-200'>
          Digital
        </span>
        <span className='text-white/70 font-semibold text-xs tracking-widest uppercase'>
          E-Cart
        </span>
      </div>

    </Link>
  )
}

export default Logo