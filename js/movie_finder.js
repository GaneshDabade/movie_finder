const token = config.MY_API_TOKEN;
const key = config.SECRET_API_KEY;

//Api url
const API_URL = "http://www.omdbapi.com/?i=" + token + "&apikey=" + key + "&s=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=" + key + "&i=";

const search_query = document.getElementsByClassName("inputBox")[0];
console.log("queryObj" + search_query);


document.getElementsByClassName("btn")[0].addEventListener("click", (event) => {
    event.preventDefault();
    console.log(search_query.value);
    if (search_query.value) {
        getapi(API_URL + search_query.value);
    }
});

// Defining async function
async function getapi(url) {
    try {
        // Storing response
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // Storing data in form of JSON
        const data = await response.json();
        console.log(data);
        const dt = data.Search;
        // show(data);
        const output = document.getElementById("flex-container");
        output.innerHTML = "";
        dt.forEach(async(ele) => {
            // output.innerHTML += `
            // <div class="card">
            //     <img src="${ele.Poster}" alt="Poster" style="width:100%">
            //     <div class="container">
            //         <h4><b>Title: ${ele.Title}</b></h4>
            //         <p>Rating: ${ele.Type}</p>
            //         <p>Director Name: ${ele.Year}</p>
            //     </div>
            // </div>`
            const movieInfo = await fetch(API_URL_SEARCH + ele.imdbID);
            const movieObj = await movieInfo.json();
            show(movieObj);
        });
    } catch (error) {
        console.log(error);
    }
}


// // Function to define innerHTML for HTML table
function show(mdata) {

    const mEle = document.getElementById("flex-container");
    mEle.innerHTML += `
            <div class="card">
                <img src="${mdata.Poster}" alt="Poster" style="width:100%">
                <div class="container">
                    <h4><b>Title: ${mdata.Title}</b></h4>
                    <p>Rating: ${mdata.imdbRating}</p>
                    <p>Director Name: ${mdata.Director}</p>
                    <p>Released Date: ${mdata.Released}</p>
                    <p>Genre: ${mdata.Genre}</p>
                </div>
            </div>`




    // Loop to access all rows
    //     for (let r of data.list) {
    //         tab += `<tr>
    // 	<td>${r.name} </td>
    // 	<td>${r.office}</td>
    // 	<td>${r.position}</td>
    // 	<td>${r.salary}</td>		
    // </tr>`;
    //     }
    //     // Setting innerHTML as tab variable
    //     document.getElementById("employees").innerHTML = tab;
}