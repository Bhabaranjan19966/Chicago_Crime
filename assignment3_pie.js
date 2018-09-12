
const margin = {
    top: 20, right: 20, bottom: 20, left: 50,
};


const width = 700 - margin.right - margin.left;


const height = 700 - margin.top - margin.bottom;


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



d3.json('./assignment3.json', (error, data) => {
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

        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attrTween('d', tweenPie);


    g.append('text')
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('dy', '.35em')
        .text(d => d.data.Type);

});

function tweenPie(b) {
    b.innerRadius = 0;
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return function (t) { return arc(i(t)); };
}


