const input = document.getElementById('input');
const scrambleContainer = document.getElementsByClassName('scramble')[0];

input.addEventListener('input', () => {
    scrambleContainer.innerHTML = null;
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
}

function addLine(where, what) {
    let line = document.createElement('span');
    line.classList.add('line');
    line.innerHTML = what;
    where.append(line);
}