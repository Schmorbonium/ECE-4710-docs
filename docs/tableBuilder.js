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
            des += `<h3>${element.name}</h3><hr></hr>`
            des += `<p>${element.def}</p>`
            if(element.options){
                des += generateOptionsTable(element.options)
                console.log("Gen Some Options")
            }
        }
    });
    des += "</div>"
    return des
}

function replaceTable(table) {
    var jsonFilePath = table.id + '.json'
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            var jsonTable = document.getElementById(table.id);
            var html = `<h2>${data.name}</h2>
            ${generateTable(data)}
            ${generateDescription(data)}`

            jsonTable.innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });
}

function replaceTables() {


    var tables = document.getElementsByClassName("PacketTable");
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];
        // console.log("Element " + (i + 1) + ": " + table.textContent);
        replaceTable(table)
    }

    // tables.forEach(table => {
    //     if (table.id != '') {
    //         replaceTable(table)
    //         console.log(table.id)
    //     }

    // });
}