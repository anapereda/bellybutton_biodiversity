
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildBubbleChart(newSample);
    buildGauge(newSample);
    buildChart(newSample);
    //buildGauge(newSample)

  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var resultObject = resultArray[0];
      var resultpair = Object.entries(resultObject);
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      var result= [resultpair.forEach(([key, value]) => {
          console.log(key + ": " + value)
          PANEL.append("h6").text((key + ": " + value).toUpperCase());})];
      console.log(result);

    });
  }


  function buildChart(sample) {
    d3.json("samples.json").then((data) => {
        var sampleData= data.samples;
        var resultArray = sampleData.filter(sampleObj => sampleObj.id == sample).reverse();
        var x = resultArray[0]["sample_values"];
        console.log(x.slice(0,10).reverse())
        var y = resultArray[0]["otu_ids"].slice(0,10).reverse();
        console.log(y)
        var text = resultArray[0]["otu_labels"].slice(0,10);

        console.log(resultArray)
        var trace1 = {
            //otu_labels
            x: x.slice(0,10).reverse(),
            y: y.map(id => 'OTU: ' + id),
            text: text,
            type: "bar",
            orientation: "h",
        };
        var data= [trace1];

        var layout ={
            title: "OTU Ids vs. Sample Frequency",
        };
    Plotly.newPlot("bar", data, layout)
    });
    }
function buildGauge (sample){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var resultObject = resultArray[0];
        var result= resultObject.wfreq

        var data =[
            {
                type: "indicator",
                mode: "gauge+number+delta",
                value: 2,
                title: {text: "Belly Button Washing Frequency", font: {size: 20}
            },
                delta: {reference: 2, increasing: {color: "RebeccaPurple"}},
                gauge: {
                    axis: {range: [null, 9], tickwith: 1, tickcolor: "green" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 3], color: "cyan" },
                        { range: [3, 6], color: "royalblue" },
                        { range: [6,9], color: "red"}
                    ],
                    threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.75,
                        value: 9
                    }
                }
            }];
        var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "darkblue", family: "Arial" }
            };
                      
    Plotly.newPlot('gauge', data, layout); 


    });
}
function buildBubbleChart(sample) {
    d3.json("samples.json").then((data) => {
        var sampleData= data.samples;
        var resultArray = sampleData.filter(sampleObj => sampleObj.id == sample).reverse();
        var x= resultArray[0]["otu_ids"]
        var y = resultArray[0]["sample_values"]
        var text= resultArray[0]["otu_labels"]
        var trace1 = {
            x: x,
            y: y,
            text: text,
            mode: 'markers',
            marker: {
                color: resultArray[0]["otu_ids"],
                size: resultArray[0]["sample_values"],
                colorscale: 'Earth'
                }

            }
        var data = [trace1]
        var layout= {
            showlegend: false,
            title: "OTU IDS vs. Sample Frequency: Area relates to Sample Value"
        }
        Plotly.newPlot("bubble", data, layout)
    });

}
