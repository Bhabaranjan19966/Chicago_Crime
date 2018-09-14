var d3;

const margin = {
  top: 0, right: 20, bottom: 20, left: 300,
};
const width = 950 - margin.right - margin.left;
const height = 600 - margin.top - margin.bottom;
const radius = width / 2.5;
const color = d3.scaleOrdinal()
  .range(['#29339B', '#74A4BC', '#B6D6CC', '#F1FEC6', '#2FF3A20', '#FFC200', '#003049', '#F45B69']);
const arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);
const labelArc = d3.arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);
const pie = d3.pie()
  .sort(null)
  .value(d => d.Count);
const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`);
const names = ['ATTEMPT: ARMED-KNIFE/CUT INSTR', 'AGGRAVATED VEHICULAR HIJACKING', 'STRONGARM - NO WEAPON', 'ARMED: HANDGUN', 'ARMED: OTHER DANGEROUS WEAPON', 'ARMED:KNIFE/CUTTING INSTRUMENT', 'AGGRAVATED', 'VEHICULAR HIJACKING', 'ATTEMPT: STRONGARM-NO WEAPON', 'ATTEMPT: ARMED-OTHER DANG WEAP', 'ATTEMPT: ARMED-OTHER FIREARM', 'ARMED: OTHER FIREARM', 'ATTEMPT: AGGRAVATED', 'ATTEMPT: ARMED-HANDGUN'];
d3.json('../json_output/assignment3.json', (error, data) => {
  if (error) throw error;
  data.forEach((d) => {
    d.Count = +d.Count;
    d.Type = d.Type;
  });
  const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');
  g.append('path')
    .attr('d', arc)
    .style('fill', d => color(d.data.Type))
    .on('mouseover', (d, i) => {
      svg.append('text')
        .attr('dy', '.5em')
        .style('text-anchor', 'middle')
        .style('font-size', 20)
        .attr('class', 'label')
        .style('fill', (d, i) => '#FF4F00')
        .text(names[i]);
    })
    .on('mouseout', (d) => {
      svg.select('.label').remove();
    })
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attrTween('d', tweenPie);
});
function tweenPie(b) {
  b.innerRadius = 0;
  const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
  return function (t) { return arc(i(t)); };
}

//stake-bar starts here
const margin1 = {
  top: 600, right: 20, bottom: 20, left: 50,
};
const width1 = 1000 - margin1.left - margin1.right;
const height1 = 1290 - margin1.top - margin1.bottom;
// parse the YEAR / time
const parseTime = d3.timeParse('%Y');
// set the ranges
const x = d3.scaleTime().range([0, width1]);
const y = d3.scaleLinear().range([height1, 0]);
// define the line
const valueline = d3.line()
  .x(d => x(d.YEAR))
  .y(d => y(d.ROBBERY));
// define the line
const valueline2 = d3.line()
  .x(d => x(d.YEAR))
  .y(d => y(d.BURGLARY));
// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin1
const svg1 = d3.select('body').append('svg')
  .attr('width', width1 + margin1.left + margin1.right)
  .attr('height', height1 + margin1.top + margin1.bottom)
  .append('g')
  .attr('transform',
    `translate(${margin1.left},${margin1.top})`);
function draw(data, country) {
  var data = data[country];
  // format the data
  data.forEach((d) => {
    d.YEAR = parseTime(d.YEAR);
    d.ROBBERY = +d.ROBBERY;
    d.BURGLARY = +d.BURGLARY;
  });
  // sort years ascending
  data.sort((a, b) => a.YEAR - b.YEAR);
  // Scale the range of the data
  x.domain(d3.extent(data, d => d.YEAR));
  y.domain([0, d3.max(data, d => Math.max(d.ROBBERY, d.BURGLARY))]);
  // Add the valueline path.
  svg1.append('path')
    .data([data])
    .attr('class', 'line')
    .attr('d', valueline);
  // Add the valueline path.
  svg1.append('path')
    .data([data])
    .attr('class', 'line')
    .attr('d', valueline2);
  // Add the X Axis
  svg1.append('g')
    .attr('transform', `translate(0,${height1})`)
    .call(d3.axisBottom(x));
  // Add the Y Axis
  svg1.append('g')
    .call(d3.axisLeft(y));
    svg1.append('text')
     .attr('transform', `translate(${(margin1.bottom+525)},${(margin1.right + (290))})`)
     .attr('dy', '.35em')
     .attr('text-anchor', 'start')
     .style('fill', 'green')
     .style('font-size', '20px')
     .text('ROBBERY');
     svg1.append('text')
     .attr('transform', `translate(${(margin1.bottom+400)},${(margin1.left -30 )})`)
     .attr('dy', '.35em')
     .attr('text-anchor', 'start')
     .style('fill', 'red')
     .style('font-size', '20px')
     .text('BURGLARY');
}
// Get the data
d3.json('../json_output/1st.json', (error, data) => {
  if (error) throw error;
  // trigger render
  draw(data, 'Primery_Crime');
});
//Mulit line graph starts here
const margin2 = {
  top: 1000,
  right: 20,
  bottom: 60,
  left: 60,
};
const width2 = 800 - margin2.left - margin2.right;
const height2 = 1315 - margin2.top - margin2.bottom;
const that = this;
const xs = d3.scaleBand().rangeRound([0, width2]).paddingInner(0.5);
const ys = d3.scaleLinear().rangeRound([height2, 0]);
const color3 = d3.scaleOrdinal(d3.schemeCategory20);
const xAxis = d3.axisBottom(xs);
const yAxis = d3.axisLeft(ys).tickFormat(d3.format('.0%'));
const svg3 = d3.select('.viz-portfolio-delinquent-status').append('svg').attr('width', width2 + margin2.left + margin2.right).attr('height', height2 + margin2.top + margin2.bottom)
  .append('g')
  .attr('transform', `translate(${margin2.left},${margin2.top})`);
d3.json('../json_output/assignment2.json', (err, data) => {
  if (err) {
    throw e;
  }
  color3.domain(d3.keys(data[0]).filter(key => key !== 'Year'));
  data.forEach((d) => {
    let y0 = 0;
    d.rates = color3.domain().map((name) => {
      console.log();
      return {
        name,
        y0,
        y1: y0 += +d[name],
        amount: d[name],
      };
    });
    d.rates.forEach((d) => {
      d.y0 /= y0;
      d.y1 /= y0;
    });
    console.log(data);
  });
  xs.domain(data.map(d => d.Year));
  svg3.append('g').attr('class', 'x axis').attr('transform', `translate(0,${height2})`).call(xAxis);
  svg3.append('g').attr('class', 'y axis').call(yAxis);
  const Year = svg3.selectAll('.interest-rate').data(data).enter().append('g')
    .attr('class', 'interest-rate')
    .style('left', '10px')
    .attr('transform', d => `translate(${xs(d.Year)},0)`);
  Year.selectAll('rect').data(d => d.rates).enter().append('rect')
    .attr('width', xs.bandwidth())
    .attr('y', d => ys(d.y1))
    .attr('height', d => ys(d.y0) - ys(d.y1))
    .style('margin-top', '10px')
    .style('fill', d => color3(d.name))
    .on('mouseover', (d) => {
      let total_amt;
      total_amt = d.amount;
      console.log('----');
    })
    .on('mouseout', () => {
      d3.select('.chart-tip').style('opacity', '0');
    });
  const legend = svg3.selectAll('.legend').data(color3.domain().slice().reverse()).enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(${i * -70},283)`);
  legend.append('rect').attr('x', width2 + -53).attr('width', 10).attr('height', 10)
    .style('fill', color3);
  legend.append('text').attr('x', width2 - 40).attr('y', 5).attr('width', 40)
    .attr('dy', '.35em')
    .style('text-anchor', 'start')
    .text(d => d);
});
