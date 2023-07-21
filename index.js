let gamePattern = [];
let userClickedPattern = [];

let buttonColors = ['red', 'blue', 'green', 'yellow'];

let started = false;
let level = 0;

$('.btn').on('click', handleClick);

$(document).on('keydown', handleKeydown);

function handleClick() {
  let userChosenColor = $(this).attr('id');

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function handleKeydown() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

function checkAnswer(level) {
  if (gamePattern[level] === userClickedPattern[level]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    let audio = new Audio('./sounds/wrong.mp3');
    audio.play();

    $('body').addClass('game-over');

    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Game Over, Pess Any Key to Restart');

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

function nextSequence() {
  userClickedPattern = [];

  level++;

  $('h1').text('Level ' + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  let randomChosenSound = './sounds/' + name + '.mp3';

  let audio = new Audio(randomChosenSound);
  audio.play();
}

function animatePress(color) {
  $('#' + color).addClass('pressed');

  setTimeout(() => {
    $('#' + color).removeClass('pressed');
  }, 100);
}
