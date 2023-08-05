import { useEffect } from 'react';
import { useStopwatch, useTimer } from 'react-timer-hook';


const StopWatch = ({ expiryTimestamp, setExpired }) => {
    const {
        seconds,
        minutes,
        restart,
    } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => setExpired(true) });

    return (
        <>
            <span>{(minutes < 10) ? '0' + minutes : minutes}</span>:<span>{(seconds < 10) ? '0' + (seconds) : seconds}</span>
            <span style={{display:'none'}}>{(seconds === 0 && minutes === 0) && restart(expiryTimestamp)}</span>
        </>
    );
}

export default StopWatch