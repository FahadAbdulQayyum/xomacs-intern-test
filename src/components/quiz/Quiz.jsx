

import { useEffect, useState } from "react";
import { RxLapTimer, RxStarFilled } from "react-icons/rx";
import questions from '../../questions.json';
import { useStopwatch } from 'react-timer-hook';

function MyStopwatch() {
  const {
    seconds,
    minutes,
  } = useStopwatch({ autoStart: true });


  return (
      <>
        <span>{(minutes < 10) ? '0'+ minutes : minutes}</span>:<span>{(seconds < 10) ? '0'+(seconds) : seconds}</span>
      </>
  );
}

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    
    let resultRange = 0, resultRangeClr = '';

    // let choicee = []
    let [choicee, setChoicee] = useState([])

    const nextQuestion = () => {
        if(activeQuestion <= questions.length-2){
            setActiveQuestion(prev => prev + 1);
            setResult((prev) =>
            selectedAnswer
              ? {
                  ...prev,
                  score: prev.score + 5,
                  correctAnswers: prev.correctAnswers + 1,
                }
              : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
          )
        }else {
            setResult((prev) => prev,result.score= 0,result.correctAnswers= 0,result.wrongAnswers= 0,
                
          )
            setActiveQuestion(0);
        }
        setSelectedAnswer('')
        setSelectedAnswerIndex(null);
    }


    useEffect(()=>{
        setChoicee([...questions[activeQuestion].incorrect_answers, questions[activeQuestion].correct_answer].sort(() => Math.random() - 0.5))
    },[activeQuestion]);

    const onAnswerSelected = (answer,index) => {
        setSelectedAnswerIndex(index)
        console.log('answer',answer);
        if (answer === questions[activeQuestion].correct_answer) {
          setSelectedAnswer(true)
          console.log('right')
        } else {
          setSelectedAnswer(false)
          console.log('wrong')
        }
      }

    return (
        <div>
            <div style={{display:'none'}}>
                {(result.correctAnswers+result.wrongAnswers) === questions.length+1 ? resultRange = 0 : resultRange = result.correctAnswers+result.wrongAnswers }
                {(result.correctAnswers+result.wrongAnswers)>14 && (result.correctAnswers > 14 ) ? resultRangeClr = "green" : "red"}
                {(result.correctAnswers+result.wrongAnswers)>14 && (result.correctAnswers > 9 && result.wrongAnswers > 4) ? resultRangeClr = "yellow" : "red"}
            </div>
            {/* card */}
            <div className='card'>
                <div className="progress-bar" style={{ width: `${(activeQuestion + 1) * 5}%` }}></div>
                {/* 1st block */}
                <div className="first-block">
                    <div className="left">
                        <small><strong>{questions[activeQuestion].category.replaceAll('%20', " ").replaceAll('%3A', ": ")}</strong></small>
                        <h1>Question {activeQuestion + 1} of {questions.length}</h1>
                        <div className="star">
                            {questions[activeQuestion].difficulty === 'hard' &&
                                <>
                            <RxStarFilled style={{ color: 'orange' }} />
                            <RxStarFilled style={{ color: 'orange' }} />
                            <RxStarFilled style={{ color: 'orange' }} />
                                </>
                            }
                            {questions[activeQuestion].difficulty === 'medium' &&
                                <>
                            <RxStarFilled style={{ color: 'orange' }} />
                            <RxStarFilled style={{ color: 'orange' }} />
                            <RxStarFilled style={{ color: 'grey' }} />
                                </>
                            }
                            {questions[activeQuestion].difficulty === 'easy' &&
                                <>
                            <RxStarFilled style={{ color: 'orange' }} />
                            <RxStarFilled style={{ color: 'grey' }} />
                            <RxStarFilled style={{ color: 'grey' }} />
                                </>
                            }
                        </div>
                    </div>
                    <div className="right">
                        <div className="timer">
                            <span className="logo">
                                <RxLapTimer />
                            </span>
                            <span className="time">&nbsp;<MyStopwatch/></span>
                        </div>
                    </div>
                </div>
                {/* 2nd block */}
                <div className="second-block">
                    <div className="form">
                        <h1 className="question">
                            {questions[activeQuestion].question.replaceAll("%20", " ").replaceAll("%70", " ").replaceAll("%27", "'").replaceAll("%3F", "?")}
                        </h1>
                        <div className="choices">
                            {/* {[...questions[activeQuestion].incorrect_answers, questions[activeQuestion].correct_answer].sort(() => Math.random() - 0.5).map((a, ii) => */}
                            {choicee.map((a, ii) =>
                                <h3
                                    onClick={() => onAnswerSelected(a,ii)}
                                    key={ii}
                                    style={{color: selectedAnswerIndex !==null && (a === questions[activeQuestion].correct_answer ? "#2ecc71" : "darksalmon")}}

                                >{a.replaceAll("%20", " ")}</h3>
                            )}

                        </div>
                    </div>
                    <div className="remark">
                        <h1 style={{color: selectedAnswer ? 'green' : 'red'}}>{selectedAnswerIndex === null ? ' ' : selectedAnswer ? 'Correct!' : 'Sorry'}</h1>
                    </div>
                    <div className="button">
                        <button onClick={nextQuestion}>Next Question</button>
                    </div>
                </div>
                <div className="score-range">
                    <div className="txt">
                        <h3>Score: {result.score}%</h3>
                        <h3>Max Score: 75%</h3>
                    </div>
                    <div className="range">
                        <div style={{width: resultRange*5+'%', backgroundColor:resultRange > 0 ? resultRangeClr : 'transparent'}} className="ft ft-1"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz;