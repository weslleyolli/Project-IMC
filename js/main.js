const form = document.querySelector('#forms');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputWeight = e.target.querySelector('#weight');
    const inputHeight = e.target.querySelector('#height');

    const weight = Number(inputWeight.value);
    const height = Number(inputHeight.value);

    // Debugging: Log input values
    console.log('Weight:', weight, 'Height:', height);

    if (!weight) {
        setResult("Invalid weight", false);
        return;
    }
    if (!height) {
        setResult("Invalid height", false);
        return;
    }

    const imc = getImc(weight, height);
    const levelImc = getLevelImc(imc);

    // Debugging: Log IMC value
    console.log('IMC:', imc);

    const msg = `Your IMC is ${imc} (${levelImc}).`;
    setResult(msg, true);
});

function getLevelImc(imc) {
    const levels = ['Underweight', 'Normal weight', 'Overweight', 'Obesity 1', 'Obesity 2', 'Obesity 3'];

    if (imc >= 39.9) return levels[5];
    if (imc >= 34.9) return levels[4];
    if (imc >= 29.9) return levels[3];
    if (imc >= 24.9) return levels[2];
    if (imc >= 18.5) return levels[1];
    return levels[0];
}

function getImc(weight, height) {
    // Debugging: Log values before calculation
    console.log('Calculating IMC with Weight:', weight, 'Height:', height);
    const imc = weight / (height ** 2);
    return imc.toFixed(2);
}

function createP() {
    const p = document.createElement('p');
    return p;
}

function setResult(msg, isValid) {
    const result = document.querySelector('#result');
    result.innerHTML = '';

    const p = createP();

    if (isValid) {
        p.classList.add('paragraph-result');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    result.appendChild(p);
}