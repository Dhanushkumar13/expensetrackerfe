//creating custom hook for the orb in the background to get the screen size
import { useEffect, useState } from 'react'

export default function useWindow() {

    const [size, setSize] = useState([0,0]);

    useEffect(()=>{
        const updateSize = () =>{
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize' ,updateSize)
    }, [])

    return{
        width: size[0],
        height: size[1],
    }
}
