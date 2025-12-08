import React from "react";
import "./ConnectFour.css";

function Board({ board }) {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div className="board-row" key={rowIndex}>

                    {/* כאן התחיל השינוי - פתחנו בלוק קוד רגיל */}
                    {row.map((cell, colIndex) => {

                        // 1. קודם כל מגדירים את המחלקה הבסיסית
                        let myClassName = "col";

                        // 2. בדיקה פשוטה: האם יש צבע לתא הזה?
                        if (cell.color !== null) {
                            // אם כן, נוסיף לו את שם הצבע (למשל: "col player-red")
                            myClassName = "col player-" + cell.color;
                        }


                        // 3. מחזירים את ה-div עם השם שבחרנו
                        return (
                            <div
                                key={colIndex}
                                className={myClassName}
                            />
                        );
                    })}


                </div>
            ))}
        </div>
    );
}

export default Board;