let playersJson = [];
let getTypePlayer = (value, e) => {
    let btnpO = document.querySelector(".s_player_one");
    let btnpT = document.querySelector(".s_player_two");
            btnpO.disabled = true
            btnpT.disabled = true
    
            let valueAdv =  value == 1 ? 2 : 1 
            let setPlayer = document.querySelector(".player"+value);
            let setPlayer2 = document.querySelector(".player"+valueAdv);
            setPlayer.innerHTML += " (you)"
            setPlayer.classList.add("you")
            setPlayer2.innerHTML += " (adv)"
            setPlayer2.classList.add("adv")
            
};
let SelectCaseType = (e) => {
    
    let youPlayer = document.querySelector(".you")
    
    if(youPlayer !== null) {
    if(youPlayer.classList[0] == "player1"){
        if(e.target.innerHTML === "") {
            e.target.innerHTML = "X"
            e.target.classList.add("YouAdd")
            console.log(e.target)
        }
    }else{
        if(e.target.innerHTML === "") {
            e.target.innerHTML = "O"
            e.target.classList.add("YouAdd")
            console.log(e.target)
        }
    }
    }else{
        alert("you have not select")
    }
    
 };


 let checking =() => {
    
 }