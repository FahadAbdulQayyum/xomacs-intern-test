import { useEffect, useState } from "react";
import { RxLapTimer, RxStarFilled } from "react-icons/rx";
import questions from '../../questions.json';

const Quiz = () => {
    const [arr, setArr] = useState();
    const [correct, setCorrect] = useState(false);
    const choiceArray = [];
    console.log('questions', questions.map(v => v));

    useEffect(() => {
        questions.map(v=>choiceArray.push([...v.incorrect_answers, v.correct_answer]))
        // setArr({choiceArray})
        setArr(choiceArray);
    }, [])

    const checkAnswer = (questInd, choiceInd) => {
        console.log('questInd, choiceInd', questInd + 1, choiceInd + 1);
        const correctAns = questions[questInd].correct_answer;
        console.log('correct Answer', correctAns);
        console.log('correct', correctAns===arr[questInd][choiceInd]);
        setCorrect(correctAns===arr[questInd][choiceInd])
    }

    if(!arr) return <div>Loading....</div>
    const quiz = questions.map((v, i) => {
        return (
            <div key={i}>
                {/* {quiz} */}
                {/* card */}
                <div className='card'>
                    <div className="progress-bar" style={{ width: `${(i + 1) * 5}%` }}></div>
                    {/* 1st block */}
                    <div className="first-block">
                        <div className="left">
                            <small><strong>{v.category.replaceAll('%20', " ").replaceAll('%3A', ": ")}</strong></small>
                            <h1>Question {i + 1} of {questions.length}</h1>
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
                                {/* At the start of a standard game of the Monopoly, if you throw a double six, which square would you land on? */}
                                {/* {v.question} */}
                                {v.question.replaceAll("%20", " ").replaceAll("%70", " ").replaceAll("%27", "'").replaceAll("%3F", "?")}
                            </h1>
                            <div className="choices">

                                {/* <h3>Chance</h3>
                                <h3>Water Works</h3>
                                <h3>Electric Company</h3>
                                <h3>Community Chest</h3> */}

                                {[...v.incorrect_answers, v.correct_answer].map((a, ii) =>
                                    <h3 
                                    onClick={() => checkAnswer(i, ii)} 
                                    key={ii}
                                    style={{backgroundColor: v.correct_answer==='Bilius' ? 'red' : "blue"}}
                                    >{a.replaceAll("%20", " ")}</h3>
                                    // >{console.log(v.correct_answer)}</h3>
                                )}

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
    })

    return (
        <div>
            {quiz}
        </div>
    )
}

export default Quiz