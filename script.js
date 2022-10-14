const parentTimer = document.querySelector('.timer');
const item = document.querySelectorAll('.timer .content .item');
const hoursValue = document.querySelectorAll('.timer .content .hours .value');
const minutesValue = document.querySelectorAll('.timer .content .minutes .value');
const secondsValue = document.querySelectorAll('.timer .content .seconds .value');
const startPanel = document.querySelector('.timer .start');
const startButton = document.querySelector('.timer .start button');
const content = document.querySelector('.timer .content');
const displayTimePanel = document.querySelector('.timer .displayTime');
const displayTime = document.querySelector('.timer .displayTime span');
const replaceButton = document.querySelector('.timer .replaceButton');
const alarm = new Audio('sound/zvonok.mp3');
let hoursCurrent = 0;
let minutesCurrent = 0;
let secondsCurrent = 0;
item.forEach((elem) => { // hours, minutes, seconds
    elem.addEventListener('click', () => elem.classList.toggle('active')); // open bottom panel
    elem.addEventListener('mouseleave', () => elem.classList.remove('active')); // close bottom panel
    for (let i = 0; i < elem.children[2].children.length; i++) { // for bottom panel numbers
        elem.children[2].children[i].onclick = () => { // click in numbers
            elem.children[1].innerText = elem.children[2].children[i].innerText;
        }
    }
});
startButton.onclick = () => {
    hoursCurrent = hoursValue[0].innerText;
    minutesCurrent = minutesValue[0].innerText;
    secondsCurrent = secondsValue[0].innerText;
    if (secondsCurrent > 0 || hoursCurrent > 0 || minutesCurrent > 0) {
        content.style = 'opacity: 0; transform: translateY(-100px)';
        startPanel.style = 'opacity: 0; transform: translateY(50px)';
        displayTimePanel.style.opacity = 1; // transition 2sec delay
        startButton.style.pointerEvents = 'none';
        timerStart();
    }
}
function timerStart() {
    let timer = setInterval(() => {
        secondsCurrent--;
        if (secondsCurrent < 0 && minutesCurrent > 0) {
            minutesCurrent--;
            secondsCurrent = 59;
        } else if (secondsCurrent < 0 && minutesCurrent == 0 && hoursCurrent > 0) {
            hoursCurrent--;
            minutesCurrent = 59;
            secondsCurrent = 59;
        }
        let hrs = hoursCurrent < 10 ? '0' + hoursCurrent : hoursCurrent;
        let min = minutesCurrent < 10 ? '0' + minutesCurrent : minutesCurrent;
        let sec = secondsCurrent < 10 ? '0' + secondsCurrent : secondsCurrent;
        displayTime.innerText = `${hrs}:${min}:${sec}`;
        if (secondsCurrent == 0 && hoursCurrent == 0 && minutesCurrent == 0) {
            clearInterval(timer);
            displayTime.style.color = 'red';
            parentTimer.style.animation = 'timerEnd 1s ease-in-out forwards';
            replaceButton.style.display = 'block';
            alarm.play();
        }
    }, 1000);
}
replaceButton.addEventListener('click', () => window.location.reload());







