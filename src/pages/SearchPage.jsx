import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";

function SearchPage() {
   const [userName, setUserName] = useState("");
   const navigate = useNavigate()
    
   const handleSearch = () => {
    if (userName.trim()) navigate(`/profile/${userName}`)
   }

   const handleKeyDown = (e) => {
    if(e.key === 'Enter') handleSearch()
   }

   return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-8 items-center text-center w-full max-w-lg px-4'>
        <SearchInput
          userName={userName}
          setUserName={setUserName}
          onSearch={handleSearch}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
    </div>
  )
}

export default SearchPage