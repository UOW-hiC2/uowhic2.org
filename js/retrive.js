// api url
const social_url = "/data/socials.json";
const about_url = "/data/about.json";
const event_url = "/data/events.json";
  
// Defining async function
async function getapi(url, show) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);

    show(data);
}

// Function to define innerHTML for HTML table
function social(data) {
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

function about(data) {
    let tab = `<h1>About Us</h1>`;
    
    // Loop to access all rows 
    // for (let social of data.socials) {
    //     tab +=  
    //     `
    //     <div class="inner" style="cursor: pointer;" onclick="window.location='${social.link}';">
    //         <div class="paddingIcon">
    //             <image src="${social.icon}">
    //         </div>
    //         <span class="clearOnMobile">
    //             <h3>${social.name}</h3>
    //         </span>
    //     </div>
    //     `;
    // }
    // Setting innerHTML as tab variable
    document.getElementById("ann-about").innerHTML = tab;
}

function eventFunc(data) {
    let tab = `<h1>Events</h1>`;
    
    // Loop to access all rows 
    // for (let social of data.socials) {
    //     tab +=  
    //     `
    //     <div class="inner" style="cursor: pointer;" onclick="window.location='${social.link}';">
    //         <div class="paddingIcon">
    //             <image src="${social.icon}">
    //         </div>
    //         <span class="clearOnMobile">
    //             <h3>${social.name}</h3>
    //         </span>
    //     </div>
    //     `;
    // }
    // Setting innerHTML as tab variable
    document.getElementById("ann-event").innerHTML = tab;
}

// Calling that async function
getapi(social_url, social);
getapi(about_url, about);
getapi(event_url, eventFunc);