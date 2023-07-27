let playersJson = [];
let getTypePlayer = (value) => {
    let PlayerName = document.querySelector(".inputPlayerName").value;
    let noSpacing = PlayerName.split(" ").join("");

    if (noSpacing !== "") {
        if (playersJson.length == 0) {
            playersJson.push({
                name: PlayerName,
                playerSelected: value,
            });

            let settingPlayer = document.querySelector(".player" + value);

            settingPlayer.innerHTML = " Player " + 1 + ": " + PlayerName;
            let btnpO = document.querySelector(".s_player_one");
            let btnpT = document.querySelector(".s_player_two");
            btnpO.disabled = true
            btnpT.disabled = true
        } else {


            playersJson.forEach((el) => {
                //need verification with server
                
                console.log(playersJson.some(e => e.Name !== value))
                if (playersJson.some(e => e.playerSelected !== value)) {
                    
                        playersJson.push({
                            name: PlayerName,
                            playerSelected: value,
                        });

                        let settingPlayer = document.querySelector(".player" + value);

                        settingPlayer.innerHTML = " Player " + 1 + ": " + PlayerName;
                    
                } else {
                     alert("cannot select player "+value);
                    console.log(playersJson);
                }
            });
        }
    } else {
        alert("pseudo invalid");
    }
};
let SelectCaseType = () => { };
