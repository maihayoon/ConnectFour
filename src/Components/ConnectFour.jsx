import React, { useState } from "react";
import "./ConnectFour.css";
import Board from "./Board.jsx";
import ColorPlayer from "./ColorPlayer.jsx";

function ConnectFour() {
    const [playerColor1, setPlayerColor1] = useState(null);
    const [playerColor2, setPlayerColor2] = useState(null);

    const [winner, setWinner] = useState(null);
    const [row, setRow] = useState("");
    const [col, setCol] = useState("");
    const [board, setBoard] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);



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
        setCurrentPlayer(1);// קובע שתמיד שחקן מספר 1 יתחיל


        // ❗ איפוס השדות
        setRow("");
        setCol("");
    }


    function handleSelectColo(colIndex){ // מקבל מהמחלקה של הלוח בתוך החלק של הריטרן
        if(winner){// אם כבר יש מנצח תפסיק את הפעילות של הפונקציה
            return;
        }
        const newBoard = [...board];// מעתיק את הלוח המקורי
        let cellAdded = false; //שומר ערך של FALSE  כדי לבדוק אם הצלחנו למצוא חור פנוי בלוח
        for (let r = newBoard.length - 1; r >= 0; r--) {// לולאה שרצה מהסוף להתחלה כדי לימצוא את החור הפנוי על הלוח
            if (newBoard[r][colIndex].color === null) {// בודק אם האינדקס R בעמודה c
                newBoard[r][colIndex].color = currentPlayer === 1 ? playerColor1 : playerColor2;// בודק למי שייך התור ולפי זה הוא מכניס את הצבע במקום הריק
                cellAdded = true;// מעדכן את הערך כדי להעביר את התור
                break;// עוצר אם הוא מצא
            }
        }
        if (cellAdded) {
            setBoard(newBoard); // מעדכנים את הלוח האמיתי
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);// מעביר את התור
        }

    }


    return (
        <div>
            <h1>ארבע בשורה</h1>
            {board.length === 0 && (
                <div>
                    <ColorPlayer // מעביר את הצבעים למחלקה
                        playerColor1={playerColor1}
                        setPlayerColor1={setPlayerColor1}
                        playerColor2={playerColor2}
                        setPlayerColor2={setPlayerColor2}

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
                    onColumnClick={handleSelectColo}
                    setBoard={setBoard}
                    winner={winner}
                    setWinner={setWinner}

                />
            )}
        </div>
    );
}

export default ConnectFour;
