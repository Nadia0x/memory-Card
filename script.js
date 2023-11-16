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
