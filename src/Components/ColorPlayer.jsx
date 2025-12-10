
import "./ColorPlayer.css";


function ColorPlayer({playerColor2,setPlayerColor2,playerColor1,setPlayerColor1}) {




    const colors = ["red", "pink", "blue", "green", "purple", "orange"];

    function handleSelectColor(player, color) {

        if (player === 1 && color === playerColor2) {
            alert("הצבע הזה כבר תפוס על ידי שחקן 2");
            return;
        }

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


    return (
        <div>
            <h2>בחרו צבע לכל שחקן</h2>


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




        </div>
    );
}

export default ColorPlayer;




