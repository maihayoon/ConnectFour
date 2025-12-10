import React from "react";
import "./ConnectFour.css";

function Board({ board, onColumnClick }) {

    if (!board || board.length === 0) {
        return null;
    }

    return (
        <div className="board">



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
