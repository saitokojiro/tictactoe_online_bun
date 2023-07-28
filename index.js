let playersJson = [];
let TempScoring = [];
let AllowClick = true
let getTypePlayer = (value, e) => {
  let btnpO = document.querySelector(".s_player_one");
  let btnpT = document.querySelector(".s_player_two");
  btnpO.disabled = true;
  btnpT.disabled = true;

  let valueAdv = value == 1 ? 2 : 1;
  let setPlayer = document.querySelector(".player" + value);
  let setPlayer2 = document.querySelector(".player" + valueAdv);
  setPlayer.innerHTML += " (you)";
  setPlayer.classList.add("you");
  setPlayer2.innerHTML += " (adv)";
  setPlayer2.classList.add("adv");
};


let checkingByRow = (select, findItem) => {
  let counter = 0;
  for (let row of select) {
    let item = row.classList;
    if (item.contains(findItem)) {
      counter++;
      if(counter === 3){
        TempScoring.push({ counter : 3 , player : findItem})
        AllowClick = false
      }
    }
  }
  return counter;
};
let checkingByCol = (arrayCol, arrayPos, findItem) => {
    
  let counter = 0;
  for (let i = 0; i < arrayCol.length; i++) {
    let item = arrayCol[i][arrayPos[i]].classList;
    if (item.contains(findItem)) {
      counter++;
      if(counter === 3){
        console.log("add")
        TempScoring.push({ counter : 3 , player : findItem})
        AllowClick = false
      }
    }
  }
  return counter;
};

let checking = () => {
  let rowOne = document.querySelector(".row_one").children;
  let rowTwo = document.querySelector(".row_two").children;
  let rowThree = document.querySelector(".row_three").children;

  /**
   * You
   */
  //row
  /*checkingByRow(rowOne, "YouAdd");
  checkingByRow(rowTwo, "YouAdd");
  checkingByRow(rowThree, "YouAdd");*/
  checkingByCol([rowOne, rowOne, rowOne], [0, 1, 2], "YouAdd");
  checkingByCol([rowTwo, rowTwo, rowTwo], [0, 1, 2], "YouAdd");
  checkingByCol([rowThree, rowThree, rowThree], [0, 1, 2], "YouAdd");

  //col
  checkingByCol([rowOne, rowTwo, rowThree], [0, 0, 0], "YouAdd");
  checkingByCol([rowOne, rowTwo, rowThree], [1, 1, 1], "YouAdd");
  checkingByCol([rowOne, rowTwo, rowThree], [2, 2, 2], "YouAdd");

  //diag
  checkingByCol([rowOne, rowTwo, rowThree], [0, 1, 2], "YouAdd");
  checkingByCol([rowOne, rowTwo, rowThree], [2, 1, 0], "YouAdd");

  /**
   * ADV
   */
  //row
  checkingByRow(rowOne, "advAdd");
  checkingByRow(rowTwo, "advAdd");
  checkingByRow(rowThree, "advAdd");

  //col
  checkingByCol([rowOne, rowTwo, rowThree], [0, 0, 0], "advAdd");
  checkingByCol([rowOne, rowTwo, rowThree], [1, 1, 1], "advAdd");
  checkingByCol([rowOne, rowTwo, rowThree], [2, 2, 2], "advAdd");

  //diag
  checkingByCol([rowOne, rowTwo, rowThree], [0, 1, 2], "advAdd");
  checkingByCol([rowOne, rowTwo, rowThree], [2, 1, 0], "advAdd");


  console.log(TempScoring)

  console.log("ok")
  // rowOne.children
};


let SelectCaseType = (e) => {
    let youPlayer = document.querySelector(".you");
  
    if (youPlayer !== null) {
        if(AllowClick == true)
        {
      if (youPlayer.classList[0] == "player1") {
        if (e.target.innerHTML === "") {
          e.target.innerHTML = "X";
          e.target.classList.add("YouAdd");
          checking()
          
          console.log(e.target);
        }
      } else {
        if (e.target.innerHTML === "") {
          e.target.innerHTML = "O";
          e.target.classList.add("YouAdd");
          checking()
          console.log(e.target);
        }
        }
      }
    } else {
      alert("you have not select");
    }
  };