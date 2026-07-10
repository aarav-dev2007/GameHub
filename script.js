let current='X';
let end=false;


function loadGame(game){
    end=false;
    current='X';
    const area = document.getElementById("game-area");

    if (game== "tictactoe") {
        area.innerHTML=`
        <h2>Tic Tac Toe</h2>
        <h3 id="status"></h3>
        <div id="board">
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        <div class="cell" onclick="Turn(this)"></div>
        </div>
        <button class="restart-btn" onclick='restart()'>
        Restart</button>`;
        document.getElementById("status").innerText="X's Turn";
    }
    else if (game == "snake") {
        area.innerHTML="<h2>Snake coming soon</h2>";
    }
    else if (game == 'rps') {
        area.innerHTML="<h2>Rock Paper Scissors coming soon</h2>"
    }
}



function Winner(){
    const status=document.getElementById("status");
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
            status.innerText = cells[a].innerText + " Wins!";
            return true;
        }
    }
    return false;
}


function Turn(cell){

    if(end) {
        return;
    }

    if (cell.innerText !== ""){
        return;
    }

    cell.innerText=current;

    if (Winner()){
        end=true;
        return;
    }

    if (current==='X'){
        current='O';
    }
    else{
        current='X'
    }
}

function restart(){
    const cells = document.querySelectorAll(".cell");
    const status= document.getElementById("status");

    for (let i=0; i<cells.length; i= i+1){
        cells[i].innerText='';
    }

    current = 'X';
    end = false;
    status.innerText = "X's Turn";
}