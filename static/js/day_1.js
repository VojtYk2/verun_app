let selectedSquare = [null, null];
let symbol = null;
let turn = true;

function fillSquare(num) {
    let square = document.getElementsByTagName('td')[num];
    if(square.innerHTML.trim() === '') {
        square.innerHTML = '<img src="/static/img/heart.png" alt="${symbol}"></img>';
    }
}

function markSquare(row, col, symbol) {
    if(!turn) {
        return;
    }
    if(selectedSquare[0] !== null && selectedSquare[1] !== null) {
        if(selectedSquare[0] === row && selectedSquare[1] === col) {
            selectedSquare = [null, null];
            let square = document.getElementsByTagName('td')[row * 4 + (col + 0)];
            square.innerHTML = '';
        }
    }
    else {
        fillSquare(row * 4 + col);
        selectedSquare = [row, col];

    }
}

function play() {
    if(selectedSquare[0] !== null && selectedSquare[1] !== null) {
        turn = false;
        fetch('/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectedSquare: selectedSquare
            })
        })
        .then(response => response.json())

        selectedSquare = [null, null];

    }
}

function init() {
    console.log('hello');

    for(i = 0; i < state.length; i++) {
        console.log('filled');
        if(state[i] === 1) {
            fillSquare(i);
            console.log('filled');
        }
    }
}

window.onload = init;