const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${localStorage.getItem('IMDB_TOKEN')}`,
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

fetch('https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr', options)
    .then(response => response.json())
    .then(data => {
        const list = data.d;

        list.map(item => {
            const name = item.l;
            const poster = item.i.imageUrl;
            const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`;
            document.querySelector('.movies').innerHTML += movie;
        });
    })
    .catch(err => console.error(err));