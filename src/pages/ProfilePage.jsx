import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

const getProfileSearch = async (userName) => {
    const response = await fetch (`https://api.github.com/users/${userName}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('User not found')
      if (response.status === 403) throw new Error('Rate limit exceeded, try again later')
      throw new Error(`Something went wrong: ${response.status}`)
    }
    return response.json()
  }

function ProfilePage() {
  const navigate = useNavigate() 
  const { userName } = useParams() 

  const {data: profile, isLoading, error} = useQuery({
    queryKey: ['profileSearch', userName ],
    queryFn: () => getProfileSearch(userName),
    retry: false
  })
    
  if (isLoading) return <div className='flex justify-center py-72'><Spinner /></div>
  if (error) return (
    <div className='flex flex-col gap-4 items-center py-72'>
      <p className='text-red-400'>{error.message}</p>
      <button onClick={() => navigate('/')} className='text-white underline'>Go back</button>
    </div>
  )

  return (
    <div className='flex flex-col gap-8 items-center text-center mx-auto py-72 w-full max-w-lg'>
      <div className='w-full bg-[#26303c] border border-[#1c2024] rounded-md p-6 text-left flex gap-4'>
        <img src={profile.avatar_url} alt="avatar" className='w-20 h-20 rounded-full' />
        <div className='text-[#f6f8fa]'>
          <h2 className='text-2xl font-bold'>{profile.name}</h2>
          <p className='text-[#8b949e]'>@{profile.login}</p>
          {profile.bio && <p className='mt-2 text-sm'>{profile.bio}</p>}
          <div className='flex gap-4 mt-3 text-sm text-[#8b949e]'>
            <span>{profile.public_repos} repos</span>
            <span>{profile.followers} followers</span>
            <a href={profile.html_url} target='_blank' rel='noreferrer'>View on Github →</a>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/')} className='text-white underline'>Back to search</button>
    </div>
  )
}

export default ProfilePage