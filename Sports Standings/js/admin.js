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
}

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

        addTeam(
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
    matchType = -1;
}

function cancel() {
    changeMatchType(0);

    resetFields();

    message(1, 'Operation cancelled.');
}

function check() {
    // If anything is blank, error
    if (id.value == '' ||
        (semiInput.value == '' && matchType == 1) ||
        red1.value == '' ||
        red2.value == '' ||
        red3.value == '',
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
}


function addTeam(type, id, semiID, red1, red2, red3, redAuto, redTeleop, redFoul, redRanking, blue1, blue2, blue3, blueAuto, blueTeleop, blueFoul, blueRanking, video) {
    //Add team JSON
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

function resetData() {
    matches = [];
    save();
}

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

    // Enable/disable input fields
    if (type == 0) {
        redRanking.removeAttribute('disabled');
        blueRanking.removeAttribute('disabled');
        document.querySelector('#rR-label').classList.remove('has-text-grey');
        document.querySelector('#bR-label').classList.remove('has-text-grey');
    } else if (type == 1 || type == 2) {
        redRanking.setAttribute('disabled', '');
        blueRanking.setAttribute('disabled', '');
        document.querySelector('#rR-label').classList.add('has-text-grey');
        document.querySelector('#bR-label').classList.add('has-text-grey');
    }

    if (type == 1) {
        document.querySelector('#semifinals-number').classList.remove('has-text-grey');
        document.querySelector('#semifinals-input').removeAttribute('disabled');
    } else {
        document.querySelector('#semifinals-number').classList.add('has-text-grey');
        document.querySelector('#semifinals-input').setAttribute('disabled', '');
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

//Adapted from Bulma
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
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