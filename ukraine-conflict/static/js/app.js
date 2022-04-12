function charts (actor, event) {
    d3.json("/api/data").then(function(data){
        console.log(data);

        //Getting data for graphs
        let filteredActor = data.filter(row => row.ACTOR1 === actor);
        console.log(filteredActor);

        if (event === "Any" || event === "All") {
            filteredEvent = filteredActor;
            console.log(filteredEvent);
        }

        else {
            filteredEvent = filteredActor.filter(row => row.EVENT_TYPE === event);
            console.log(filteredEvent);
        };

        let fatalities = filteredEvent.map(row=> row.FATALITIES);
        console.log(fatalities);

        let sub_type = filteredEvent.map(row=> row.SUB_EVENT_TYPE);
        console.log(sub_type);

        //Bar graph of fatalities by actor
        let trace1 = [
            {
                values: fatalities,
                labels: sub_type,
                type: "pie",    
            }
        ];
            
        let layout = {
            title: "Fatalities by Actor",
            height: 600,
            width: 700,
        };

        Plotly.newPlot("graph1", trace1, layout);


        let trace2 = [
            {
                x: filteredEvent.map(row=> row.EVENT_DATE),
                y: filteredEvent.map(row=> row.FATALITIES),
                type: "bar",
                transforms: [{
                    type: "groupby",
                    groups: filteredEvent.map(row => row.SUB_EVENT_TYPE),
                }],
            }
        ];

        let layout2 = {
            title: "Fatalities by Date",
            yaxis: {
                title: "Fatalities",
            }
        };

        Plotly.newPlot("graph2", trace2, layout2);

    });
};

function eventChange(event) {
    d3.json("/api/data").then(function (data) {
        
        let event = d3.select("#selDataset1").node().value;
        d3.selectAll("#selDataset2 > *").remove()
        let dropdown2 = d3.select("#selDataset2")
        let actors1 = data.map(i => i.ACTOR1)

        uniqueSet2 = new Set(actors1)
        actors = Array.from(uniqueSet2)
        dropdown2.append("option").text("All").property("value", "All")
        actors.sort()


        if (event == 'All' || event == 'Any') {
            for (actor of actors) {
                dropdown2.append("option").text(actor).property("value", actor);
            }
        } else  {
            data2 = data.filter((filterJawn) =>  filterJawn.event_type = event)
            actors2 = data2.map( i => i.ACTOR1)
            uniqueSet3 = new Set(actors2)
            actors3 = Array.from(uniqueSet3)
            
            actors3.sort()
            for (actor of actors3) {
                dropdown2.append("option").text(actor).property("value", actor);
            }
        }         
    });

};

function actorChange(actor1){

    let event = d3.select("#selDataset1").node().value;
    let actor = d3.select("#selDataset2").node().value;

    charts(actor, event);

};

// let info;

function init() {

    let dropdown1 = d3.select("#selDataset1")

    //read in the data for dropdown 1

    d3.json("/api/data").then(function (data) {
        //info = data;
        let event_types1 = data.map( i => i.EVENT_TYPE );
        uniqueSet = new Set(event_types1)
        event_types = Array.from(uniqueSet)

        console.log(event_types)
        event_types.sort()
        dropdown1.append("option").text("All").property("value", "All")
        dropdown1.append("option").text("Any").property("value", "Any")
        for (event_type of event_types) {
            // if(!dropdown1.option.value(event_type))
                dropdown1.append("option").text(event_type).property("value", event_type);
        }

    });

    d3.select('#selDataset1').property('value', 'All');
};

init()
