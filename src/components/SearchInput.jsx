import { useState } from 'react'
import React from 'react'
import github from '../assets/github.svg'

const SearchInput = () => {
  const [userName, setUserName] = useState("")
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchProfile = async () => {
    if (!userName.trim()) return

    setLoading(true)
    setError(null)
    setProfile(null)

    try {
      const res = await fetch(`https://api.github.com/users/${userName}`)

      if (!res.ok) {
        throw new Error(res.status === 404 ? 'User not found' : 'Something went wrong')
      }

      const data = await res.json()
      setProfile(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }                           
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchProfile()
    }
  }

  return (
    <>
      <div className='flex flex-col gap-8 items-center text-center mx-auto py-72 w-full max-w-lg'>
        <img src={github} alt="Github Icon" />
        <h1 className='text-[#f6f8fa] text-5xl'>Find Your Octoprofile</h1>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
          className='block w-full py-3 px-6 rounded-sm bg-[#26303c] text-2xl leading-relaxed text-center
          text-[#218be6] border border-[#1c2024] focus:outline-none thick-caret
          transition-all duration-300'
        />

        {loading && <p className='text-[#8b949e]'>Searching...</p>}
        {error && <p className='text-red-400'>{error}</p>}

        {profile && (
          <div className='w-full bg-[#26303c] border border-[#1c2024] rounded-md p-6 text-left flex gap-4'>
            <img src="{profile.avatar_url}" alt="avatar" className='w-20 h-20 rounded-full'/>
            <div className='text-[#f6f8fa]'>
              <h2 className='text-2xl font-bold'>{profile.name}</h2>
              <p className='text-[#8b949e]'>@{profile.login}</p>
              {profile.bio && <p className='mt-2 text-sm'>{profile.bio}</p>}
              <div className='flex gap-4 mt-3 text-sm text-[#8b949e]'>
                <span>{profile.public_repos} repos</span>
                <span>{profile.followers} followers</span>
                <a href="{profile.html_url}" target='_blank' rel='noreferrer'>
                  View on Github →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}                             

export default SearchInput