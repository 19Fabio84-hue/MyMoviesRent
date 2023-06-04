import {useState ,useEffect, useRef} from 'react'

function useHover(){
    const [hover , setHover] = useState(true)
    const ref = useRef(null)

    function Enter(){
        setHover(true)
    }
    function Leave(){
        setHover(false)
    }
    function click(){
        setHover(!hover)
    }
    useEffect(()=>{
        const refcurrent = ref.current
        refcurrent.addEventListener('mouseenter' ,Enter )
        refcurrent.addEventListener('mouseleave' , Leave)
        refcurrent.addEventListener('onClick' , click)

        return () => {
            refcurrent.removeEventListener('mouseenter' ,Enter )
        refcurrent.removeEventListener('mouseleave' , Leave)
        refcurrent.removeEventListener('onClick' , click)
        }
    },[ref])
    return [hover , ref]
}

export default useHover