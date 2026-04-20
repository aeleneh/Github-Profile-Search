import { useState } from 'react'
import React from 'react'
import github from '../assets/github.svg'

const SearchInput = ({userName, setUserName, onKeyDown}) => {
  return (
    <>
        <img src={github} alt="Github Icon" />
        <h1 className='text-[#f6f8fa] text-5xl'>Find Your Octoprofile</h1>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={onKeyDown}
          className='block w-full py-3 px-6 rounded-sm bg-[#26303c] text-2xl leading-relaxed text-center
          text-[#218be6] border border-[#1c2024] focus:outline-none thick-caret
          transition-all duration-300'
        />
    </>
  )
}                             

export default SearchInput