const search = document.getElementById('search')
const errorModal = document.getElementById('errorModal');
const closeModalButton = document.getElementById('closeModal');
const h1 = document.querySelector('h1')

window.addEventListener('keypress', e => {if(e.key === 'Enter')fetchData(generateURL())})
search.addEventListener('click', () => {fetchData(generateURL())})

function generateURL() {
    const filmName = document.querySelector('input').value.trim();
    const mainUrl = `https://www.omdbapi.com/?apikey=3f29323d&t=${filmName}&lang=ua`;
    return mainUrl;
}

async function fetchData(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        if(data.Response === 'False'){
            console.log(data.Error);
            showErrorModal()
            return
        }
        showInfo(data)
    } catch (error) {
        console.error(error);
    }
}

function showInfo(data){
    h1.style.display = 'block'

    const{Title, Year, Released, Runtime, Country, Actors, Poster, imdbID} = data
    
    const filmList = document.getElementById('filmList')
    filmList.innerHTML = ''


    const elements = `
    <li><span style='color: rgb(128, 105, 0)'>Назва:</span> ${Title}</li>
    <li><span style='color: rgb(128, 105, 0)'>Рік:</span> ${Year}</li>
    <li><span style='color: rgb(128, 105, 0)'>Дата виходу:</span> ${Released}</li>
    <li><span style='color: rgb(128, 105, 0)'>Тривалість:</span> ${Runtime}</li>
    <li><span style='color: rgb(128, 105, 0)'>Країна:</span> ${Country}</li>
    <li><span style='color: rgb(128, 105, 0)'>Актори:</span> ${Actors}</li>
    <li class="icon"><span style='color: rgb(128, 105, 0)'>Постер:</span><br><img src='${Poster}'></li>
    <li><span style='color: rgb(128, 105, 0)'>Подивитися фільм:</span> <a href='https://www.imdb.com/title/${imdbID}'><img class="movie" src="./img/free-animated-icon-cinema-9121609.gif" alt=""></a></li>
    `
    filmList.innerHTML = elements
}

function showErrorModal() {
    errorModal.style.display = 'flex'
}

closeModalButton.addEventListener('click', () => {
    errorModal.style.display = 'none';
});