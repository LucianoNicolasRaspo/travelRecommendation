const btnSearch = document.getElementById('btnSearch');
const searchSection = document.querySelector('#searchCity');
const btnClear = document.getElementById('btnClear');
const input = document.getElementById('search');
const resultDiv = document.getElementById('result');

function searchKeyword() {
    const input = document.getElementById('search').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let foundResults = false;

            function displayResult(item) {
                resultDiv.innerHTML += `
                    </br>
                    <h2>${item.name}</h2>
                    </br>
                    <img class="imageUrl" src="${item.imageUrl}" alt="${item.name}" style="max-width: 100%;">
                    </br>
                    <p><strong>Description:</strong> ${item.description}</p>
                    </br>
                    <hr>
                    </br>
                `;
            }

            data.countries.forEach(country => {
                if (country.name.toLowerCase().includes(input)) {
                    country.cities.forEach(city => displayResult(city, 'City'));
                    foundResults = true;
                } else {
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(input)) {
                            displayResult(city, 'City');
                            foundResults = true;
                        }
                    });
                }
            });

            if (!foundResults) {
                resultDiv.innerHTML = 'No results found. Try another keyword!';
            }
            searchSection.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', searchKeyword);
btnClear.addEventListener('click', clearScreen);

function clearScreen() {
    input.value = '';          
    resultDiv.innerHTML = '';         
}

function contact() {
    alert('Thanks for contacting us!');
}
