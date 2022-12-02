let params = new URLSearchParams(document.location.search);

//global stuff
let numElemPerPage = 5;
let paginationPage = 0;
let numMatchesForThisPage = 0;
let currentMatchType = 0;
let currentSortType = 'id';
let lastSortedID = 0;
let sameLastSorted = false;
let teamToFilterBy = 0;


//teams init stuff
let matches;
function init() {
    matches = JSON.parse(localStorage.matches);

    if (params.toString() != '') {
        teamToFilterBy = parseInt(params.get('team'));
        document.querySelector('#reset-filters').classList.remove('is-hidden');
    }

    if (teamToFilterBy != 0) {
        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];

            if (!match.red.teams.includes(teamToFilterBy) && !match.blue.teams.includes(teamToFilterBy)) {
                matches.splice(i, 1);
                i--;
            } 
        }
    }

    console.log(matches);
    createTable(0);
}




function createTable(matchType, sortType, isRunByJS) {
    if (sortType == undefined) sortType = 'id';
    if (isRunByJS == undefined) isRunByJS = false;
    if (matchType != currentMatchType) {
        paginationPage = 0;
        sameLastSorted = true;
    }
    if (isRunByJS) sameLastSorted = true;
    let tableBody = document.querySelector('#standings tbody');

    numMatchesForThisPage = 0;
    tableBody.replaceChildren();
    document.querySelector('#table-info').replaceChildren();

    sort(sortType);

    if (matchType == 0) {
        document.querySelector('#qualifying-button').classList.add('is-active');
        document.querySelector('#semifinals-button').classList.remove('is-active');
        document.querySelector('#finals-button').classList.remove('is-active');

    } else if (matchType == 1) {
        document.querySelector('#semifinals-button').classList.add('is-active');
        document.querySelector('#qualifying-button').classList.remove('is-active');
        document.querySelector('#finals-button').classList.remove('is-active');

    } else if (matchType == 2) {
        document.querySelector('#qualifying-button').classList.remove('is-active');
        document.querySelector('#semifinals-button').classList.remove('is-active');
        document.querySelector('#finals-button').classList.add('is-active');

    }

    matches.forEach(match => {
        if (match.type != matchType) return;

        numMatchesForThisPage++;

        if (numMatchesForThisPage > (1 + paginationPage) * numElemPerPage) return;
        if (numMatchesForThisPage <= paginationPage * numElemPerPage) return;



        //Make table row
        let tr = document.createElement('tr');

        //Make match info
        let td = document.createElement('td');
        let matchNum = document.createElement('div');
        let matchA = document.createElement('a');
        matchA.classList.add('subtitle');
        if (matchType == 0) matchA.textContent = `Qualifying ${match.id}`;
        if (matchType == 1) matchA.textContent = `Semifinals ${match.semiID} Match ${match.id}`;
        if (matchType == 2) matchA.textContent = `Finals ${match.id}`;
        matchA.href = `../match/?match=${match.id}&semiID=${match.semiID}&matchType=${match.type}&name=${matchA.textContent}`;


        matchNum.classList.add('match-number');
        matchNum.append(matchA);
        td.append(matchNum);
        tr.append(td);

        //Create video thing
        td = document.createElement('td');
        let vidA = document.createElement('a');
        vidA.href = match.video;
        vidA.target = "_blank";
        let play = document.createElement('i');
        play.classList.add('fa-solid', 'fa-play', 'play-button', 'match-number');
        vidA.append(play);
        td.append(vidA);
        tr.append(td);

        //Create scores
        td = document.createElement('td');
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

        //Create red teams info
        let a1 = document.createElement('a');
        a1.classList.add('red-text');
        a1.href = `?team=${match.red.teams[0]}`;
        a1.textContent = match.red.teams[0];
        let a2 = document.createElement('a');
        a2.classList.add('red-text');
        a2.href = `?team=${match.red.teams[1]}`;
        a2.textContent = match.red.teams[1];
        let a3 = document.createElement('a');
        a3.classList.add('red-text');
        a3.href = `?team=${match.red.teams[2]}`;
        a3.textContent = match.red.teams[2];
        redTeams.append(a1, ", ", a2, ', ', a3);

        //create blue teams info
        a1 = document.createElement('a');
        a1.classList.add('blue-text');
        a1.href = `?team=${match.blue.teams[0]}`;
        a1.textContent = match.blue.teams[0];
        a2 = document.createElement('a');
        a2.classList.add('blue-text');
        a2.href = `?team=${match.blue.teams[1]}`;
        a2.textContent = match.blue.teams[1];
        a3 = document.createElement('a');
        a3.classList.add('blue-text');
        a3.href = `?team=${match.blue.teams[2]}`;
        a3.textContent = match.blue.teams[2];
        blueTeams.append(a1, ", ", a2, ', ', a3);


        td.append(redTeams);
        td.append(blueTeams);

        tr.append(td);



        tableBody.append(tr);
    });

    currentMatchType = matchType;
    currentSortType = sortType;
    createPaginationButtons();


    if (tableBody.childElementCount == 0) {
        message(3, 'There are no matches to display.', false);
    }
}


// Create a message
function message(type, message, deleteButton) {
    let error = document.querySelector('#table-info');

    let article = document.createElement('article');
    let msgBody = document.createElement('div');
    if (deleteButton) {
        let button = document.createElement('button');
        button.classList.add('delete', 'is-pulled-right');
        button.onclick = () => error.replaceChildren();
        msgBody.append(button);
    }
    article.classList.add('message');
    msgBody.classList.add('message-body');
    msgBody.textContent = message;


    article.append(msgBody);


    if (type == 0) {
        article.classList.add('is-danger');
    } else if (type == 1) {
        article.classList.add('is-info');
    } else if (type == 2) {
        article.classList.add('is-warning');
    } else if (type == 3) {
        article.classList.add('is-link');

    }

    error.replaceChildren();
    error.append(article);
}


function paginate(page) {
    let max = parseInt(numMatchesForThisPage / numElemPerPage);
    if (page < 0) page = 0;
    if (page > max) page = max;
    paginationPage = page;
    createTable(currentMatchType, currentSortType, true);
}

function createPaginationButtons() {
    let max = parseInt(numMatchesForThisPage / numElemPerPage);

    // Create setup for pagination
    let paginationArea = document.querySelector('#table-info');
    paginationArea.replaceChildren();
    let nav = document.createElement('nav');
    nav.classList.add('pagination', 'is-centered', 'is-rounded');
    let ul = document.createElement('ul');
    ul.classList.add('pagination-list');
    nav.append(ul);
    paginationArea.append(nav);


    // Create left arrow buttons
    let i1 = document.createElement('i');
    let i2 = document.createElement('i');
    i1.classList.add('fas', 'fa-caret-left');
    i2.classList.add('fas', 'fa-caret-left');
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.classList.add('pagination-link');
    a.classList.add('pagination-left-arrow');
    if (paginationPage == 0) a.setAttribute('disabled', '');
    a.onclick = () => paginate(0);
    a.append(i1, i2);
    li.append(a);
    ul.append(li);

    i = document.createElement('i');
    i.classList.add('fas', 'fa-caret-left');
    li = document.createElement('li');
    a = document.createElement('a');
    a.classList.add('pagination-link');
    a.classList.add('pagination-left-arrow');
    if (paginationPage == 0) a.setAttribute('disabled', '');
    a.onclick = () => paginate(paginationPage - 1);
    a.append(i);
    li.append(a);
    ul.append(li);


    // Create number buttons
    for (let index = 0; index < max + 1; index++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = `javascript:paginate(${index})`;
        a.id = `paginate-${index + 1}`;
        a.classList.add('pagination-link');
        a.textContent = index + 1;
        li.append(a);
        ul.append(li);
    }

    //Create right arrows
    i = document.createElement('i');
    i.classList.add('fas', 'fa-caret-right');
    li = document.createElement('li');
    a = document.createElement('a');
    a.classList.add('pagination-link');
    a.classList.add('pagination-right-arrow');
    if (paginationPage == max) a.setAttribute('disabled', '');
    a.onclick = () => paginate(paginationPage + 1);
    a.append(i);
    li.append(a);
    ul.append(li);

    i1 = document.createElement('i');
    i2 = document.createElement('i');
    i1.classList.add('fas', 'fa-caret-right');
    i2.classList.add('fas', 'fa-caret-right');
    a = document.createElement('a');
    a.classList.add('pagination-link');
    a.classList.add('pagination-right-arrow');
    if (paginationPage == max) a.setAttribute('disabled', '');
    a.onclick = () => paginate(parseInt(numMatchesForThisPage / numElemPerPage));
    a.append(i1, i2);
    li.append(a);
    ul.appendChild(li);


    document.querySelector(`#paginate-${paginationPage + 1}`).classList.add('is-current');
}


function sort(field) {
    let sortDirection = 1;

    if (lastSortedID === field && !sameLastSorted) {
        sortDirection = -1;
        sameLastSorted = true;
    } else {
        sameLastSorted = false;
    }
    lastSortedID = field;

    document.querySelectorAll('.main-table-header i').forEach(elem => { elem.classList = ""; });

    if (sameLastSorted) {
        document.querySelector(`.header-${field} i`).classList = "fas fa-arrow-down";

    } else {
        document.querySelector(`.header-${field} i`).classList = "fas fa-arrow-up";

    }

    if (field === 'id') {
        matches = matches.sort((matchA, matchB) => { return (matchA.id < matchB.id) ? -sortDirection : sortDirection; });
    } else {
        matches = matches.sort((matchA, matchB) => matchB[field].totalScore * sortDirection - matchA[field].totalScore * sortDirection);
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