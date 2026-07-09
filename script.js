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
        <div class="cell" onclick="Turn(this)"></div>`;
    }
    else if (game == "snake") {
        area.innerHTML="<h2>Snake coming soon</h2>";
    }
    else if (game == 'rps') {
        area.innerHTML="<h2>Rock Paper Scissors coming soon</h2>"
    }
}


function Turn(cell) {
    cell.innerText = "X";
}