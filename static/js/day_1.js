let flippedSquare1 = [null, null, null];
let flippedSquare2 = [null, null, null];
let wait = false;
let flipped = 0;

function fillSquare(num, data) {
    let square = document.getElementsByTagName('td')[num];
    if(square.innerHTML.trim() === '') {
        if(data === 0) {
            square.innerHTML = '<img src="/static/img/heart1.png" alt="heart1"></img>';
        } else if(data === 1) {
            square.innerHTML = '<img src="/static/img/heart2.png" alt="heart2"></img>';
        }
        else if(data === 2) {
            square.innerHTML = '<img src="/static/img/heart3.png" alt="heart3"></img>';
        }
        else if(data === 3) {
            square.innerHTML = '<img src="/static/img/heart4.png" alt="heart4"></img>';
        }
        else if(data === 4) {
            square.innerHTML = '<img src="/static/img/heart5.png" alt="heart5"></img>';
        }
        else if(data === 5) {
            square.innerHTML = '<img src="/static/img/heart6.png" alt="heart6"></img>';
        }
        else if(data === 6) {
            square.innerHTML = '<img src="/static/img/heart7.jpeg" alt="heart7"></img>';
        }
        else if(data === 7) {
            square.innerHTML = '<img src="/static/img/heart8.jpeg" alt="heart8"></img>';
        }
    }
}

function flipSquare(row, col, data) {
    if(wait) {
        return;
    }
    if(flippedSquare1[0] !== null && flippedSquare1[1] !== null) {
        if(flippedSquare1[0] === row && flippedSquare1[1] === col) {
            return
        }
        fillSquare(row * 4 + col, data);
        flippedSquare2 = [row, col, data];
        wait = true;
        let square1 = document.getElementsByTagName('td')[flippedSquare1[0] * 4 + flippedSquare1[1]];
        let square2 = document.getElementsByTagName('td')[flippedSquare2[0] * 4 + flippedSquare2[1]];
        if(flippedSquare1[2] === flippedSquare2[2]) {
            setTimeout(() => {
                square1.style.visibility = 'hidden';
                square2.style.visibility = 'hidden';
                flipped += 2;
                flippedSquare1 = [null, null, null];
                flippedSquare2 = [null, null, null];
                if(flipped === 16) {
                    let table = document.querySelector('table');
                    table.remove();
                    
                    let playAgainButton = document.createElement('button');
                    playAgainButton.textContent = 'Hrej Znovu';
                    playAgainButton.addEventListener('click', () => {
                        location.reload();
                    });
                    document.querySelector('main').appendChild(playAgainButton);
                }
                wait = false;
            }, 2000);
        }
        else {
            setTimeout(() => {
                square1.innerHTML = '';
                square2.innerHTML = '';
                flippedSquare1 = [null, null, null];
                flippedSquare2 = [null, null, null];
                wait = false;
            }, 2000);
        }
    }
    else {
        fillSquare(row * 4 + col, data);
        flippedSquare1 = [row, col, data];
    }

}