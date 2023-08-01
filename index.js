let ip = "172.20.12.101"
let port = 3090
let ws = new WebSocket("ws://"+ ip +":"+port);

let playersJson = [];
let TempScoring = [];
let AllowClick = true;
let togglePlayer = true;



let dataC = document.querySelector(".ping");
dataC.addEventListener("click", event => {
  ws.send(JSON.stringify({ ping: "pong" }));
});

let getTypePlayer = (value, e) => {
  let btnpO = document.querySelector(".s_player_one");
  let btnpT = document.querySelector(".s_player_two");
  btnpO.disabled = true;
  btnpT.disabled = true;

  let valueAdv = value == 1 ? 2 : 1;

  value == 1 ? (togglePlayer = true) : (togglePlayer = false);

  let setPlayer = document.querySelector(".player" + value);
  let setPlayer2 = document.querySelector(".player" + valueAdv);
  setPlayer.innerHTML += " (you)";
  setPlayer.classList.add("you");
  setPlayer2.innerHTML += " (adv)";
  setPlayer2.classList.add("adv");

  let playerId = document.querySelector(".CplayerId").innerHTML;

  let PlayerSend = {
    type: "type_select",
    playerID: playerId,
    playerValue: value,
    playerAdv: valueAdv
  };
  ws.send(JSON.stringify(PlayerSend));
};

let checkingByRow = (select, findItem, player) => {
  let counter = 0;
  for (let row of select) {
    let item = row.classList;
    if (item.contains(findItem)) {
      counter++;
      if (counter === 3) {
        TempScoring.push({ counter: 3, player: findItem });
        alert("winner is : " + player);
        AllowClick = false;
      }
    }
  }
  return counter;
};
let checkingByCol = async (arrayCol, arrayPos, findItem, player) => {
  let counter = 0;
  for (let i = 0; i < arrayCol.length; i++) {
    let item = arrayCol[i][arrayPos[i]].classList;
    if (item.contains(findItem)) {
      counter++;
      if (counter === 3) {
        console.log("add");
        TempScoring.push({ counter: 3, player: findItem });
        AllowClick = false;
        setTimeout(() => {
          if (findItem == "YouAdd") {
            alert(
              "winner is : " +
                document.querySelector(".you").innerHTML.replace("(you)", "")
            );
          } else {
            alert(
              "winner is : " +
                document.querySelector(".adv").innerHTML.replace("(adv)", "")
            );
          }
        }, 500);
      }
    }
  }
  return counter;
};

let groupChecking = async (name, player) => {
  let rowOne = document.querySelector(".row_one").children;
  let rowTwo = document.querySelector(".row_two").children;
  let rowThree = document.querySelector(".row_three").children;

  //row
  checkingByCol([rowOne, rowOne, rowOne], [0, 1, 2], name, player);
  checkingByCol([rowTwo, rowTwo, rowTwo], [0, 1, 2], name);
  checkingByCol([rowThree, rowThree, rowThree], [0, 1, 2], name, player);

  //col
  checkingByCol([rowOne, rowTwo, rowThree], [0, 0, 0], name, player);
  checkingByCol([rowOne, rowTwo, rowThree], [1, 1, 1], name, player);
  checkingByCol([rowOne, rowTwo, rowThree], [2, 2, 2], name, player);

  //diag
  checkingByCol([rowOne, rowTwo, rowThree], [0, 1, 2], name, player);
  checkingByCol([rowOne, rowTwo, rowThree], [2, 1, 0], name, player);
};

let checking = () => {
  /**
   * You
   */
  groupChecking("YouAdd", "Joueur 1");
  /**
   * ADV
   */ groupChecking("AdvAdd", "Joueur 2");

  console.log(TempScoring);

  console.log("ok");
  // rowOne.children
};

let SelectCaseType = e => {
  let youPlayer = document.querySelector(".you");
  let advPlayer = document.querySelector(".adv");

  if (youPlayer !== null) {
    if (AllowClick == true) {
      if (true) {
        togglePlayer = true;
        let playerId = document.querySelector(".CplayerId").innerHTML;
        if (youPlayer.classList[0] == "player1") {
          if (e.target.innerHTML === "") {
            e.target.innerHTML = "X";
            e.target.classList.add("YouAdd");
           

            let sendInfoGame = {
              type: "type_Game",
              playerID: playerId,
              playerPos : "player1",
              row_case: e.target.classList[2],
              key: "X"
            }
            ws.send(JSON.stringify(sendInfoGame));
            setTimeout(() => {
              checking();
            }, 200);
            

            console.log(e.target);
          }
        } else {
          if (e.target.innerHTML === "") {
            e.target.innerHTML = "O";
            e.target.classList.add("YouAdd");
            let sendInfoGame = {
              type: "type_Game",
              playerID: playerId,
              playerPos : "player2",
              row_case: e.target.classList[2],
              key: "O"
            }
            ws.send(JSON.stringify(sendInfoGame));
            setTimeout(() => {
              checking();
            }, 200);
            console.log(e.target);
          }
        }
      } else {
        togglePlayer = true;
        /*if (advPlayer.classList[0] == "player1") {
          if (e.target.innerHTML === "") {
            e.target.innerHTML = "X";
            e.target.classList.add("AdvAdd");
            checking();

            console.log(e.target);
          }
        } else {
          if (e.target.innerHTML === "") {
            e.target.innerHTML = "O";
            e.target.classList.add("AdvAdd");
            checking();
            console.log(e.target);
          }
        }*/
      }
    }
  } else {
    alert("you have not select");
  }
};



ws.onopen = event => {
  // ws.send("player " + Math.floor(Math.random()* (10-5)+5))
  console.log(event);
};
ws.onmessage = event => {
  console.log(event);
  console.log(typeof event);
  if (typeof event == "object") {
    let msgData = JSON.parse(event.data);
    console.log(msgData);

    if (msgData.f_connection == true) {
      console.log(msgData.f_connection);
      document.querySelector(".CplayerId").innerHTML = msgData.playerId;
    }
    if (msgData.f_connection == false) {
      if (msgData.type == "type_select") {
        console.log("ok");
        let btnpO = document.querySelector(".s_player_one");
        let btnpT = document.querySelector(".s_player_two");
        btnpO.disabled = true;
        btnpT.disabled = true;

        let setPlayer = document.querySelector(".player" + msgData.playerAdv);
        let setPlayer2 = document.querySelector(
          ".player" + msgData.playerValue
        );
        setPlayer.innerHTML += " (you)";
        setPlayer.classList.add("you");
        setPlayer2.innerHTML += " (adv)";
        setPlayer2.classList.add("adv");
      }
      if(msgData.type == "type_Game") {
        
        let caseArray = document.querySelector("."+ msgData.row_case)
        console.log(msgData.row_case)
        console.log(caseArray)
       caseArray.innerHTML = msgData.key
       caseArray.classList.add("AdvAdd")
       setTimeout(() => {
        checking();
      }, 200);
        
      }
    }
  } else {
    console.log("not");
  }
};