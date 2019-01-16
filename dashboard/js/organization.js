/**
 * Created by Ali on 3/1/2017.
 */

$(document).ready(function () {
    var data1 = {
        labels: ['Good', 'Very good', 'Excellent', 'Weak', 'Very weak'],
        series: [[4, 2, 5, 3, 6]]
    };

    var options1 = {
        low: 0,
        high: 6,
        axisY : {
            onlyInteger: true
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 10,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];


    new Chartist
        .Bar('#chart1', data1, options1, responsiveOptions)
        .on('draw',function (data) {
            if (data.type === 'bar') {
                var label = new Chartist.Svg("text"),
                    barHorizontalCenter = data.x1,
                    barVerticalCenter = data.y2 + 30;
                label.text(data.value.y);
                label.attr({
                    x: barHorizontalCenter,
                    y: barVerticalCenter,
                    "text-anchor": "middle",
                    style: "font-family: 'oxygen', Helvetica, Arial, sans-serif; font-size: 22px; fill: white; font-weight: bold;"
                });
                data.group.append(label);
            }
        })




    var data2 = {
        labels: ['Good', 'Very good', 'Excellent', 'Weak', 'Very weak'],
        series: [
            [3, 10, 46, 4, 3],
            [8, 25, 38, 8, 5],
            [9, 33, 45, 13, 8],
            [21, 40, 60, 23, 15],
            [18, 30, 50, 15, 20],
            [7, 24, 35, 8, 10]

        ]
    };


    var options2 = {
        seriesBarDistance: 18,
        low: 0,
        high: 60,
        axisY : {
            onlyInteger: true
        },
        chartPadding: {
            top: 0,
            right: 150,
            bottom: 0,
            left: 20
        }
    };

    new Chartist
        .Bar('#chart2', data2, options2, responsiveOptions)
        .on('draw',function (data) {
            if (data.type === 'bar') {
                var label = new Chartist.Svg("text"),
                    barHorizontalCenter = data.x1,
                    barVerticalCenter = data.y2 + 20;
                label.text(data.value.y);
                label.attr({
                    x: barHorizontalCenter,
                    y: barVerticalCenter,
                    "text-anchor": "middle",
                    style: "font-family: 'oxygen', Helvetica, Arial, sans-serif; font-size: 12px; fill: white; font-weight: bold;"
                });
                data.group.append(label);
            }
        })
})