const result = document.getElementById('result');
const form = document.getElementById('form');

form.addEventListener('submit', validateSearch);

function validateSearch(event){
    event.preventDefault();
    const search = document.querySelector('#search').value;
    if(search === ''){
        showMessage('This field can not be empty');
    }
    else if(search.length <3){
        showMessage('Add more information. It is not possible the task');
        return;
    }
    else{
        getDataFromAPI(search);
    }
}

function getDataFromAPI(dataToSearch){
    const github_url = `https://jobs.github.com/positions.json?search=${dataToSearch}`;
    const urlSolvingCrossProblem = `https://api.allorigins.win/get?url=${ encodeURIComponent(github_url) }`;

    axios.get(urlSolvingCrossProblem)
        .then(response => showVacancies(JSON.parse(response.data.contents)));
}

function showVacancies(vacancies){
    cleanHtml();
    if(vacancies.length > 0){
        vacancies.forEach(vac => {
            const { company, title, type, url } = vac;
            result.innerHTML += `
            <div class="card mb-3 border-info text-info text-center">
                <h3 class="card-header">${title}</h3>
                <div class='card-body'>
                    <p class="font-weight-bold text-dark">Company:  <span class="font-weight-normal">${company} </span></p>
                    <p class="font-weight-bold text-dark">Type of contract:   <span class="font-weight-normal">${type} </span></p>
                    <a class="btn btn-primary" href="${url}">See position</a>
                </div>
            </div>
        `;
        });
    }else {
        const noResult = document.createElement('p');
        noResult.classList.add('text-center', 'mt-10', 'alert', 'alert-info');
        noResult.textContent = 'No hay vacantes, intenta con otro término de búsqueda';
        result.appendChild(noResult);

    }
}

function cleanHtml(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

function showMessage(message){
    const alertCheck = document.querySelector('alert');
    if(!alertCheck){
        const alert = document.createElement('div');
        alert.classList.add('text-center', 'alert', 'alert-danger', 'mt-3');
        alert.textContent = message;
        form.appendChild(alert);
        setTimeout(()=> alert.remove(), 3000);
    }
}

