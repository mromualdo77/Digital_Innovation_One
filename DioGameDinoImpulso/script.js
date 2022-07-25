const pacman = document.querySelector('.pacman');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();

        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            //dino descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 15;
                    pacman.style.bottom = position + 'px';
                }
            }, 15);
        } else {
            //dino subindo
            position += 15;
            pacman.style.bottom = position + 'px';
        }
    }, 15);
}

function createGhost() {
    const ghost = document.createElement('div');
    let ghostPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    ghost.classList.add('ghost');
    background.appendChild(ghost);
    ghost.style.left = ghostPosition + 'px';

    let leftTimer = setInterval(() => {
        if (ghostPosition < -60) {
            //saiu da tela
            clearInterval(leftTimer);
            background.removeChild(ghost);
        } else if (ghostPosition > 0 && ghostPosition < 60 && position <  60) {
            //game over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over"> Fim de Jogo </h1>';
        } else {
            ghostPosition -= 10;
            ghost.style.left = ghostPosition + 'px';
        }
    }, 15);
    setTimeout(createGhost, randomTime);
}

createGhost();
document.addEventListener('keyup', handleKeyUp);