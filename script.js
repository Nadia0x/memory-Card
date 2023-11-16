function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function preloadImages(imageUrls) {
    return Promise.all(imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}}}`));
            img.src = url;
        });
    }));
}

const imageUrls = ['res/image/img.jpg', 'res/image/hh.jpg'];

preloadImages(imageUrls)
    .then(() => {
        initializeGame();
    })
    .catch((error) => {
        console.error(error);
    });

function initializeGame() {
    const maxChances = 3;
    let chancesLeft = maxChances;
    let isGameOver = false;

    const drawings = ['🍎', '🍎', '☃️', '☃️', '⭐', '⭐',];
    const shuffledCards = shuffle([...drawings, ...drawings.slice(0, drawings.length / 7)]);
    let flippedCards = [];
    let isProcessing = false;

const gameBoard = document.getElementById('game-board');
    const chancesLeftElement = document.getElementById('chances-left');
    updateChancesDisplay();

    function updateChancesDisplay() {
        chancesLeftElement.textContent = `Chances left: ${chancesLeft}`;
    }

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    });

    document.getElementById('start-button').addEventListener('click', startGame);

    function startGame() {
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('game-board').style.display = 'grid';
        document.getElementById('background-music').play(); // Play background music
        document.getElementById('background-music').volume = 0.1;
    }

    function flipCard() {
        if (isGameOver || isProcessing || flippedCards.length >= 2 || this.classList.contains('hidden') || this.classList.contains('flipped')) {
            return;
        }

        document.getElementById('flip-sound').play(); // Play flip sound

        this.textContent = this.dataset.card;
        this.style.backgroundColor = '#ffd700';
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            isProcessing = true;
            setTimeout(checkMatch, 500);
        }
    }
    
function checkMatch () {
    const [card1,card2] = flippedCards;

    if (card1.dataset.card === card2.dataset.card) {
        card1.removeEventListener('click',flipCard);
        card2.removeEventListene('click',flipCard);
        card1.classList.add('hidden','matched');
        card2.classList.add('hidden','matched');
        document.getElementById('correct-sound').play();
    } else { 
       card1.textContent =//'';
       card2.textContent = '';
        document.getElementById('loss-sound').play();

      setTimeout(() => {
        card1.style.backgroundImage = //"url('img.jpg')";
        card2.style.backgroundImage = //"url('img.jpg')";
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
          }, 500);

         chancesLeft--;
         updateChancesDisplay();

    }
    
    card1.style.transform = 'rotateY(0deg)';
    card2.style.transform = 'rotateY(0deg)';

    flippedCards = [];
    isProcessing = false;
    
    if  (document.querySelectorAll('.card:not(.hidden)'). length === 0)  {
        alert('Congratulations! You won!');
    } else if  (chancesLeft === 0)  {
       isGameOver = true;
        alert('Game Over. you ran out of chances.');
    }
    }
}
