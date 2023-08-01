import { RxLapTimer, RxStarFilled } from "react-icons/rx";
import questions from '../../questions.json';

const Quiz = () => {
    // console.log('questions',questions.map(v=>v));

    // const quiz = questions.map(v=>{
    //     return (
    //         <div>
    //             {v.category}
    //         </div>
    //     )
    // })

    return (
        <div>
            {/* {quiz} */}
            {/* card */}
            <div className='card'>
            <div className="progress-bar"></div>
                {/* 1st block */}
                <div className="first-block">
                    <div className="left">
                        <small><strong>Entertainment: Board Games</strong></small>
                        <h1>Question 15 of 20</h1>
                        <div className="star">
                            <RxStarFilled style={{ color: 'orange' }} />
                            <RxStarFilled style={{ color: 'orange' }} />
                            <RxStarFilled style={{ color: 'grey' }} />
                        </div>
                    </div>
                    <div className="right">
                        <div className="timer">
                            <span className="logo">
                                <RxLapTimer />
                            </span>
                            <span className="time">&nbsp;00:45</span>
                        </div>
                    </div>
                </div>
                {/* 2nd block */}
                <div className="second-block">
                    <div className="form">
                        <h1 className="question">
                            At the start of a standard game of the Monopoly, if you throw a double six, which square would you land on?
                        </h1>
                        <div className="choices">
                            <h3>Chance</h3>
                            <h3>Water Works</h3>
                            <h3>Electric Company</h3>
                            <h3>Community Chest</h3>
                        </div>
                    </div>
                    <div className="remark">
                        <h1>Correct!</h1>
                    </div>
                    <div className="button">
                        <button>Next Question</button>
                    </div>
                </div>
                <div className="score-range">
                    <div className="txt">
                        <h3>Score: 69%</h3>
                        <h3>Max Score: 75%</h3>
                    </div>
                    <div className="range">
                        <div className="ft ft-1"></div>
                        <div className="ft ft-2"></div>
                        <div className="ft ft-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz