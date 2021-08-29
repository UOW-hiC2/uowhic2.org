// api url
const api_url = "/data/socials.json";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);

    show(data);
}

// Calling that async function
getapi(api_url);

// Function to define innerHTML for HTML table
function show(data) {
    let tab = ``;
    
    // Loop to access all rows 
    for (let social of data.socials) {
        tab +=  
        `
        <div class="inner" style="cursor: pointer;" onclick="window.location='${social.link}';">
            <div class="paddingIcon">
                <image src="${social.icon}">
            </div>
            <span class="clearOnMobile">
                <h3>${social.name}</h3>
            </span>
        </div>
        `;
    }
    // Setting innerHTML as tab variable
    document.getElementById("social").innerHTML = tab;
}