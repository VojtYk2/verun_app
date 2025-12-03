let sequenceRunning = true;

function start() {
    let buttons = document.querySelectorAll('button');
    let combination = [];
    buttons.forEach(() => {
        combination.push(Math.floor(Math.random() * (3 - 0 + 1)) + 0);
    });
    let initialDelay = 1000;
    let delay = 1000;
    let totalDuration = initialDelay + (delay * combination.length) + 500;
    
    combination.forEach((num, index) => {
        setTimeout(() => {
            if(num === 0) {
                buttons[num].style.backgroundColor = '#ff4b4b';
            } else if(num === 1) {
                buttons[num].style.backgroundColor = '#4b5dff';
            } else if(num === 2) {
                buttons[num].style.backgroundColor = '#cae000';
            } else if(num === 3) {
                buttons[num].style.backgroundColor = '#00ba44';
            }
        }, initialDelay + delay * index);
        setTimeout(() => {
            if(num === 0) {
                buttons[num].style.backgroundColor = '#ff9d9d';
            } else if(num === 1) {
                buttons[num].style.backgroundColor = '#9dbcff';
            } else if(num === 2) {
                buttons[num].style.backgroundColor = '#f6ffca';
            } else if(num === 3) {
                buttons[num].style.backgroundColor = '#b8ffbb';
            }
        }, initialDelay + delay * index + 500);
    });
    
    setTimeout(() => {
        sequenceRunning = false;
    }, totalDuration);
    
    return combination;
}

comb = start();

function press(num) {
    if (sequenceRunning) return;
    
    if(num === comb[0]) {
        comb.shift();
        if(comb.length === 0) {
            alert('Správně!');
            let main = document.querySelector('main');
            main.innerHTML = '';
            let playAgainButton = document.createElement('button');
            playAgainButton.textContent = 'Hrej Znovu';
            playAgainButton.className = 'play-again';
            playAgainButton.onclick = () => {
                location.reload();
            };
            main.appendChild(playAgainButton);
        }
    }
    else {
        alert('Špatně!');
        let main = document.querySelector('main');
        main.innerHTML = '';
        let playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Hrej Znovu';
        playAgainButton.className = 'play-again';
        playAgainButton.onclick = () => {
            location.reload();
        };
        main.appendChild(playAgainButton);
    }
}