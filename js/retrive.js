// api url
const social_url = "/data/socials.json";
const about_url = "/data/about.json";
const event_url = "/data/events.json";
const contact_url = "/data/contact.json";
  
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
    let tab = ``;
    tab += `<div class="scroll">`
    tab += `<h1>About Us</h1>`

    tab += `</div>`;
    document.getElementById("ann-about").innerHTML = tab;
}

function eventFunc(data) {

    var time = new Date();

    let tab = `<div class="scroll">`;
    tab += `<h1>Events</h1>`;

    pasTab =  `<h1>Past events</h1>`;
    
    // Loop to access all rows for Upcoming Events
    for (let event of data.events) {
        
        if(event.schedulled === true){
            var sdate= new Date(event.startTime);
            var edate= new Date(event.endTime);


            let newtab = ``
            newtab +=  
            `
            <div class="tab">

            <h1>${event.name}</h1>

            <div class="wrap-button">
            `
            if (edate > time){
                for(let link of event.links) {
                    newtab += 
                    `<button class="event-button" onclick="window.open('${link.uri}')"><h2>${link.name}</h2></button>`;
                }
            }

            if (edate <= time) {
                if ("recording" in event) {
                    if (event.recording != ""){
                        newtab += 
                        `<button class="event-button" onclick="window.open('${event.recording}')"><h2>Recording</h2></button>`;
                    }
                }
            }
            
            newtab += 
            `
            </div>
            <h4>${sdate}</h4>
            <h3>${event.about}</h3>
            <h4>${event.description}</h4>
            
            <img class="poster" src='${event.poster}' onerror="this.style.display='none'"/>
                
            </div><br>
            `;
            if(edate>time)
            {
                tab += newtab;
            }else {
                pasTab += newtab;
            }
        }
    }

    tab += pasTab;
    tab+=`</div>`;
    // Setting innerHTML as tab variable
    document.getElementById("ann-events").innerHTML = tab;
}

function contactFunc(data) {
   
    let tab = `
        <div class="scroll">
        <button class="back" onclick="buttonClick('contact')" ><img src="/icon/back.svg"></button>
        <h1>${data.form.heading}</h1>
        <div class="tab">
        <form action="${data.form.link}" method="POST" target="consume" id="${data.form.id}">`;
    // Loop to access all inputs 
    for (let input of data.form.inputs) {

        var x = '';
        var y='';
        (input.required ? x='required' : x='');
        (input.tag!="textarea"? y='input' : y='textarea');

         tab +=  
         `
            <div class="in">
            <label class = "${x}" for="${input.id}">${input.description}</label><br>
            <${y} type="${input.type}" id="${input.id}" name="entry.${input.id}"  placeholder="${input.placeholder}" ${x}></${y}>
            </div><br>
            
        `;
     }

     
     tab+= `
     <input style="background: white; width:100%; color: black; cursor: pointer;" type="submit" value="Submit">
     <form/"> </div>
     <iframe style="display: none;" name="consume"></iframe>
     </div>
     `;
     // Setting innerHTML as tab variable
    document.getElementById("ann-contact").innerHTML = tab;
}

// Calling that async function
getapi(social_url, social);
getapi(about_url, about);
getapi(event_url, eventFunc);
getapi(contact_url, contactFunc);
