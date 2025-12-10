import React, { useState, useEffect } from "react";
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
    const [timeLeft, setTimeLeft] = useState(10);


    function checkWinner(board) {
        const rows = board.length;
        const cols = board[0].length;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const color = board[r][c].color;
                if (!color) continue;


                if (
                    c + 3 < cols &&
                    color === board[r][c + 1].color &&
                    color === board[r][c + 2].color &&
                    color === board[r][c + 3].color
                )
                    return color;


                if (
                    r + 3 < rows &&
                    color === board[r + 1][c].color &&
                    color === board[r + 2][c].color &&
                    color === board[r + 3][c].color
                )
                    return color;

                if (
                    r + 3 < rows &&
                    c + 3 < cols &&
                    color === board[r + 1][c + 1].color &&
                    color === board[r + 2][c + 2].color &&
                    color === board[r + 3][c + 3].color
                )
                    return color;

                if (
                    r - 3 >= 0 &&
                    c + 3 < cols &&
                    color === board[r - 1][c + 1].color &&
                    color === board[r - 2][c + 2].color &&
                    color === board[r - 3][c + 3].color
                )
                    return color;
            }
        }
        return null;
    }

    useEffect(() => {
        if (board.length === 0 || winner) return;


        setTimeLeft(10);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);

                    setCurrentPlayer((prevPlayer) =>
                        prevPlayer === 1 ? 2 : 1
                    );
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);


        return () => clearInterval(interval);
    }, [currentPlayer, board.length, winner]);

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
            let rowArr = [];

            for (let j = 0; j < c; j++) {
                rowArr.push({ value: "", color: null });
            }

            newBoard.push(rowArr);
        }


        setBoard(newBoard);
        setWinner(null);
        setCurrentPlayer(1);
        setTimeLeft(10);

        setRow("");
        setCol("");
    }

    function handleSelectColo(colIndex) {
        if (winner) {
            return;
        }

        const newBoard = [...board];
        let cellAdded = false;

        for (let r = newBoard.length - 1; r >= 0; r--) {
            if (newBoard[r][colIndex].color === null) {
                newBoard[r][colIndex].color =
                    currentPlayer === 1 ? playerColor1 : playerColor2;
                cellAdded = true;
                break;
            }
        }

        if (cellAdded) {
            const winColor = checkWinner(newBoard);

            if (winColor) {
                setBoard(newBoard);
                setWinner(winColor);
            } else {
                setBoard(newBoard);
                setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
            }
        }
    }

    function handleReset() {
        setBoard([]);
        setWinner(null);
        setCurrentPlayer(1);
        setTimeLeft(10);
    }

    return (
        <div>
            <h1>ארבע בשורה</h1>
            <h3>
                <br/>
                הוראות המשחק – ארבע בשורה
                    <br/>
                ברוכים הבאים למשחק ארבע בשורה!
                        <br/>
                מטרת המשחק היא להיות הראשון שמצליח ליצור רצף של ארבע דיסקיות בצבע שלך.
                <br/>
                תוספות של המשחק בחירת גודל לוח
                <br/>
                טיימר עבור כל תור של 10 שניות
                <br/>
                ובחירת צבע דיסקית
            </h3>


            {winner && (
                <h2 style={{ color: winner }}>
                    The winner is {winner}
                </h2>
            )}

            {!winner && (
                <>
                    <h3>
                        תור שחקן:{" "}
                        <span
                            style={{
                                color:
                                    currentPlayer === 1
                                        ? playerColor1
                                        : playerColor2,
                            }}
                        >
                                    {currentPlayer === 1
                                        ? playerColor1
                                        : playerColor2}
                                </span>
                    </h3>
                    <h4>נותרו {timeLeft} שניות לתור</h4>
                </>
            )}

            {board.length === 0 && (
                <div>
                    <ColorPlayer
                        playerColor1={playerColor1}
                        setPlayerColor1={setPlayerColor1}
                        playerColor2={playerColor2}
                        setPlayerColor2={setPlayerColor2}
                    />

                    <div>
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
                            התחל משחק
                        </button>
                    </div>
                </div>
            )}

            {board.length > 0 && (
                <>
                    <Board
                        board={board}
                        onColumnClick={handleSelectColo}
                    />

                    {(winner || board.length > 0) && (
                        <button
                            onClick={handleReset}
                            style={{ marginTop: "20px", backgroundColor: "gray" }}
                        >
                            חזור להגדרות
                        </button>
                    )}


                </>
            )}
        </div>
    );
}

export default ConnectFour;
