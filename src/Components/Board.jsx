import React from "react";
import "./ConnectFour.css";

function Board({ board, onColumnClick }) {
    // אם עוד אין לוח – לא מצייר כלום
    if (!board || board.length === 0) {
        return null;
    }

    return (
        <div className="board">


            {/* 🔹 שורת כפתורים מעל הלוח – כפתור לכל עמודה */}
            <div className="board-header">
                {board[0].map((_, colIndex) => (
                    <button
                        key={colIndex}
                        className="col-button"
                        onClick={() => {
                            if (onColumnClick) onColumnClick(colIndex);
                        }}
                    >
                        ↓
                    </button>

                ))}
            </div>

            {/* 🔹 הלוח עצמו */}
            {board.map((row, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {row.map((cell, colIndex) => {


                        return (
                            <div
                                key={colIndex}
                                className="col"

                                style={{ backgroundColor: cell.color }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Board;
