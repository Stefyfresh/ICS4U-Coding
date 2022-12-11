// jshint esversion: 8
const TWILIO_URL = `https://api.twilio.com/2010-04-01/Accounts/${localStorage.getItem('TWILIO_SID')}/Messages.json`;
const TWILIO_NUM = localStorage.getItem('TWILIO_NUM');
const TOKEN = localStorage.getItem('TWILIO_TOKEN');

//elems
const phoneError = document.querySelector('#phoneError');
const submitButton = document.querySelector('#submit');
const phone = document.querySelector('#number');
const body = document.querySelector('#body');
const mediaURL = document.querySelector('#mediaURL');


document.querySelector('#text').addEventListener("submit", text);
let nextApplicableTime = timestamp();


async function text(e) {
    e.preventDefault();

    if (validate()) {
        let data = {
            'To': phone.value,
            'From': TWILIO_NUM,
            'Body': body.value,
        };

        if (mediaURL.value != "") data.MediaUrl = mediaURL.value;

        const rawResponse = await fetch(TWILIO_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(data)
        });
        const content = await rawResponse.json();

        console.log(content);

        if (content.code == undefined) {
            message(2, 'Success! Sent a message.');
        } else {
            message(0, `Error: ${content.message}`);
            submitButton.classList.add('is-danger');
        }
    } else {
        message(0, "Error: Please ensure the phone number is correct.");
        submitButton.classList.add('is-danger');
    }

    if (timestamp() < nextApplicableTime) {
        document.querySelector('#error').textContent = "Don't spam!";
    } else {
        document.querySelector('#error').textContent = "";
        nextApplicableTime = timestamp() + 2;
    }
}

function timestamp() {
    return Math.floor(Date.now() / 1000);
}

function resetButton() {
    submitButton.classList.remove('is-danger');
    submitButton.classList.add('is-success');
}

function validate() {
    const phone = document.querySelector('#number').value;
    let success = true;

    if (!validateNumber(phone)) {
        phoneError.textContent = "Not a valid phone number!";
        phoneError.parentElement.children[0].classList.add('is-danger');
        success = false;
    } else {
        phoneError.textContent = "";
        phoneError.parentElement.children[0].classList.remove('is-danger');
    }

    return success;
}

function validateNumber(input) {
    var regex = /^(\+1)?[- ]?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return regex.test(input);
}

function validateURL() {
    if (mediaURL.value != '') {
        try {
            new URL(elem.value);
        } catch (error) {
            mediaURL.parentElement.querySelector('p').textContent = "Not a valid URL!";
            mediaURL.classList.add('is-danger');
            return;
        }
    }

    mediaURL.parentElement.querySelector('p').textContent = "";
    mediaURL.classList.remove('is-danger');
}

function message(type, message) {
    let messageDiv = document.querySelector('#messages');

    let article = document.createElement('article');
    let msgBody = document.createElement('div');
    let button = document.createElement('button');

    article.classList.add('message', 'mb-5');
    msgBody.classList.add('message-body');
    msgBody.textContent = message;
    button.classList.add('delete', 'is-pulled-right');
    button.onclick = () => messageDiv.replaceChildren();

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

    messageDiv.replaceChildren();
    messageDiv.append(article);
}