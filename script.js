let current='X';
let startTime=0;
let timeout=null;
let waiting = false;
let end=false;
let mode='pvp';
let scores={
    ttt: {
        pvp: {X:0, O:0, draw:0},
        cpu: {player:0, cpu:0, draw:0}
    },
    rps: {player:0, cpu:0},
    reaction: {best:null}
};


function startReaction(){
    const box=document.getElementById("reaction-box");
    box.innerText='Wait...';
    box.style.backgroundColor='#f4a261';
    waiting = true;
    timeout=setTimeout(function(){
        box.innerText='CLICK!';
        box.style.backgorundColor='green';
        startTime=Date.now();
        waiting=false;
    }, Math.random()*2000 + 1000);
    
}



function start(chosen){
    mode= chosen;
    loadGame('tictactoe');
}


function updatescores(game){
    const scoreDiv = document.getElementById("scores");
    if (game === 'tictactoe'){
        if (mode==='pvp'){
            scoreDiv.innerHTML=
            "<p>X Wins: "+scores.ttt.pvp.X + "</p>"+
            "<p>O Wins: "+scores.ttt.pvp.O + "</p>"+
            "<p>Draws: "+scores.ttt.pvp.draw + "</p>";}
        else if (mode==='cpu'){
            scoreDiv.innerHTML=
            "<p>You: "+scores.ttt.cpu.player + "</p>"+
            "<p>Computer: "+scores.ttt.cpu.cpu + "</p>"+
            "<p>Draws: "+scores.ttt.cpu.draw + "</p>";
        }
    }
    else if (game==='rps'){
        scoreDiv.innerHTML=
        "<p>You: "+scores.rps.player + "</p>"+
        "<p>Computer: "+scores.rps.cpu + "</p>";
    }
    else if (game==='reaction'){
        let best=scores.reaction.best;
        if (best===null){
            scoreDiv.innerHTML='<p>Best Time: --</p>';
        }else{
            scoreDiv.innerHTML='<p>Best Time: '+best+' ms</p>'
        }
    }
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
                (cells[a].innerText==='O' && cells[b].innerText==='O' && cells[c].innerText==='') ||
        (cells[a].innerText==='O' && cells[b].innerText==='' && cells[c].innerText==='O') ||
        (cells[a].innerText==='' && cells[b].innerText==='O' && cells[c].innerText==='O')
        ){
            if (cells[a].innerText==='') return Turn(cells[a]);
        if (cells[b].innerText==='') return Turn(cells[b]);
        if (cells[c].innerText==='') return Turn(cells[c]);
        }
        }

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
    document.getElementById("scorecard").classList.remove("hidden");
    updatescores(game);

    if (game=== "tictactoe") {
        area.innerHTML=`
        <h2>Tic Tac Toe</h2>
        <div class="mode-select">
            <button onclick="start('pvp')">Player vs Player</button>
            <button onclick="start('cpu')">Vs Computer</button></div>
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
    else if (game === "reaction") {
        area.innerHTML=`
        <h2>Reaction Time Tester</h2>
        <div id="reaction-box">Click Start</div>
        <button onclick='startReaction()'>Start</button>`;
        updatescores('reaction');
    }
    else if (game === 'rps') {
        area.innerHTML=`
        <h2>Rock Paper Scissors</h2>
        <h3 id="rps-status">Choose your move</h3>
        <div class="rps-buttons">
            <button onclick="playRPS('rock')">Rock</button>
            <button onclick="playRPS('paper')">Paper</button>
            <button onclick="playRPS('scissors')">Scissors</button>
        </div>

        <div class = 'rps-display'>
            <div class='box'>
                <p>You</p>
                <div id='player-move' class='move-box'>?</div>
            </div>
            <div class='box'>
                <p>CPU</p>
                <div id='cpu-move' class='move-box'>?</div>
            </div>
        </div>`
    }
}


function playRPS(playerChoice){
    const choices=['rock','paper','scissors'];
    const cpuChoice=choices[Math.floor(Math.random()*3)];
    const status = document.getElementById("rps-status");

    const icons = {
        rock: "🪨",
        paper: "📄",
        scissors: "✂️"
    };

    const playerBox=document.getElementById("player-move");
    const cpuBox=document.getElementById("cpu-move");
    playerBox.innerText=icons[playerChoice];
    cpuBox.innerText=icons[cpuChoice];

    if (playerChoice===cpuChoice){
        status.innerText="Draw! Both chose "+playerChoice;
    }
    else if(
        (playerChoice==='rock' && cpuChoice==='scissors')||
        (playerChoice==='paper' && cpuChoice==='rock')||
        (playerChoice==='scissors' && cpuChoice==='paper')
    ){
        status.innerText='You Win! CPU chose ' + cpuChoice;
        scores.rps.player++;
    }
    else{
        status.innerText='You Lose! CPU Chose '+ cpuChoice;
        scores.rps.cpu++;
    }
    updatescores('rps');
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

            let winner=cells[a].innerText;
            status.innerText = winner + " Wins!";
            if (mode==='pvp'){
                if (winner==='X'){
                    scores.ttt.pvp.X++;
                }
                else{
                    scores.ttt.pvp.O++;
                }}
            else if(mode==='cpu'){
                if (winner==='X'){
                    scores.ttt.cpu.player++;
                }
                else{
                    scores.ttt.cpu.cpu++;
                }
            }
            updatescores("tictactoe");
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
        if (mode==='pvp'){
            scores.ttt.pvp.draw++;}
        else{
            scores.ttt.cpu.draw++;
        }
        updatescores("tictactoe");
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

function menu(game){
    const area= document.getElementById("game-area");
    document.getElementById("scorecard").classList.add("hidden");
    if (game === 'tictactoe'){
        area.innerHTML=`
        <h2>Tic Tac Toe</h2>
        <button onclick="start('pvp')">Player vs Player</button>
        <button onclick="start('cpu')">Vs Computer</button>`;
    }
}