'use client'
import React from 'react'
import Link from 'next/link'

const Button = ({
  href,
  label = 'Click Here',
  className = '',
  variant = 'primary',
}) => {

  const baseClass =
    'relative inline-block px-2 md:px-5 py-2 font-bold uppercase text-sm md:text-md overflow-hidden group transition-all duration-300'

  const variants = {
    primary: 'border-2 border-black bg-primary text-black',
    dark: 'border-2 border-primary bg-black text-white',
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {/* Text */}
      <span
        className={`
          relative z-10 transition duration-300 font-bold
          ${variant === 'primary' ? 'group-hover:text-white' : 'group-hover:text-black'}
        `}
      >
        {label}
      </span>

      {/* Overlay */}
      <span
        aria-hidden="true"
        className={`
          absolute inset-0 w-0 transition-all duration-500
          ${variant === 'primary' ? 'bg-black group-hover:w-full' : 'bg-primary group-hover:w-full'}
        `}
      ></span>
    </Link>
  )
}

export default Button