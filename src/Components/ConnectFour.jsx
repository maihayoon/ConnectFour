import React, { useState } from "react";
import "./ConnectFour.css";
import Board from "./Board.jsx";
import ColorPlayer from "./ColorPlayer.jsx";

function ConnectFour() {

    const [winner, setWinner] = useState(null);
    const [row, setRow] = useState("");
    const [col, setCol] = useState("");
    const [board, setBoard] = useState([]);







    function CooseSize() {
        const r = Number(row);
        const c = Number(col);


        if (r < 6 || r > 15) {
            alert("מספר השורות חייב להיות בין 6 ל-15");
            return;
        }

        if (c < 7 || c > 15) {
            alert("מספר העמודות חייב להיות בין 7 ל-15");
            return;
        }

        const newBoard = [];

        for (let i = 0; i < r; i++) {
            let row = [];

            for (let j = 0; j < c; j++) {
                row.push({ value: "", color: null});
            }

            newBoard.push(row); // מוסיף את השורה ללוח
        }


        setBoard(newBoard);
        setWinner(null);

        // ❗ איפוס השדות
        setRow("");
        setCol("");
    }


    return (
        <div>
            <h1>ארבע בשורה</h1>
            {board.length === 0 && (
                <div>
                    <ColorPlayer

                    />

                    <div >
                        <input
                            type="number"
                            placeholder="הכנס את כמות השורות"
                            value={row}
                            onChange={(e) => setRow(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="הכנס את כמות העמודות"
                            value={col}
                            onChange={(e) => setCol(e.target.value)}
                        />

                        <button
                            disabled={row.trim() === "" || col.trim() === ""}
                            onClick={CooseSize}
                        >
                            edd
                        </button>
                    </div>
                </div>
            )}

            {/* מציגים לוח רק אם כבר נבנה */}
            {board.length > 0 && (
                <Board
                    board={board}
                    setBoard={setBoard}
                    winner={winner}
                    setWinner={setWinner}
                />
            )}
        </div>
    );
}

export default ConnectFour;
