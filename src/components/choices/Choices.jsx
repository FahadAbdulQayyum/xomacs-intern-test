// RxCross fetch and imported from 'react-icons/rx'
import { RxCross1 } from "react-icons/rx";
// FaCheck fetched and imported from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa';
import decryptJson from "../decrypt-json/decryptJson";

const Choices = ({choicee, selectedAnswer, selectedAnswerIndex, questions, activeQuestion, onAnswerSelected }) => {
    return (
        <div className="choices">
            {choicee.map((a, ii) =>
                <h3
                    onClick={() => (selectedAnswerIndex === null) && onAnswerSelected(a, ii)}
                    key={ii}
                    className={selectedAnswer ? "tick" : "cross"}
                    style={{ color: selectedAnswerIndex !== null && (a === questions[activeQuestion].correct_answer ? "#2ecc71" : "darksalmon") }}
                >{decryptJson(a)}{selectedAnswerIndex && <span className={!(a === questions[activeQuestion].correct_answer) ? "cross" : "tick"}>{a === questions[activeQuestion].correct_answer ? <FaCheck /> : <RxCross1 />}</span>}</h3>
            )}
        </div>
    )
}

export default Choices;
