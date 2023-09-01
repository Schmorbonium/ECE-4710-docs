const packetClass = "PacketDoc"

function generateTable(jsonData) {
    var tableHTML = `<table><thead><tr><th colspan=${jsonData.wordSize}>${jsonData.name}</th></tr>`;

    tableHTML += "<tr>"
    for (let i = 0; i < jsonData.wordSize; i++) {
        tableHTML += `<th>${jsonData.wordSize - 1 - i}</th>`
    }
    tableHTML += "</tr></thead><tbody><tr>"

    var cnt = 0
    jsonData["fields"].forEach(element => {
        if (cnt == jsonData.wordSize) {
            cnt = 0
            tableHTML += "</tr><tr>"
        }
        if (cnt + element.bits <= jsonData.wordSize) {
            cnt += element.bits
            tableHTML += `<td colspan=${element.bits}>${element.name}</td>`;
            if (cnt == jsonData.wordSize) {
            }
        }
    });
    tableHTML += "</tr></tbody></table>";
    return tableHTML
}

function generateOptionsTable(options){
    var table = "<table><thead><tr><th>Value</th><th>Description</th></tr></thead>"
    options.forEach(option => {
        table+=`<tr><td>${option.value}</td><td>${option.result}</td></tr>`
    });
    table += "</table>"
    return table
}



function generateDescription(jsonData){
    var des = "<div>"
    jsonData["fields"].forEach(element => {
        if(element.def){
            des += `<h3>${element.name}</h3>`
            des += `<p>${element.def}</p>`
            if(element.options){
                des += generateOptionsTable(element.options)
            }
        }
    });
    des += "</div>"
    return des
}

async function InsertPacketDoc(packDoc) {
    var jsonFilePath = `packetDefs/${packDoc.id}.json`
    try {
        var response = await fetch(jsonFilePath)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();

        // var packDoc = document.getElementById(packDoc.id);
        const contentId = `collapsible-${packDoc.id}`
        var html = 
        `<h2 class="collapsible" data-target=${contentId}>${json.name}</h2>
        <div id="${contentId}" class="content"  style="display: none;">
            ${generateTable(json)}
            ${generateDescription(json)}
        </div>`
        packDoc.innerHTML = html;
    } catch(error) {
        console.error("Error loading JSON:", error);        
    }
}

async function InsertPacketDocs() {
    var packetDocs = document.getElementsByClassName(packetClass);
    for (var i = 0; i < packetDocs.length; i++) {
        var packetDoc = packetDocs[i];
        await InsertPacketDoc(packetDoc)
    }
}