// !preview r2d3 data = read.csv("Documents/Classes/STAT-850/HW/potroast.csv")
//
// r2d3: https://rstudio.github.io/r2d3
//

var margin = 50;
var width = 650 - (margin * 2);
var height = 500 - (margin * 2);

svg.attr("width", width + (margin * 2))
    .attr("height", height + (margin * 2))
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

var x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.temperature))// Temperature
  .range([ margin, width - margin ]);
  
xAxis = g => g
  .attr("transform", `translate(0,${height - margin})`)
  .call(d3.axisBottom(x))
  .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width * 0.5)
        .attr("y", margin * 0.9)
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .text("Temperature (F)"));

svg.append("g")
  .call(xAxis);
  
var y = d3.scaleLinear()
  .domain(d3.extent(data, d => d.cooktime))
  .range([ height - margin, margin ]);
  
yAxis = g => g
  .attr("transform", `translate(${margin},0)`)
  .call(d3.axisLeft(y))
  .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -height * 0.5)
        .attr("y", -margin * 0.8)
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .text("Cooking time (min)")
        .attr("transform", "translate(0,0)rotate(-90)"));
  
svg.append("g")
  .call(yAxis);

// Make grid
grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", margin)
        .attr("y2", height - margin))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", margin)
        .attr("x2", width - margin));
        
svg.append("g")
  .call(grid);
  
color = d3.scaleOrdinal(data.map(d => d.day), d3.schemeCategory10)
shape = d3.scaleOrdinal(data.map(d => d.pan), 
                        d3.symbols.map(s => d3.symbol().type(s)()))

svg.append("g")
      .attr("stroke-width", 1.5)
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("path")
    .data(data)
    .join("path")
      .attr("transform", d => `translate(${x(d.temperature)},${y(d.cooktime)})`)
      .attr("fill", d => color(d.day))
      .attr("d", d => shape(d.pan));

  
