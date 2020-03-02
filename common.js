const input = document.getElementById('input');
const scrambleContainer = document.getElementsByClassName('scramble')[0];
const descrambleContainer = document.getElementsByClassName('descramble')[0];

input.addEventListener('input', () => {
    scrambleContainer.innerHTML = null;
    descrambleContainer.innerHTML = null;
    scramble(input.value);
});

const a = "110110000001";
let lineData = "";

function scramble(data) {
    let scrabledData = [];    
    for (i = 0; i < data.length; i++) {
        if (i < 3) {
            scrabledData[i] = data[i];
            lineData = `b[${i+1}] = ${data[i]} = ${scrabledData[i]}`
        }
        else if (i < 5) {
            scrabledData[i] = data[i] ^ scrabledData[i - 3];
            lineData = `b[${i+1}] = ${data[i]} ⊕ ${scrabledData[i - 3]} = ${scrabledData[i]}`
        }
        else {
            scrabledData[i] = data[i] ^ scrabledData[i - 3] ^ scrabledData[i - 5];
            lineData = `b[${i+1}] = ${data[i]} ⊕ ${scrabledData[i - 3]} ⊕ ${scrabledData[i - 5]} = ${scrabledData[i]}`;
        }
        addLine(scrambleContainer, lineData);
    }
    addLine(scrambleContainer, `Результат: ${scrabledData.join('')}`);
    descramble(scrabledData.join(''));
}

function descramble(data) {
    let scrabledData = [];    
    for (i = 0; i < data.length; i++) {
        if (i < 3) {
            scrabledData[i] = data[i];
            lineData = `c[${i+1}] = ${data[i]} = ${data[i]}`
        }
        else if (i < 5) {
            scrabledData[i] = data[i] ^ data[i - 3];
            lineData = `c[${i+1}] = ${data[i]} ⊕ ${data[i - 3]} = ${data[i]}`
        }
        else {
            scrabledData[i] = data[i] ^ data[i - 3] ^ data[i - 5];
            lineData = `c[${i+1}] = ${data[i]} ⊕ ${data[i - 3]} ⊕ ${data[i - 5]} = ${data[i]}`;
        }
        addLine(descrambleContainer, lineData);
    }
    addLine(descrambleContainer, `Результат: ${scrabledData.join('')}`);
}

function addLine(where, what) {
    let line = document.createElement('span');
    line.classList.add('line');
    line.innerHTML = what;
    where.append(line);
}
