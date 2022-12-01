let params = new URLSearchParams(document.location.search);

let matches;
let match;

function init() {
    matches = JSON.parse(localStorage.matches);

    if (params.get('match') != null) {
        document.querySelector('#message').classList.add('is-hidden');
        document.querySelector('#content').classList.remove('is-hidden');
        document.querySelector('#match-title').textContent = params.get('name');

        matches.forEach(matchElem => {
            if (matchElem.type == params.get('matchType') && matchElem.id == params.get('match') && matchElem.semiID == params.get('semiID')) match = matchElem;
        });

        createScorebar();

        createMoreInfo();
    }    
    
}


function createScorebar() {

    let div = document.querySelector('#info');

    let td = document.createElement('div');

    //Create scores
    td.classList.add('score-table-item');
    let winScore = document.createElement('span');
    let lossScore = document.createElement('span');
    winScore.textContent = match.red.totalScore;
    winScore.classList.add('title', 'red-text', 'biiig-text');
    lossScore.textContent = match.blue.totalScore;
    lossScore.classList.add('title', 'blue-text', 'biiig-text', 'is-pulled-right');
    td.append(winScore);
    td.append(lossScore);

    //Create scorebar
    let br = document.createElement('br');
    td.append(br);
    let scoreBar = document.createElement('div');
    scoreBar.classList.add('score-bar', 'score-bar-outer', 'has-background-info');
    let scoreBarInner = document.createElement('div');
    scoreBarInner.classList.add('red-strong', 'score-bar');
    scoreBarInner.style.width = ('width', match.red.totalScore / (match.red.totalScore + match.blue.totalScore) * 100 + '%');
    scoreBar.append(scoreBarInner);
    td.append(scoreBar);
    let redTeams = document.createElement('span');
    let blueTeams = document.createElement('span');
    redTeams.classList.add('red-text', 'has-text-weight-semibold');
    blueTeams.classList.add('blue-text', 'has-text-weight-semibold', 'is-pulled-right');

    //Create teams info
    redTeams.textContent = match.red.teams.join(', ');
    blueTeams.textContent = match.blue.teams.join(', ');



    td.append(redTeams);
    td.append(blueTeams);

    div.append(td);
}

function createMoreInfo() {

    //Add more scores
    document.querySelector('#red-auto').textContent = match.red.autoScore;
    document.querySelector('#red-teleop').textContent = match.red.teleopScore;
    document.querySelector('#red-foul').textContent = match.red.foulPoints;
    document.querySelector('#red-rp').textContent = match.red.rankingPoints;
    document.querySelector('#blue-auto').textContent = match.blue.autoScore;
    document.querySelector('#blue-teleop').textContent = match.blue.teleopScore;
    document.querySelector('#blue-foul').textContent = match.blue.foulPoints;
    document.querySelector('#blue-rp').textContent = match.blue.rankingPoints;

    if (match.type != 0) {
        document.querySelector('#red-rp').classList.add('is-hidden');
        document.querySelector('#blue-rp').classList.add('is-hidden');
        document.querySelectorAll('.rp').forEach((elem) => elem.classList.add('is-hidden'));
    }

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