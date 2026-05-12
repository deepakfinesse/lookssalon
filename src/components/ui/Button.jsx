'use client'
import React from 'react'
import Link from 'next/link'

const Button = ({
  href,
  label = 'Click Here',
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  target,
}) => {

  const baseClass =
    'relative inline-block px-2 md:px-5 py-1.5 font-bold uppercase text-sm lg:text-md xl:text-lg overflow-hidden group transition-all duration-300 cursor-pointer'

  const variants = {
    primary: 'border-2 border-black bg-primary text-black',
    dark: 'border-2 border-primary bg-black text-white',
  }

  const inner = (
    <>
      <span
        className={`
          relative z-10 transition duration-300 font-bold
          ${variant === 'primary' ? 'group-hover:text-white' : 'group-hover:text-black'}
        `}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`
          absolute inset-0 w-0 transition-all duration-500
          ${variant === 'primary' ? 'bg-black group-hover:w-full' : 'bg-primary group-hover:w-full'}
        `}
      />
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        target={target}
        className={`${baseClass} ${variants[variant]} ${className}`}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={`${baseClass} ${variants[variant]} ${className} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {inner}
    </button>
  )
}

export default Button