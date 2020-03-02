const input = document.getElementById('input');
const scrambleContainer = document.getElementsByClassName('scramble')[0];
const descrambleContainer = document.getElementsByClassName('descramble')[0];
const resultContainers = document.getElementsByClassName('result');

input.addEventListener('input', () => {
    scrambleContainer.innerHTML = null;
    descrambleContainer.innerHTML = null;
    for (i = 0; i < resultContainers.length; i++) {resultContainers[i].innerHTML = null}
    scramble(input.value);
});

input.addEventListener('keydown', e => {
    if (e.keyCode != 48 && e.keyCode != 49 && e.keyCode != 8) {
        e.preventDefault();
    }
});

let lineData = "";

function scramble(data) {
    let scrabledData = [];
    for (i = 0; i < data.length; i++) {
        if (i < 3) {
            scrabledData[i] = data[i];
            lineData = `b[${i + 1}] = ${data[i]} = ${scrabledData[i]}`
        }
        else if (i < 5) {
            scrabledData[i] = data[i] ^ scrabledData[i - 3];
            lineData = `b[${i + 1}] = ${data[i]} ⊕ ${scrabledData[i - 3]} = ${scrabledData[i]}`
        }
        else {
            scrabledData[i] = data[i] ^ scrabledData[i - 3] ^ scrabledData[i - 5];
            lineData = `b[${i + 1}] = ${data[i]} ⊕ ${scrabledData[i - 3]} ⊕ ${scrabledData[i - 5]} = ${scrabledData[i]}`;
        }
        addLine(scrambleContainer, lineData);
    }
    addLine(resultContainers[0], `Результат: ${scrabledData.join('')}`);
    descramble(scrabledData.join(''));
}

function descramble(data) {
    let descrabledData = [];
    for (i = 0; i < data.length; i++) {
        if (i < 3) {
            descrabledData[i] = data[i];
            lineData = `c[${i + 1}] = ${data[i]} = ${descrabledData[i]}`
        }
        else if (i < 5) {
            descrabledData[i] = data[i] ^ data[i - 3];
            lineData = `c[${i + 1}] = ${data[i]} ⊕ ${data[i - 3]} = ${descrabledData[i]}`
        }
        else {
            descrabledData[i] = data[i] ^ data[i - 3] ^ data[i - 5];
            lineData = `c[${i + 1}] = ${data[i]} ⊕ ${data[i - 3]} ⊕ ${data[i - 5]} = ${descrabledData[i]}`;
        }
        addLine(descrambleContainer, lineData);
    }
    addLine(resultContainers[1], `Результат: ${descrabledData.join('')}`);
}

function addLine(where, what) {
    let line = document.createElement('span');
    line.classList.add('line');
    line.innerHTML = what;
    where.append(line);
}