const apiKey = "0mG5IltwzxR95VxUmWW9qiYRqQiPikdES5cKosqr";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  $("#search_results_container").empty();
  for (let i=0; i<responseJson.data.length; i++) {
    $("#search_results_container").append(
      `<li><h3>Search Results</h3>
       <p>${responseJson.data[i].fullName}</p>
       <p>${responseJson.data[i].description}</p>
       <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p></li>`
    )
  }
  $("#search_results_container").removeClass("hidden")
}

function getNationalParks(state, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function handleSubmitButton() {
  $("form").submit(event => {
    event.preventDefault();
    const state = $("#state").val();
    const maxResults = $("#max_Results").val() - 1;
    getNationalParks(state, maxResults);
  })
}

$(handleSubmitButton);