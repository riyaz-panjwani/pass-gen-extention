const SPECIAL_CHARACTERS = "!@#$%^&*()-_=+";

function substituteCharacters(name) {
    let substitutedName = name.split('');
    let substitutionsCount = 0;
    while (substitutionsCount < 5) {
        let index = Math.floor(Math.random() * name.length);
        let c = name.charAt(index);
        let substituteChar = getSubstituteCharacter(c);
        if (substituteChar !== c) {
            substitutedName[index] = substituteChar;
            substitutionsCount++;
        }
    }
    return substitutedName.join('');
}

function getSubstituteCharacter(c) {
    let random = Math.random() < 0.5;
    switch (c.toLowerCase()) {
        case 'a':
            return random ? '4' : '@';
        case 'b':
            return random ? '6' : '8';
        case 'c':
            return random ? '(' : '{';
        case 'e':
            return random ? '3' : '€';
        case 'i':
            return random ? '1' : '!';
        case 'l':
            return random ? '1' : '|';
        case 'o':
            return random ? '0' : 'O';
        case 's':
            return random ? '$' : '5';
        case 't':
            return random ? '7' : '+';
        case 'q':
            return random ? '9' : 'Q';
        default:
            return c;
    }
}

function getNonRepeatingSpecialChar(name, year) {
    let specialChar;
    do {
        specialChar = SPECIAL_CHARACTERS.charAt(Math.floor(Math.random() * SPECIAL_CHARACTERS.length));
    } while (name.includes(specialChar) || year.includes(specialChar));
    return specialChar;
}

function capitalizeFirstCharacter(password) {
    if (password.length === 0) {
        return password;
    }
    let firstAlphaIndex = password.search(/[a-zA-Z]/);
    let firstAlpha = password[firstAlphaIndex].toUpperCase();
    return password.substring(0, firstAlphaIndex) + firstAlpha + password.substring(firstAlphaIndex + 1);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let index = Math.floor(Math.random() * (i + 1));
        [array[i], array[index]] = [array[index], array[i]]; // Swap
    }
    return array;
}

function generatePassword(name, year) {
    name = substituteCharacters(name);
    let shuffledParts = shuffleArray([name, year.toString()]);
    let shuffledName = shuffledParts[0];
    let shuffledYear = shuffledParts[1];
    let specialChar = getNonRepeatingSpecialChar(shuffledName, shuffledYear);
    let password = shuffledName + specialChar + shuffledYear;
    password = capitalizeFirstCharacter(password);
    return password;
}

document.addEventListener('DOMContentLoaded', function () {
    let generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
        let name = document.getElementById('nameInput').value;
        let year = document.getElementById('yearInput').value;
        let generatedPassword = generatePassword(name, year);
        document.getElementById('passwordOutput').textContent = generatedPassword;
    });
});

