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
    // let tab = `<h1>About Us</h1>`;
    // tab += `<div><h2>Coming Soon</h2></div>`
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
    // document.getElementById("ann-about").innerHTML = tab;
}

function eventFunc(data) {
    let tab = ``
    
    // Loop to access all rows 
    for (let event of data.events) {
        if (event.schedulled) {
            let fileExtention = event.poster.split('.').pop();
            if (["mp4"].includes(fileExtention)) {
                tab += `
                    <video autoplay loop class="event-poster" src="${event.poster}" type="video/mp4"></video>
                `
            } else {
                tab += `
                    <img class="event-poster" src="${event.poster}"/>
                `
            }

            tab +=`
            <div class="event-inner-details">
                <h2>${event.name}</h2>
                <h2>${new Date(event["start-time"]).toLocaleString()}</h2>
                <h3>${event.about}</h3>
                <p class="event-p">${event.description}</p>
            `;

            // console.log(event.links);
            tab +=`<div class="warp-buttons">`
            for (let link of event.links) {
                tab +=`
                <button class="inner event-button" onclick="window.location.href='${link.uri}'">
                    <h3>${link.name}</h3>
                </button>
                `
            }
            tab += `</div>`
            tab += `</div>`
        }
    }

    // Setting innerHTML as tab variable
    document.getElementById("con-events").innerHTML = tab;
}

// Calling that async function
getapi(social_url, social);
getapi(about_url, about);
getapi(event_url, eventFunc);