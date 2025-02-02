const postsListContainer = document.querySelector(".posts-list-container");

//fetch using XHR, it is an XMLHttpRequest object which helps to fetch data from a server without having to refresh the page.

function fetchUsingXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200){
            displayResults(xhr.response);
        }
        else {
            console.log("Error fetching data");
        }
    };
}

function fetchUsingFetchMethod() {
    const fetchRequest = fetch("https://jsonplaceholder.typicode.com/posts", {
        method : "GET",
    });
    fetchRequest 
    .then((response) => response.json())
    .then((result) => displayResults(result))
    .catch((error) => console.log(error));
}

async function fetchUsingAsyncAwaitMethod() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method : "GET",
    });

    const result = await response.json();
    displayResults(result);

    console.log(result);
}

function helperMethod(method, url){
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json";
        xhr.send();

        xhr.onload = () => {
            if(xhr.status === 200){
                resolve(xhr.response);
            }
            else {
                reject("Error fetching data");
            }
        };
    })
    return promise;
}

async function fetchUsingXHRAndAsyncAwait() {
    const response = await helperMethod('GET', "https://jsonplaceholder.typicode.com/posts");
    displayResults(response)
    console.log('====================================');
    console.log(response);
    console.log('====================================');
}

function displayResults(posts) {
    postsListContainer.innerHTML = posts
    .map(
        (postItem) => `
    <div class="post-item">
    <h3>${postItem.title}</h3>
    <p>${postItem.body}</p>
    </div>
    `
    ) .join(" ");
}

// fetchUsingXHR();
//fetchUsingFetchMethod();
//fetchUsingAsynCAwaitMethod();
fetchUsingXHRAndAsyncAwait();