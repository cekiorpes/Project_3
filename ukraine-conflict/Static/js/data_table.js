
function dateChange(date) {
    // d3.json("https://your_flas_kapp.com/data").then(function (data) {
    d3.csv("../Project_3_Test_to_SQL.csv", function (data) {

        let dropdown2 = d3.select("#selDataset2")
        let datad = data.event_type
        if (date == 'Any' || date == 'All') {

            for (dd of datad) {
                dropdown2.append("option").text(event_type).property("value", event_type);
            }
        } else {
            let dd_data = datad.filter(filterJawn => {
                filterJawn.event_date == date
            })
            for (dd of dd_data) {
                dropdown2.append("option").text(event_type).property("value", event_type);
            }
        }
    })

}

function eventChange(event) {
    // d3.json("https://your_flas_kapp.com/data").then(function (data) {
    d3.csv("../Project_3_Test_to_SQL.csv", function (data) {

        let date = d3.select("#selDataset1").node().value;
        let dropdown3 = d3.select("#selDataset3")
        let datad = data.ACTOR1

        if ((event == 'All' || event == 'Any') && (date == 'All' || date == 'Any')) {
            for (dd of datad) {
                dropdown3.append("option").text(actor1).property("value", actor1);
            }

        } else if ((event == 'All' || event == 'Any') && date != 'All' && date != 'Any') {

            let dd_data = data1.filter(filterJawn => {
                filterJawn.event_date == date
            })
            for (dd of dd_data) {
                dropdown3.append("option").text(actor).property("value", actor);
            }
        } else {
            let dd_data = data1.filter(filterJawn => {
                filterJawn.event_date == date && filterJawn.EVENT_TYPE ==event
            })
            for (dd of dd_data) {
                dropdown3.append("option").text(actor).property("value", actor);
            }
        }
    })

}

// let data_imp = optionChanged()

function tabulate(data, columns) {
    var table = d3.select('body').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    // append the header row
    thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .text(function (column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value; });

    return table;
}

function renderTables(data_imp) {
    d3.csv("Project_3_Test_to_SQL.csv", function (error, data) {
        let headerNames = d3.keys(data[0])
        let headerList = []

        for (headerName of headerNames) {
            headerList.append(headerName)
        }

        tabulate(data_imp, [headerList]);

    })
}

// render the tables


//JS file - Phoebe messing with dropdown ideas

function init() {

    let dropdown1 = d3.select("#selDataset1")
    let dropdown2 = d3.select("#selDataset2")
    let dropdown3 = d3.select("#selDataset3")

    //read in the data for dropdown 1
    d3.csv("../Static/Project_3_Test_to_SQL.csv", function (data) {
        // d3.json("https://your_flas_kapp.com/data").then(function (data) {

        let event_dates = data.event_date;
        console.log(event_dates)
        for (event_date of event_dates) {
            dropdown1.append("option").text(date).property("value", date);
        }
        dropdown1.append("option").text("All").property("value", "All")
        dropdown1.append("option").text("Any").property("value", "Any")
        dropdown1.append("option").text("--").property("value", "")
        dropdown2.append("option").text("--").property("value", "")
        dropdown3.append("option").text("--").property("value", "")

    })

    d3.select('#selDataset1').property('value', '');
    d3.select('#selDataset2').property('value', '');
    d3.select('#selDataset3').property('value', '');
}

init()