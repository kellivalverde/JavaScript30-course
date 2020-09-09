const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// ^^^ this is hitting a cities .JSON file  -> API
// need to go fetch that array and filter down to a subset for our site

// 1 - Make an empty array for the cities to go into
// 2 gotta go fetch that data! Fetch is built into the browser now instead of needing to do xhr requests :P ... etc
// 3 blob needs to be converted into JSON
// 4 get data into cities array - but can't reassign to a const var. Could use let instead, or we can push the data into cities
// 5 "spread" the data into cities instead with ES6 ... 
// 6 when user types in box, take massive array and filter down into a subset and listen for it

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))
    .then(() => console.log(cities));

function findMatches(wordToMatch, cities){
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched. Need some regexes
        //how to put a var into a regular expression? 
        const regex = new RegExp(wordToMatch, 'gi'); //'gi' = global, insensitive (non-case sensitive)
        return place.city.match(regex) || place.state.match(regex)
    });
}

function displayMatches(){
   // console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray);
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

//now go back up to displayMatches function and use it to  