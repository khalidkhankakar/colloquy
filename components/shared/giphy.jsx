'use client'
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import Image from "next/image"
import { useDebounce } from "@uidotdev/usehooks";

const Giphy = ({giphy,  setGiphy}) => {
    const [allGiphys, setAllGiphys] = useState([])
    const [search, setSearch] = useState('')
    const debouncedSearchTerm = useDebounce(search, 600);
    const fetchGiphy = async () => { 
        const response = await fetch(`https://giphy.p.rapidapi.com/v1/gifs/search?api_key=ZvYZsNLkqfPCVAbmpdrzTFYiKolkBCgT&q=${debouncedSearchTerm || 'dogs'}`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '31a66909e4msh2a1cf4703e4e230p1d7808jsnd3536f6fd34d',
              'X-RapidAPI-Host': 'giphy.p.rapidapi.com'
            }
          });
        const result = await response.json();
        setAllGiphys(result.data)
     }

    useEffect(()=>{
        fetchGiphy()
    },[debouncedSearchTerm])
    console.log(allGiphys,debouncedSearchTerm);
  return (
    <div className="">
        {/* input */}
        <Input type="text" placeholder="Search" value={search} onChange={(e)=> setSearch(e.target.value)} />

        {/* trending giphies */}
    <div className="flex-center flex-wrap gap-1 my-4 h-32 overflow-y-auto ">
        {
        allGiphys?.map((gif)=>(
            <Image src={gif?.images?.fixed_width.webp} width={500} height={400} alt="dff" className="h-28 w-28 cursor-pointer object-fill" onClick={()=>{setGiphy({giphyUrl:gif?.images?.fixed_width.webp,showGiphy:false})}}/>
        ))
        }
    </div>
 
    </div>
  )
}

export default Giphy