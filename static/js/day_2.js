function checkDate(correctDate) {
    const dateInput = document.getElementById('date').value.trim();
    if(dateInput == correctDate) {
        alert('Správně!');
    }
    else {
        diff = Math.abs(new Date(dateInput) - new Date(correctDate)) / (1000 * 60 * 60 * 24);
        alert('Byla jsi o ' + diff + ' dnů vedle.');
    }
    let dateForm = document.querySelector('form');
    dateForm.remove();
    let image = document.querySelector('img');
    image.remove();
    let playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Hrej Znovu';
    playAgainButton.addEventListener('click', () => {
        location.reload();
    });
    document.querySelector('main').appendChild(playAgainButton);
}