let current='X';

function loadGame(game){
    const area = document.getElementById("game-area");

    if (game== "tictactoe") {
        area.innerHTML=`
        <h2>Tic Tac Toe</h2>
        <div id="board">
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div></div>`;
    }
    else if (game == "snake") {
        area.innerHTML="<h2>Snake coming soon</h2>";
    }
    else if (game == 'rps') {
        area.innerHTML="<h2>Rock Paper Scissors coming soon</h2>"
    }
}



function Winner(){
    const cells=document.querySelectorAll(".cell");
    const combos=[
        [0,1,2],[3,4,5],[6,7,8], 
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]
    ];

    for (let combo of combos){
        const[a,b,c]=combo;

        if (
            cells[a].innerText &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText
        ){
            alert(cells[a].innerText + " Wins!");
            return true;
        }
    }
    return false;
}


function Turn(cell){
    if (cell.innerText !== ""){
        return;
    }

    cell.innerText=current;

    if (Winner()){
        return;
    }

    if (current==='X'){
        current='O';
    }
    else{
        current='X'
    }
}