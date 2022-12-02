//Global vars
let lastSortedID = 0;
let sameLastSorted = false;
let matchType = -1;

// init stuff
let id;
let semiInput;
let red1;
let red2;
let red3;
let redAuto;
let redTeleop;
let redFoul;
let redRanking;
let blue1;
let blue2;
let blue3;
let blueAuto;
let blueTeleop;
let blueFoul;
let blueRanking;
let video;
let matches;
let match;


//Initializes everything on load
function init() {
    matches = JSON.parse(localStorage.matches);

    id = document.querySelector('#id');
    semiInput = document.querySelector('#semifinals-input');
    red1 = document.querySelector('#red1');
    red2 = document.querySelector('#red2');
    red3 = document.querySelector('#red3');
    redAuto = document.querySelector('#redAuto');
    redTeleop = document.querySelector('#redTeleop');
    redFoul = document.querySelector('#redFoul');
    redRanking = document.querySelector('#redRanking');
    blue1 = document.querySelector('#blue1');
    blue2 = document.querySelector('#blue2');
    blue3 = document.querySelector('#blue3');
    blueAuto = document.querySelector('#blueAuto');
    blueTeleop = document.querySelector('#blueTeleop');
    blueFoul = document.querySelector('#blueFoul');
    blueRanking = document.querySelector('#blueRanking');
    video = document.querySelector('#video');

    postToMatchesMenu();
}


//Handles the submit button
function handleButton() {
    if (match == undefined) addMatch();
    else editMatch();
}


//Adds a match
function addMatch() {
    try {
        let semiID = 0;
        let redRankingNum = 0;
        let blueRankingNum = 0;
        if (matchType == 1) semiID = parseInt(semiInput.value);
        if (matchType == 0) {
            redRankingNum = parseInt(redRanking.value);
            blueRankingNum = parseInt(blueRanking.value);
        }

        //Validation check
        check();

        //Ad data
        addJSON(
            matchType,
            parseInt(id.value),
            parseInt(semiID),
            parseInt(red1.value),
            parseInt(red2.value),
            parseInt(red3.value),
            parseInt(redAuto.value),
            parseInt(redTeleop.value),
            parseInt(redFoul.value),
            redRankingNum,
            parseInt(blue1.value),
            parseInt(blue2.value),
            parseInt(blue3.value),
            parseInt(blueAuto.value),
            parseInt(blueTeleop.value),
            parseInt(blueFoul.value),
            blueRankingNum,
            video.value
        );

    } catch (error) {
        message(0, 'Something went wrong and we couldn\'t add a match. Please ensure all fields have been properly filled out.');
        document.querySelector('#submit').classList.add('is-danger');
    }
}


//Edits a match
function editMatch() {
    let index = matches.indexOf(match);

    let semiID = 0;
    let redRankingNum = 0;
    let blueRankingNum = 0;
    if (matchType == 1) semiID = parseInt(semiInput.value);
    if (matchType == 0) {
        redRankingNum = parseInt(redRanking.value);
        blueRankingNum = parseInt(blueRanking.value);
    }

    try {
        check();
    } catch (error) {
        message(0, 'Error - Could not save match. Pleas ensure all fields are filled out correctly.');
        document.querySelector('#submit').classList.add('is-danger');
        return;
    }

    //Edit array data
    matches.splice(index, 1, {
        "type": matchType,
        "id": parseInt(id.value),
        "semiID": semiID,
        "red": {
            "teams": [parseInt(red1.value), parseInt(red2.value), parseInt(red3.value)],
            "totalScore": parseInt(redTeleop.value) + parseInt(redAuto.value) + parseInt(redFoul.value),
            "autoScore": parseInt(redAuto.value),
            "teleopScore": parseInt(redTeleop.value),
            "foulPoints": parseInt(redFoul.value),
            "rankingPoints": redRankingNum
        },
        "blue": {
            "teams": [parseInt(blue1.value), parseInt(blue2.value), parseInt(blue3.value)],
            "totalScore": parseInt(blueTeleop.value) + parseInt(blueAuto.value) + parseInt(blueFoul.value),
            "autoScore": parseInt(blueAuto.value),
            "teleopScore": parseInt(blueTeleop.value),
            "foulPoints": parseInt(blueFoul.value),
            "rankingPoints": blueRankingNum
        },
        "video": video.value
    });

    save();

    resetFields();

    message(2, 'Match saved successfully.');
    document.querySelector('#main-box').classList.remove('translucent');

}


// Deletes a match
function deleteMatch() {
    let index = matches.indexOf(match);

    if (index == -1) message(0, 'Error - Match to delete does not exist.');
    else {
        matches.splice(index, 1);

        save();

        message(2, 'Match deleted successfully.');
    } 

    document.querySelector('#main-box').classList.remove('translucent');
    resetFields();
}

//Resets all fields
function resetFields() {
    id.value = '';
    semiInput.value = '';
    red1.value = '';
    red2.value = '';
    red3.value = '';
    redAuto.value = '';
    redTeleop.value = '';
    redFoul.value = '';
    redRanking.value = '';
    blue1.value = '';
    blue2.value = '';
    blue3.value = '';
    blueAuto.value = '';
    blueTeleop.value = '';
    blueFoul.value = '';
    blueRanking.value = '';
    video.value = '';

    document.querySelector('#type').textContent = 'Select type';
    document.querySelectorAll('.help.is-danger').forEach(elem => elem.textContent = "");
    document.querySelectorAll('.input').forEach(elem => elem.classList.remove('is-danger'));
    matchType = -1;

    postToMatchesMenu();

}

//Loads a match
function loadMatch(matchID) {
    match = matches[matchID];
    id.value = match.id;
    semiInput.value = match.semiID;
    red1.value = match.red.teams[0];
    red2.value = match.red.teams[1];
    red3.value = match.red.teams[2];
    redAuto.value = match.red.autoScore;
    redTeleop.value = match.red.teleopScore;
    redFoul.value = match.red.foulPoints;
    redRanking.value = match.red.rankingPoints;
    blue1.value = match.blue.teams[0];
    blue2.value = match.blue.teams[1];
    blue3.value = match.blue.teams[2];
    blueAuto.value = match.blue.autoScore;
    blueTeleop.value = match.blue.teleopScore;
    blueFoul.value = match.blue.foulPoints;
    blueRanking.value = match.blue.rankingPoints;
    video.value = match.video;

    changeMatchType(match.type);
    message(2, 'Match loaded.');

    document.querySelector('#matchSelect').parentElement.classList.remove('is-active');
    document.querySelectorAll('.help.is-danger').forEach(elem => elem.textContent = "");
    document.querySelectorAll('.input').forEach(elem => elem.classList.remove('is-danger'));
    document.querySelector('#main-box').classList.remove('translucent');
}

// Fills the matches menu
function postToMatchesMenu() {
    const dropdown = document.querySelector('#matchSelect');
    dropdown.replaceChildren();

    let div = document.createElement('div');
    div.classList.add('dropdown-content');
    dropdown.append(div);

    sort();

    matches.forEach(match => {
        let a = document.createElement('a');
        a.classList.add('dropdown-item');
        let name;

        if (match.type == 0) name = "Qualifying Match";
        if (match.type == 1) name = `Semifinals ${match.semiID} Match`;
        if (match.type == 2) name = "Finals Match";
        a.textContent = `${name} ${match.id}`;

        a.onclick = () => loadMatch(matches.indexOf(match));

        div.appendChild(a);
    });
}

// Cancels and resets all fields.
function cancel() {
    changeMatchType(0);

    if (match != undefined) document.querySelector('#main-box').classList.add('translucent');

    resetFields();

    message(1, 'Operation cancelled.');
}

//Does validation check for submit
function check() {
    // If anything is blank, error
    if (id.value == '' ||
        (semiInput.value == '' && matchType == 1) ||
        red1.value == '' ||
        red2.value == '' ||
        red3.value == '' ||
        redAuto.value == '' ||
        redTeleop.value == '' ||
        redFoul.value == '' ||
        (redRanking.value == '' && matchType == 0) ||
        blue1.value == '' ||
        blue2.value == '' ||
        blue3.value == '' ||
        blueAuto.value == '' ||
        blueTeleop.value == '' ||
        blueFoul.value == '' ||
        (blueRanking.value == '' && matchType == 0) ||
        video.value == '' ||
        matchType == -1) {
        throw new Error();
    }

    //If anything doesn't make sense, error
    if (parseInt(id.value) < 1 ||
        (parseInt(semiInput.value) < 1 && matchType == 1) ||
        parseInt(red1.value) < 1 || parseInt(red1.value) > 9999 ||
        parseInt(red2.value) < 1 || parseInt(red2.value) > 9999 ||
        parseInt(red3.value) < 1 || parseInt(red3.value) > 9999 ||
        parseInt(redAuto.value) < 0 ||
        parseInt(redTeleop.value) < 0 ||
        parseInt(redFoul.value) < 0 ||
        (parseInt(redRanking.value) < 0 && matchType == 0) ||
        parseInt(blue1.value) < 1 || parseInt(blue1.value) > 9999 ||
        parseInt(blue2.value) < 1 || parseInt(blue2.value) > 9999 ||
        parseInt(blue3.value) < 1 || parseInt(blue3.value) > 9999 ||
        parseInt(blueAuto.value) < 0 ||
        parseInt(blueTeleop.value) < 0 ||
        parseInt(blueFoul.value) < 0 ||
        (parseInt(blueRanking.value) < 0 && matchType == 0) ||
        !validateURL()
    ) {
        throw new Error();
    }
}

//Adds data to array
function addJSON(type, id, semiID, red1, red2, red3, redAuto, redTeleop, redFoul, redRanking, blue1, blue2, blue3, blueAuto, blueTeleop, blueFoul, blueRanking, video) {
    //Add match JSON
    matches.push({
        "type": type,
        "id": id,
        "semiID": semiID,
        "red": {
            "teams": [red1, red2, red3],
            "totalScore": redTeleop + redAuto + redFoul,
            "autoScore": redAuto,
            "teleopScore": redTeleop,
            "foulPoints": redFoul,
            "rankingPoints": redRanking
        },
        "blue": {
            "teams": [blue1, blue2, blue3],
            "totalScore": blueTeleop + blueAuto + blueFoul,
            "autoScore": blueAuto,
            "teleopScore": blueTeleop,
            "foulPoints": blueFoul,
            "rankingPoints": blueRanking
        },
        "video": video
    });

    save();
    resetFields();

    message(2, 'Match added successfully.');
}

//Stores and saves data to localStorage
function save() {
    localStorage.setItem('matches', JSON.stringify(matches));
}


// Bad auth code
function auth() {
    let username = document.querySelector('#username');
    let password = document.querySelector('#password');

    // Very secure login
    if (username.value == "admin" && password.value == "password") {
        username.classList.remove('is-danger');
        document.querySelector('#username-error').textContent = "";
        password.classList.remove('is-danger');
        document.querySelector('#password-error').textContent = "";

        document.querySelector('#login').classList.add('is-hidden');
        document.querySelector('#main').classList.remove('is-hidden');

    } else {
        username.classList.add('is-danger');
        password.classList.add('is-danger');
        document.querySelector('#password-error').textContent = "Username or password is incorrect.";
    }

}

//Change match type
function changeMatchType(type) {
    const menu = document.querySelector('.match-type-dropdown');
    menu.classList.remove('is-active');
    const menuSpan = document.querySelector('#type');

    let rRlabel = document.querySelector('#rR-label');
    let bRlabel = document.querySelector('#bR-label');
    let semiNum = document.querySelector('#semifinals-number');
    let semiInput = document.querySelector('#semifinals-input');


    // Enable/disable input fields
    if (type == 0) {
        redRanking.removeAttribute('disabled');
        blueRanking.removeAttribute('disabled');
        rRlabel.classList.remove('has-text-grey');
        bRlabel.classList.remove('has-text-grey');
    } else if (type == 1 || type == 2) {
        redRanking.setAttribute('disabled', '');
        blueRanking.setAttribute('disabled', '');
        rRlabel.classList.add('has-text-grey');
        document.querySelector('#bR-label').classList.add('has-text-grey');
        redRanking.classList.remove('is-danger');
        rRlabel.parentElement.querySelector('p').textContent = "";
        blueRanking.classList.remove('is-danger');
        bRlabel.parentElement.querySelector('p').textContent = "";
    }

    if (type == 1) {
        semiNum.classList.remove('has-text-grey');
        semiInput.removeAttribute('disabled');
    } else {
        semiNum.classList.add('has-text-grey');
        semiInput.setAttribute('disabled', '');
        semiInput.classList.remove('is-danger');
        semiInput.parentElement.querySelector('p').textContent = "";
    }

    //Set menu text based on type
    if (type == 0) menuSpan.textContent = "Qualifying match";
    if (type == 1) menuSpan.textContent = "Semifinals match";
    if (type == 2) menuSpan.textContent = "Finals match";



    matchType = type;
}


//Reset the submit button
function resetButton() {
    document.querySelector('#submit').classList.remove('is-danger');
    document.querySelector('#submit').classList.add('is-success');
}

//Add a message
function message(type, message) {
    let error = document.querySelector('#error');

    let article = document.createElement('article');
    let msgBody = document.createElement('div');
    let button = document.createElement('button');

    article.classList.add('message');
    msgBody.classList.add('message-body');
    msgBody.textContent = message;
    button.classList.add('delete', 'is-pulled-right');
    button.onclick = () => error.replaceChildren();

    msgBody.append(button);
    article.append(msgBody);


    if (type == 0) {
        article.classList.add('is-danger');
    } else if (type == 1) {
        article.classList.add('is-info');
    } else if (type == 2) {
        article.classList.add('is-success');
    } else if (type == 3) {
        article.classList.add('is-warning');
    }

    error.replaceChildren();
    error.append(article);
}

//Does validation per element
function validate(elemName) {
    let elem = document.querySelector(`#${elemName}`);

    if (elem.value == '' || parseInt(elem.value) < 0 || parseInt(elem.value) > 9999) {
        elem.parentElement.querySelector('p').textContent = "Please enter a valid value.";
        elem.classList.add('is-danger');
    } else {
        elem.parentElement.querySelector('p').textContent = "";
        elem.classList.remove('is-danger');
    }
}

//Validates URL
function validateURL() {
    const elem = document.querySelector('#video');
    try {
        new URL(elem.value);
        elem.parentElement.querySelector('p').textContent = "";
        elem.classList.remove('is-danger');
        return true;
    } catch (error) {
        elem.parentElement.querySelector('p').textContent = "Please enter a valid URL.";
        elem.classList.add('is-danger');
        return false;
    }
}

// Changes the admin page type
function changeAdminType(page) {
    if (page == 0) {
        document.querySelectorAll('.side-menu-elem').forEach(elem => elem.classList.remove('is-active'));
        document.querySelector('#side-menu-add').classList.add('is-active');

        

        document.querySelector('#deleteMatch').classList.add('is-hidden');
        document.querySelector('#loadMatch').classList.add('is-hidden');

        document.querySelector('#main-title').textContent = 'Add a Match';

        document.querySelector('#main-box').classList.remove('translucent');

    } else if (page == 1) {
        document.querySelectorAll('.side-menu-elem').forEach(elem => elem.classList.remove('is-active'));
        document.querySelector('#side-menu-edit').classList.add('is-active');

        document.querySelector('#deleteMatch').classList.remove('is-hidden');
        document.querySelector('#loadMatch').classList.remove('is-hidden');
        document.querySelector('#main-title').textContent = 'Edit or Delete a Match';

        document.querySelector('#main-box').classList.add('translucent');
    }

    resetFields();
    document.querySelector('#error').replaceChildren();
}

//Sorts data array
function sort() {
    matches = matches.sort((matchA, matchB) => {
        return (matchA.id < matchB.id) ? -1 : 1;
    });
}

//Adapted from Bulma
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on the "navbar-burger"
            el.classList.toggle('is-active');

            // Toggle is-hidden on the dropdown
            $target.classList.toggle('is-hidden');

        });
    });

    

});