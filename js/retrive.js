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
    tab += `<div class="scroll"><h2>Coming Soon</h2></div>`;
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

    var time = new Date();

    let tab = `<div class="scroll">`;
    tab += `<h1>Events</h1>`;
    
    // Loop to access all rows for Upcoming Events
    for (let event of data.events) {
        
        if(event.schedulled === true){
            var sdate= new Date(event.startTime);
            var edate= new Date(event.endTime);

            if(edate>time)
            {
                tab +=  
                `
                <div class="eventTab">

                <h1>${event.name}</h1>

                <div class="wrap-button">
                `
                for(let link of event.links) {
                    tab += 
                    `<button class="event-button" onclick="window.open('${link.uri}')"><h2>${link.name}</h2></button>`
                }

                
                tab += 
                `
                </div>
                <h4>${sdate}</h4>
                <h3>${event.about}</h3>
                <h4>${event.description}</h4>
                
                <img style="position: relative; height:auto; width: 50vw;" src='${event.poster}' onerror="this.style.display='none'"/>
                    
                </div><br>
                `;

            }
        }
         
    }


    // Loop to access all rows for past evets
    
    tab += `<h1>Past events</h1>`;
    for (let event of data.events) {
        
        if(event.schedulled === true){
            var sdate= new Date(event.startTime);
            var edate= new Date(event.endTime);

            if(edate<time)
            {
                tab +=  
                `
                <div class="eventTab">

                <h1>${event.name}</h1>

                <div class="wrap-button">
                `
                for(let link of event.links) {
                    tab += 
                    `<button class="event-button" onclick="window.open('${link.uri}')"><h2>${link.name}</h2></button>`
                }

                
                tab += 
                `
                </div>
                <h4>${sdate}</h4>
                <h3>${event.about}</h3>
                <h4>${event.description}</h4>
                
                <img style="position: relative; height:auto; width: 50vw;" src='${event.poster}' onerror="this.style.display='none'"/>
                    
                </div><br>
                `;

            }
        }
         
    }
    

    tab+=`</div>`;
    // Setting innerHTML as tab variable
    document.getElementById("ann-events").innerHTML = tab;
}

// Calling that async function
getapi(social_url, social);
getapi(about_url, about);
getapi(event_url, eventFunc);
