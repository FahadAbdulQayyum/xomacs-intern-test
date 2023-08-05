import { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import questions from '../../questions.json';
import MyStopwatch from '../stopWatch/StopWatch';
import Level from "../level/Level";
import BarCalculation from "../barCalculation/BarCalculation";
import Choices from "../choices/Choices";
import Score from "../score/Score";

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
        console.log('answer', answer);
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
                        <small><strong>{questions[activeQuestion].category.replaceAll('%20', " ").replaceAll('%26', " ").replaceAll('%3A', ": ")}</strong></small>
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
                            {questions[activeQuestion].question.replaceAll("%20", " ").replaceAll("%22", " ").replaceAll("%2C", " ").replaceAll("%70", " ").replaceAll("%27", "'").replaceAll("%3F", "?")}
                        </h1>
                        <Choices choicee={choicee} selectedAnswer={selectedAnswer} selectedAnswerIndex={selectedAnswerIndex}
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
            <small><strong id="strong">Get the source code from git:&nbsp;&nbsp;<a href="https://github.com/FahadAbdulQayyum/xomacs-intern-test">Interview Test</a></strong></small>
        </div>
    )
}

export default Quiz;