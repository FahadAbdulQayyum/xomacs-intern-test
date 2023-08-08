import { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import questions from '../../questions.json';
import MyStopwatch from '../stopWatch/StopWatch';
import Level from "../level/Level";
import BarCalculation from "../barCalculation/BarCalculation";
import Choices from "../choices/Choices";
import Score from "../score/Score";
import decryptJson from "../decrypt-json/decryptJson";

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [expired, setExpired] = useState(false);
    const [nextQuest, setNextQuest] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })

    const [resultRange, setResultRange] = useState(0);
    const [resultRangeClr, setResultRangeClr] = useState('');

    let [choicee, setChoicee] = useState([])

    let expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 47);

    const nextQuestion = () => {
        if (selectedAnswerIndex === null) {
            return alert('Kindly select any choice')
        }
        if (activeQuestion <= questions.length - 2) {
            setActiveQuestion(prev => prev + 1);
            setNextQuest(true)
            setResult((prev) =>
                selectedAnswer
                    ? {
                        ...prev,
                        score: prev.score + 5,
                        correctAnswers: prev.correctAnswers + 1,
                    }
                    : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
            )
        } else {
            setResult((prev) => prev, result.score = 0, result.correctAnswers = 0, result.wrongAnswers = 0,

            )
            setActiveQuestion(0);
        }
        setSelectedAnswer('')
        setSelectedAnswerIndex(null);
    }

    useEffect(() => {
        setChoicee([...questions[activeQuestion].incorrect_answers, questions[activeQuestion].correct_answer].sort(() => Math.random() - 0.5))
    }, [activeQuestion]);

    useEffect(() => {
        expired && setActiveQuestion(prev => prev + 1)
        activeQuestion === questions.length - 1 && setActiveQuestion(0)
        setExpired(false)
    }, [expired]);

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index);
        if (answer === questions[activeQuestion].correct_answer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
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
                        <small><strong>{decryptJson(questions[activeQuestion].category)}</strong></small>
                        <h1>Question {activeQuestion + 1} of {questions.length}</h1>
                        <div className="star">
                            <Level level={questions[activeQuestion].difficulty} />
                        </div>
                    </div>
                    <div className="right">
                        <div className="timer">
                            <span className="logo">
                                <RxLapTimer />
                            </span>
                            <span className="time">
                                &nbsp;
                                <MyStopwatch
                                    expiryTimestamp={expiryTimestamp}
                                    setExpired={setExpired}
                                    nextQuest={nextQuest}
                                    setNextQuest={setNextQuest}
                                />
                            </span>
                        </div>
                    </div>
                </div>
                {/* 2nd block */}
                <div className="second-block">
                    <div className="form">
                        <h1 className="question">
                            {decryptJson(questions[activeQuestion].question)}
                        </h1>
                        <Choices choicee={choicee} 
                            selectedAnswer={selectedAnswer} 
                            selectedAnswerIndex={selectedAnswerIndex}
                            questions={questions}
                            activeQuestion={activeQuestion}
                            onAnswerSelected={onAnswerSelected}
                        />
                    </div>
                    <div className="remark">
                        <h1 style={{ color: selectedAnswer ? 'green' : 'red' }}>{selectedAnswerIndex === null ? ' ' : selectedAnswer ? 'Correct!' : 'Sorry'}</h1>
                    </div>
                    <div className="button">
                        <button onClick={nextQuestion}>Next Question</button>
                    </div>
                </div>
                <Score result={result} resultRange={resultRange} resultRangeClr={resultRangeClr} />
                <BarCalculation result={result} questions={questions} setResultRange={setResultRange} setResultRangeClr={setResultRangeClr} />
            </div>
        </div>
    )
}

export default Quiz;