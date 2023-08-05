const BarCalculation = ({result,questions, setResultRange, setResultRangeClr}) => {
    return (
        <div style={{ display: 'none' }}>
            {(result.correctAnswers + result.wrongAnswers) === questions.length + 1 ? setResultRange(0) : setResultRange(result.correctAnswers + result.wrongAnswers)}
            {(result.correctAnswers + result.wrongAnswers) > 14 && (result.correctAnswers > 14) ? setResultRangeClr("#2ecb71") : setResultRangeClr("#f89e68")}
            {(result.correctAnswers + result.wrongAnswers) > 14 && (result.correctAnswers > 9 && result.wrongAnswers > 4) ? setResultRangeClr("yellow") : setResultRangeClr("#f89e68")}
        </div>
    )
}

export default BarCalculation;