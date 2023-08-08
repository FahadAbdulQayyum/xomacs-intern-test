import { RxStarFilled } from "react-icons/rx";

const Level = ({level}) => {
  return (
    (level==="hard") ? 
        <>
            <RxStarFilled className="setOrange" />
            <RxStarFilled className="setOrange" />
            <RxStarFilled className="setOrange" />
        </> 
        :
        (level==="medium") ?
        <>
            <RxStarFilled className="setOrange" />
            <RxStarFilled className="setOrange" />
            <RxStarFilled className="setGrey" />
        </> 
        :
        <>
            <RxStarFilled className="setOrange" />
            <RxStarFilled className="setGrey" />
            <RxStarFilled className="setGrey" />
        </> 
  )
}

export default Level;