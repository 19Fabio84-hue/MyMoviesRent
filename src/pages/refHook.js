import {useState ,useEffect, useRef} from 'react'

function useHover(){
    const [hover , setHover] = useState(false)
    const ref = useRef(null)

    function Enter(){
        setHover(true)
    }
    function Leave(){
        setHover(false)
    }

    useEffect(()=>{
        const refcurrent = ref.current
        refcurrent.addEventListener('mouseenter' ,Enter )
        refcurrent.addEventListener('mouseleave' , Leave)

        return () => {
            refcurrent.removeEventListener('mouseenter' ,Enter )
        refcurrent.removeEventListener('mouseleave' , Leave)
        }
    },[ref])
    return [hover , ref]
}

export default useHover