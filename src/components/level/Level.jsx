import { RxStarFilled } from "react-icons/rx";

const Level = ({level}) => {
  return (
    (level==="hard") ? 
        <>
            <RxStarFilled style={{ color: 'orange' }} />
            <RxStarFilled style={{ color: 'orange' }} />
            <RxStarFilled style={{ color: 'orange' }} />
        </> 
        :
        (level==="medium") ?
        <>
            <RxStarFilled style={{ color: 'orange' }} />
            <RxStarFilled style={{ color: 'orange' }} />
            <RxStarFilled style={{ color: 'grey' }} />
        </> 
        :
        <>
            <RxStarFilled style={{ color: 'orange' }} />
            <RxStarFilled style={{ color: 'grey' }} />
            <RxStarFilled style={{ color: 'grey' }} />
        </> 
  )
}

export default Level;