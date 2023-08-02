

import { useState } from "react";
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
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const [wrongAnswer, setWrongAnswer] = useState(0)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })

    const [choice, setChoice] = useState(...questions[activeQuestion].incorrect_answers, questions[activeQuestion].correct_answer);


    // const { question } = questions
    // setChoice(...questions[activeQuestion].incorrect_answers, questions[activeQuestion].correct_answer)

    const nextQuestion = () => {
        if(activeQuestion < questions.length-2){
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
            setActiveQuestion(0);
        }
        setSelectedAnswer('')
        setSelectedAnswerIndex(null);
    }

    const onAnswerSelected = (answer,index) => {
        setSelectedAnswerIndex(index)
        console.log('answewr',answer);
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
            {console.log('llll',(result.correctAnswers/(result.correctAnswers+result.wrongAnswers)*100).toFixed(0))}
            {/* {console.log('llll',result.correctAnswers,result.wrongAnswers)} */}
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
                        <div className="timer" 
                        // style={{justifyContent:'center',alignItems:'center',textAlign:'center'}}
                        >
                            <span className="logo">
                                <RxLapTimer />
                            </span>
                            {/* <span className="time">&nbsp;00:45</span> */}
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
                            {[...questions[activeQuestion].incorrect_answers, questions[activeQuestion].correct_answer].map((a, ii) =>
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
                        {/* <h3>Score: {(result?.correctAnswers/(result?.correctAnswers+result?.wrongAnswers)*100).toFixed(0)}%</h3> */}
                        <h3>Max Score: 75%</h3>
                    </div>
                    <div className="range">
                        {/* <div style={{width: (result.correctAnswers/(result.correctAnswers+result.wrongAnswers)*100) ==='NaN' ? '' : (result.correctAnswers/(result.correctAnswers+result.wrongAnswers)*100).toFixed(0)+'%'}} className="ft ft-1"></div> */}
                        <div style={{width: (result.correctAnswers/(result.correctAnswers+result.wrongAnswers)*100)}} className="ft ft-1"></div>
                        {/* <div className="ft ft-2"></div>
                        <div className="ft ft-3"></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz;