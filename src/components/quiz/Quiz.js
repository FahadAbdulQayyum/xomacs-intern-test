import { useEffect, useState } from "react";
import { RxLapTimer, RxStarFilled } from "react-icons/rx";
import questions from '../../questions.json';

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
            {/* card */}
            <div className='card'>
                <div className="progress-bar" style={{ width: `${(activeQuestion + 1) * 5}%` }}></div>
                {/* 1st block */}
                <div className="first-block">
                    <div className="left">
                        <small><strong>{questions[activeQuestion].category.replaceAll('%20', " ").replaceAll('%3A', ": ")}</strong></small>
                        <h1>Question {activeQuestion + 1} of {questions.length}</h1>
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
                            {/* {v.question} */}
                            {questions[activeQuestion].question.replaceAll("%20", " ").replaceAll("%70", " ").replaceAll("%27", "'").replaceAll("%3F", "?")}
                        </h1>
                        <div className="choices">
                            {[...questions[activeQuestion].incorrect_answers, questions[activeQuestion].correct_answer].map((a, ii) =>
                                <h3
                                    onClick={() => onAnswerSelected(a,ii)} 
                                    key={ii}
                                    // className={selectedAnswerIndex === ii ? 'selected-answer' : null}
                                    className={selectedAnswer ? 'selected-answer' : null}
                                    style={{backgroundColor: selectedAnswerIndex !==null && (a === questions[activeQuestion].correct_answer ? "#2ecc71": "darksalmon")}}
                                    // className={selectedAnswer ? 'selected-answer' : 'unselected-answer'}
                                >{a.replaceAll("%20", " ")}</h3>
                                // >{console.log(v.correct_answer)}</h3>
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
                        <div className="ft ft-1"></div>
                        <div className="ft ft-2"></div>
                        <div className="ft ft-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz;





// import { useEffect, useState } from "react";
// import { RxLapTimer, RxStarFilled } from "react-icons/rx";
// import questions from '../../questions.json';

// const Quiz = () => {
//     const [arr, setArr] = useState();
//     const [correct, setCorrect] = useState(false);
//     const choiceArray = [];
//     console.log('questions', questions.map(v => v));

//     useEffect(() => {
//         questions.map(v=>choiceArray.push([...v.incorrect_answers, v.correct_answer]))
//         // setArr({choiceArray})
//         setArr(choiceArray);
//     }, [])

//     const checkAnswer = (questInd, choiceInd) => {
//         console.log('questInd, choiceInd', questInd + 1, choiceInd + 1);
//         const correctAns = questions[questInd].correct_answer;
//         console.log('correct Answer', correctAns);
//         console.log('correct', correctAns===arr[questInd][choiceInd]);
//         setCorrect(correctAns===arr[questInd][choiceInd])
//     }

//     if(!arr) return <div>Loading....</div>
//     const quiz = questions.map((v, i) => {
//         return (
//             <div key={i}>
//                 {/* {quiz} */}
//                 {/* card */}
//                 <div className='card'>
//                     <div className="progress-bar" style={{ width: `${(i + 1) * 5}%` }}></div>
//                     {/* 1st block */}
//                     <div className="first-block">
//                         <div className="left">
//                             <small><strong>{v.category.replaceAll('%20', " ").replaceAll('%3A', ": ")}</strong></small>
//                             <h1>Question {i + 1} of {questions.length}</h1>
//                             <div className="star">
//                                 <RxStarFilled style={{ color: 'orange' }} />
//                                 <RxStarFilled style={{ color: 'orange' }} />
//                                 <RxStarFilled style={{ color: 'grey' }} />
//                             </div>
//                         </div>
//                         <div className="right">
//                             <div className="timer">
//                                 <span className="logo">
//                                     <RxLapTimer />
//                                 </span>
//                                 <span className="time">&nbsp;00:45</span>
//                             </div>
//                         </div>
//                     </div>
//                     {/* 2nd block */}
//                     <div className="second-block">
//                         <div className="form">
//                             <h1 className="question">
//                                 {/* At the start of a standard game of the Monopoly, if you throw a double six, which square would you land on? */}
//                                 {/* {v.question} */}
//                                 {v.question.replaceAll("%20", " ").replaceAll("%70", " ").replaceAll("%27", "'").replaceAll("%3F", "?")}
//                             </h1>
//                             <div className="choices">

//                                 {/* <h3>Chance</h3>
//                                 <h3>Water Works</h3>
//                                 <h3>Electric Company</h3>
//                                 <h3>Community Chest</h3> */}

//                                 {[...v.incorrect_answers, v.correct_answer].map((a, ii) =>
//                                     <h3
//                                     onClick={() => checkAnswer(i, ii)}
//                                     key={ii}
//                                     style={{backgroundColor: v.correct_answer==='Bilius' ? 'red' : "blue"}}
//                                     >{a.replaceAll("%20", " ")}</h3>
//                                     // >{console.log(v.correct_answer)}</h3>
//                                 )}

//                             </div>
//                         </div>
//                         <div className="remark">
//                             <h1>Correct!</h1>
//                         </div>
//                         <div className="button">
//                             <button>Next Question</button>
//                         </div>
//                     </div>
//                     <div className="score-range">
//                         <div className="txt">
//                             <h3>Score: 69%</h3>
//                             <h3>Max Score: 75%</h3>
//                         </div>
//                         <div className="range">
//                             <div className="ft ft-1"></div>
//                             <div className="ft ft-2"></div>
//                             <div className="ft ft-3"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     })

//     return (
//         <div>
//             {quiz}
//         </div>
//     )
// }

// export default Quiz;