// ********** Please note, these comments are ONLY notes to self so I can trace how I did the tuturial 
// ********** I would remove for production code!

// this is hitting a cities .JSON file -> API
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// 1 - Make an empty array for the cities to go into
const cities = [];

// 2 gotta go fetch that data! Fetch is built into the browser now instead of needing to do xhr requests :P ... etc
fetch(endpoint)
    .then(blob => blob.json())          // 3 blob needs to be converted into JSON
    .then(data => cities.push(...data)) // 4 get data into cities array - but can't reassign to a const var. Could use let instead, or we can push the data into cities
    .then(() => console.log(cities));   // 5 "spread" the data into cities instead with ES6 ... 

// 6 when user types in box, take massive array and filter down into a subset and listen for it  
function findMatches(wordToMatch, cities){
    return cities.filter(place => {
        // 7 here we need to figure out if the city or state matches what was searched. Need some regexes
        //8 how to put a var into a regular expression? 
        const regex = new RegExp(wordToMatch, 'gi'); //'gi' = global, insensitive (non-case sensitive)
        return place.city.match(regex) || place.state.match(regex)
    });
}

// 14 add commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
   // console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray);
    // 10 now loop over array and make list items - use backticks for templated info
    const html = matchArray.map(place => {
        //12 make another regex that matches city name to imput and highlights it - replaces with class hl - HIGHLIGHT

        const regex = new RegExp(this.value, 'gi');
        
        const cityName = place.city.replace(regex, `<span class=\"hl"\>${this.value}</span>`);
        // 13 do the same for state name
        const stateName = place.state.replace(regex, `<span class=\"hl"\>${this.value}</span>`);

        // 15 add commas to population, too
        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span> 
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join(''); //11 turns into one big string instead of an array
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// 9 now go back up to displayMatches function and use it to match an array
// got the data! get the data and fnctionality first - then worry about hooking it up to even listeners, etc. 

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

