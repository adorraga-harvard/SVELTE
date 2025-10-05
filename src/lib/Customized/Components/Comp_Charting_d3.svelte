function _drawPie(g, innerWidth, innerHeight, numericData) {
    const svg = g;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    svg.select('.x-axis').style('opacity', 0);
    svg.select('.y-axis').style('opacity', 0);

    const pie = d3.pie()
        .value(d => d[yKey])
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const pieGroup = svg.select('.pie-group');
    pieGroup.attr('transform', `translate(${centerX}, ${centerY})`);

    pieGroup.selectAll('path')
        .data(pie(numericData), d => d.data[xKey])
        .join(
            enter => enter.append('path')
                .attr('class', 'cursor-pointer')
                .attr('d', arc)
                .attr('fill', d => colorScale(d.data[xKey]))
                .on('click', (event, d) => handleClick(d.data))
                .on('mouseover', (event, d) => handleMouseOver(event, d.data))
                .on('mouseout', (event, d) => handleMouseOut(event, d.data)),
            update => update
                .transition().duration(800)
                .attr('d', arc)
                .attr('fill', d => colorScale(d.data[xKey])),
            exit => exit.transition().duration(400).remove()
        );

    const legendContainer = d3.select(chartContainer).select('.legend-group');
    _drawLegend(legendContainer, numericData);
}

function _drawDonut(g, innerWidth, innerHeight, numericData) {
    const svg = g;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    svg.select('.x-axis').style('opacity', 0);
    svg.select('.y-axis').style('opacity', 0);

    const pie = d3.pie()
        .value(d => d[yKey])
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius);

    const pieGroup = svg.select('.pie-group');
    pieGroup.attr('transform', `translate(${centerX}, ${centerY})`);

    pieGroup.selectAll('path')
        .data(pie(numericData), d => d.data[xKey])
        .join(
            enter => enter.append('path')
                .attr('class', 'cursor-pointer')
                .attr('d', arc)
                .attr('fill', d => colorScale(d.data[xKey]))
                .on('click', (event, d) => handleClick(d.data))
                .on('mouseover', (event, d) => handleMouseOver(event, d.data))
                .on('mouseout', (event, d) => handleMouseOut(event, d.data)),
            update => update
                .transition().duration(800)
                .attr('d', arc)
                .attr('fill', d => colorScale(d.data[xKey])),
            exit => exit.transition().duration(400).remove()
        );

    const legendContainer = d3.select(chartContainer).select('.legend-group');
    _drawLegend(legendContainer, numericData);
}
