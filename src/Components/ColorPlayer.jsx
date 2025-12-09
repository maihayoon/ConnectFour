
import "./ColorPlayer.css";
// בעתיד תשתמש בזה
// import Board from "./Board.jsx";

function ColorPlayer({playerColor2,setPlayerColor2,playerColor1,setPlayerColor1,currentPlayer, setCurrentPlayer}) {




    const colors = ["red", "pink", "blue", "green", "purple", "orange"];

    function handleSelectColor(player, color) {
        // אם שחקן 1 מנסה לבחור את הצבע של שחקן 2
        if (player === 1 && color === playerColor2) {
            alert("הצבע הזה כבר תפוס על ידי שחקן 2");
            return;
        }

        // אם שחקן 2 מנסה לבחור את הצבע של שחקן 1
        if (player === 2 && color === playerColor1) {
            alert("הצבע הזה כבר תפוס על ידי שחקן 1");
            return;
        }

        if (player === 1) {
            setPlayerColor1(color);
        } else {
            setPlayerColor2(color);
        }
    }

    function nextTurn() {
        setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    }

    const bothColorsChosen = playerColor1 && playerColor2;


    return (
        <div>
            <h2>בחרו צבע לכל שחקן</h2>

            {/* שחקן 1 */}
            <div>
                <h3>
                    שחקן 1:{" "}
                    {playerColor1 ? playerColor1 : "עדיין לא נבחר צבע"}
                </h3>


                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => handleSelectColor(1, color)}
                        disabled={playerColor2 === color}
                    >
                        {color}
                    </button>
                ))}
            </div>

            <hr/>

            {/* שחקן 2 */}
            <div>
                <h3>
                    שחקן 2:{" "}
                    {playerColor2 ? playerColor2 : "עדיין לא נבחר צבע"}
                </h3>

                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => handleSelectColor(2, color)}
                        disabled={playerColor1 === color}
                    >
                        {color}
                    </button>
                ))}
            </div>

            {/* תור המשחק – מוצג רק אם לשניהם יש צבע */}
            {bothColorsChosen && (
                <div style={{marginTop: "16px"}}>
                    <p>התור של שחקן {currentPlayer}</p>
                    <button onClick={nextTurn}>החלף תור</button>
                </div>
            )}
        </div>
    );
}

export default ColorPlayer;




