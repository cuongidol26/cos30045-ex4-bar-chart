const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 600 560");

d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count));

  data.sort((a, b) => b.count - a.count);

  drawBarChart(data);
});

const drawBarChart = data => {
  const labelWidth = 110;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, 420]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 560])
    .paddingInner(0.2);

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  barAndLabel
    .append("rect")
      .attr("class", d => `bar bar-${d.count}`)
      .attr("x", labelWidth)
      .attr("y", 0)
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", (d, i) => i === 0 ? "#c8102e" : "#2f6f8f");

  barAndLabel
    .append("text")
      .attr("class", "brand-label")
      .text(d => d.brand)
      .attr("x", labelWidth - 8)
      .attr("y", yScale.bandwidth() / 2)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "end")
      .style("font-size", "13px");

  barAndLabel
    .append("text")
      .attr("class", "value-label")
      .text(d => d.count)
      .attr("x", d => labelWidth + xScale(d.count) + 5)
      .attr("y", yScale.bandwidth() / 2)
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px");
};
