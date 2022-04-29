// !preview r2d3 data = 0
//
// r2d3: https://rstudio.github.io/r2d3
//

var days = ["1", "2", "3", "4", "5", "6", "7", "8"]

var color = d3.scaleOrdinal()
  .domain(days)
  .range(d3.schemeCategory10)
  
svg.selectAll("dots")
  .data(days)
  .enter()
  .append("circle")
    .attr("cx", 200)
    .attr("cy", function(d,i){ return 100 + i*25})
    .attr("r", 7)
    .style("fill", function(d){ return color(d)})
    
svg.selectAll("labels")
  .data(days)
  .enter()
  .append("text")
    .attr("x", 220)
    .attr("y", function(d,i){ return 100 + i*25})
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    
// Legend mapping pans to shapes
    
var pan = ["Covered", "Rack in pan", "Uncovered"]
  
svg.append("circle")
  .attr("cx", 300).attr("cy", 125).attr("r", 7).style("fill", "#444444");
svg.append("path").attr("d", d3.symbol().type(d3.symbolCross).size(100))
  .attr("transform", "translate(300, 175)").style("fill", "#444444");
svg.append("path").attr("d", d3.symbol().type(d3.symbolDiamond).size(100))
  .attr("transform", "translate(300, 225)").style("fill", "#444444");
    
svg.selectAll("labels")
  .data(pan)
  .enter()
  .append("text")
    .attr("x", 320)
    .attr("y", function(d,i){ return 125 + i*50})
    .text(function(d){ return d})
    .style("fill", "#444444")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");
    
// Title
svg.append("text")
  .attr("x", 210)
  .attr("y", 70)
  .text("Day")
  .attr("text-anchor", "middle")
  .style("fill", "#000000");

svg.append("text")
  .attr("x", 340)
  .attr("y", 70)
  .text("Pan")
  .attr("text-anchor", "middle")
  .style("fill", "#000000");
