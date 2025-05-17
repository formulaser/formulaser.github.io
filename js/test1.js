let rightAud = new Audio();
rightAud.src = './sounds/right.mp3';
let unrightAud = new Audio();
unrightAud.src = './sounds/unright.mp3';
let gameOver = new Audio();
gameOver.src = './sounds/game_over.mp3';


document.getElementById('timer').style.cursor = 'pointer'
let m = 1;
let s = 0;
let ms = 0;
let mst = "00";
let st = "00";
let mt = "00";
let timer;
let isStarted = false;
let hps = 5;

let quest;
let ans1;
let ans2;
let ans3;
let ans4;
let right_answer;

function TimeUpd() {
    if ((ms == 0) && (s > 0 || m > 0)) {
        ms = 99;
        if (s == 0 && m > 0) {
            s = 59;
            if (m > 0) {
                m--;
            }
        }
        else s--;

    }


    if (m <= 0 && s <= 0 && ms <= 0) {
        Analiz();
    }

    if (ms <= 9) mst = `0${ms}`
    else mst = ms
    if (s <= 9) st = `0${s}`
    else st = s
    if (m <= 9) mt = `0${m}`
    else mt = m
    document.getElementById('timer').textContent = `${mt}:${st}.${mst}`;
    ms--;
}

function Start_timer() {
    GenerateQuest();
    document.getElementById('answer1').disabled = false;
    document.getElementById('answer2').disabled = false;
    document.getElementById('answer3').disabled = false;
    document.getElementById('answer4').disabled = false;
    document.getElementById('answer1').style.background = '#ffffffb6';
    document.getElementById('answer2').style.background = '#ffffffb6';
    document.getElementById('answer3').style.background = '#ffffffb6';
    document.getElementById('answer4').style.background = '#ffffffb6';
    isStarted = true;
    document.getElementById('timer').style.cursor = 'default'
    timer = setInterval(() => {
        TimeUpd();
    }, 10);


}

function Analiz() {
    clearInterval(timer);
    document.getElementById('timer').style.cursor = 'pointer';
}

document.getElementById('timer').addEventListener('click', () => {
    if (isStarted == false) {
        Start_timer();
        hps = 5;
        document.getElementById(`hp1`).src = '/images/heart_red.png'
        document.getElementById(`hp2`).src = '/images/heart_red.png'
        document.getElementById(`hp3`).src = '/images/heart_red.png'
        document.getElementById(`hp4`).src = '/images/heart_red.png'
        document.getElementById(`hp5`).src = '/images/heart_red.png'
        m = 1
        s = 0
        ms = 0
        gameOver.pause();
        gameOver.currentTime = 0;
    }
})

let a;
let b;
let c;
let x;
let zn;

function GenerateQuest() {
    x = Math.floor(Math.random() * (100 - 3) + 3);
    a = Math.floor(Math.random() * (15 - 2) + 2);
    b = Math.floor(Math.random() * (100 - 3) + 3);
    let r = Math.floor(Math.random() * 2);
    if (r == 0) { zn = "+"; c = (x * a) + b }
    else if (r == 1) { zn = "-"; c = (x * a) - b }
    // else if (r == 2) { zn = "*"; c = (x * a) * b }

    quest = `${a}x ${zn} ${b} = ${c}`;
    right_answer = x;
    ans1 = x + Math.floor(Math.random() * (15 - 1) + 1);
    ans2 = x - Math.floor(Math.random() * (15 - 1) + 1);
    ans3 = ans1 + Math.floor(Math.random() * (10 - 1) + 1);
    ans4 = ans2 - Math.floor(Math.random() * (10 - 1) + 1);

    let r2 = Math.floor(Math.random() * 4);
    if (r2 == 0) ans1 = x
    else if (r2 == 1) ans2 = x
    else if (r2 == 2) ans3 = x
    else if (r2 == 3) ans4 = x

    document.getElementById('quest').innerHTML = quest;
    document.getElementById('answer1').innerHTML = ans1;
    document.getElementById('answer2').innerHTML = ans2;
    document.getElementById('answer3').innerHTML = ans3;
    document.getElementById('answer4').innerHTML = ans4;
}
GenerateQuest();

function CheckAnswer(ide, answ)
{
    if (answ == right_answer) 
    {
        rightAud.currentTime = 0;
        rightAud.play();
        if (s < 50) {
            s += 10;
        }
        else if (s >= 50) {
            s -= 50;
            m++;
        }
        document.getElementById('answer1').disabled = true;
        document.getElementById('answer2').disabled = true;
        document.getElementById('answer3').disabled = true;
        document.getElementById('answer4').disabled = true;
        document.getElementById(ide).style.background = '#90ff86b6';
        setTimeout(() => {
            GenerateQuest();
            document.getElementById('answer1').disabled = false;
            document.getElementById('answer2').disabled = false;
            document.getElementById('answer3').disabled = false;
            document.getElementById('answer4').disabled = false;
            document.getElementById('answer1').style.background = '#ffffffb6';
            document.getElementById('answer2').style.background = '#ffffffb6';
            document.getElementById('answer3').style.background = '#ffffffb6';
            document.getElementById('answer4').style.background = '#ffffffb6';
        }, 1000);
    }
    else
    {
        unrightAud.currentTime = 0;
        unrightAud.play();
        document.getElementById(ide).style.background = '#ff7777b6';
        document.getElementById(ide).disabled = true;
        document.getElementById(`hp${hps}`).src = '/images/heart_black.png'
        hps -= 1;
        if (hps == 0) {
            document.getElementById('timer').style.cursor = 'pointer'
            gameOver.currentTime = 0;
            gameOver.play();
            isStarted = false;
            clearInterval(timer);
            document.getElementById('answer1').disabled = true;
            document.getElementById('answer2').disabled = true;
            document.getElementById('answer3').disabled = true;
            document.getElementById('answer4').disabled = true;
            document.getElementById('timer').textContent = 'ЗАНОВО..';
        }
    }
}

document.addEventListener('click', function(e) {
    if (e.target.id == 'answer1' && isStarted) {
        CheckAnswer('answer1', ans1);
    }
    else if (e.target.id == 'answer2' && isStarted) {
        CheckAnswer('answer2', ans2);
    }
    else if (e.target.id == 'answer3' && isStarted) {
        CheckAnswer('answer3', ans3);
    }
    else if (e.target.id == 'answer4' && isStarted) {
        CheckAnswer('answer4', ans4);
    }
})
