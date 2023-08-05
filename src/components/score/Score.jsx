import React from 'react'

const Score = ({result, resultRange, resultRangeClr}) => {
    return (
        <div className="score-range">
            <div className="txt">
                <h3>Score: {result.score}%</h3>
                <h3>Max Score: {100 - (result.correctAnswers + result.wrongAnswers) * 5}%</h3>
            </div>
            <div className="range">
                <div style={{ width: resultRange * 5 + '%', backgroundColor: resultRange > 0 ? resultRangeClr : 'transparent' }} className="ft ft-1"></div>
                {console.log('resultRange,resultRangeClr',resultRange,resultRangeClr)}
            </div>
        </div>
    )
}

export default Score