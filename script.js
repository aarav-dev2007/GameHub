let current='X';
let end=false;
let mode='pvp';

function start(chosen){
    mode= chosen;
    loadGame('tictactoe');
}


function cpuMove(){
    const cells = document.querySelectorAll(".cell");
    const combos=[
        [0,1,2],[3,4,5],[6,7,8], 
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]
    ];

    for (let combo of combos){
        const[a,b,c]=combo;
        
        if(
            (cells[a].innerText==='X' && cells[b].innerText==='X' && cells[c].innerText==='') ||
            (cells[a].innerText==='X' && cells[b].innerText==='' && cells[c].innerText==='X') ||
            (cells[a].innerText==='' && cells[b].innerText==='X' && cells[c].innerText==='X')
        ){
            if (cells[a].innerText==='') return Turn(cells[a]);
            if (cells[b].innerText==='') return Turn(cells[b]);
            if (cells[c].innerText==='') return Turn(cells[c]);
        }
    }

    let empty=[];
    for (let i=0;i<cells.length;i++){
        if (cells[i].innerText===""){
            empty.push(cells[i]);
        }
    }
    if (empty.length===0){
        return;}
    let randomIndex = Math.floor(Math.random() * empty.length);
    let chosenCell = empty[randomIndex];

    Turn(chosenCell);
    
}

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
            cells[a].style.backgroundColor='rgba(20, 255, 200, 0.6)';
            cells[b].style.backgroundColor='rgba(20, 255, 200, 0.6)';
            cells[c].style.backgroundColor='rgba(20, 255, 200, 0.6)';


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

    if (current === 'X'){
        cell.style.color = "#6a4c93";
    }
    else{
        cell.style.color = "#e76f51";
    }

    if (Winner()){
        end=true;
        return;
    }

    const cells=document.querySelectorAll(".cell");
    let fill=true;
    for (let i = 0; i<cells.length; i++){
        if (cells[i].innerText === ""){
            fill=false;
            break;
        }
    }

    if (fill){
        const status=document.getElementById("status");
        status.innerText="It's a Draw!";
        end=true;
        return;
    }

    if (current==='X'){
        current='O';
    }
    else{
        current='X'
    }

    const status=document.getElementById("status");
    status.innerText=current + "'s Turn";

    if(mode === "cpu" && current==='O' && !end){
        cpuMove();
    }
}

function restart(){
    const cells = document.querySelectorAll(".cell");
    const status= document.getElementById("status");

    for (let i=0; i<cells.length; i= i+1){
        cells[i].style.backgroundColor =" rgba(255,255,255,0.6)";
        cells[i].innerText='';
    }

    current = 'X';
    end = false;
    status.innerText = "X's Turn";
}