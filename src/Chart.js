import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

function getDatesBetween(startDate, endDate) {
    const dates = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return dates;
}

const calc = () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-12-28');
    const dates = getDatesBetween(startDate, endDate);

    const calcdates = getDatesBetween(new Date('2022-01-01'), new Date('2023-12-28'));
    
    const dateToNumberMap = new Map();

    var i = 0
    calcdates.forEach((e) => dateToNumberMap.set(e.toISOString(), i++));
    console.log('map', dateToNumberMap)

    const counterArr = new Array(calcdates.length).fill(90)
    const dayExtraArr = new Array(calcdates.length).fill(0)
    const daysCanStay = new Array(calcdates.length).fill(0)
    const transitions = new Array(calcdates.length).fill(0)
    const wasThere = new Array(calcdates.length).fill(0)

    const periods = [
        [new Date('2022-01-01').toISOString(), new Date('2022-01-28').toISOString()],
        //[new Date('2022-04-01').toISOString(), new Date('2022-04-28').toISOString()], 
        //[new Date('2022-06-01').toISOString(), new Date('2022-06-28').toISOString()],
        //[new Date('2022-08-01').toISOString(), new Date('2022-08-30').toISOString()],
        //[new Date('2022-01-01').toISOString(), new Date('2022-03-30').toISOString()], 
    ]

    periods.forEach((p) => {
        var start = p[0]
        var end = p[1]


        var indexStart = dateToNumberMap.get(start)
        var indexEnd = dateToNumberMap.get(end)
        console.log('st', start, end, indexStart, indexEnd)

        for (let index = indexStart; index <= indexEnd; index++) {
            var back_index = index + 180
            wasThere[index] = 1
            if (back_index < dayExtraArr.length) {
                dayExtraArr[back_index] = 1
            }
            for (let i = index; i < index + 180; i++) {
                counterArr[i] -= 1
            }
            for (let i = index; i < index + 180; i++) {
                transitions[index] = -1
                transitions[index + 180] = 1
            }
        }
    })

    var sum = 0
    const cumSum = transitions.map((sum = 90, n => sum += n));
    //console.log('counterarr', counterArr)
    cumSum.forEach((e, index) => {
        var remainder = e
        if (e <= 0) {
            return 0
        }
        var days = 1
        for (let i = index + 1; i < index + 90; i++) {
            if (i> counterArr.length) {
                break
            }
            days += 1;
            remainder -= 1
            if (i>= 180) {
                remainder += wasThere[i-180] //add a day if we get one back from 180 days ago
            }
            if (remainder <= 0) {
                break
            }

        }
        daysCanStay[index] = days
    })


    var arr = []
    //dates.forEach((e) => { arr.push({ date: e.toISOString(), pv: counterArr[dateToNumberMap.get(e.toISOString())] }) })
    //new Date('2022-03-28').toISOString()
    //const cumulativeSum = (sum => value => sum += value)(0);

    dates.forEach((e) => { arr.push({ date: e.toLocaleDateString(), pv: daysCanStay[dateToNumberMap.get(e.toISOString())] }) })
    //dates.forEach((e) => { arr.push({ date: e.toISOString(), pv: cumSum[dateToNumberMap.get(e.toISOString())] }) })
    return arr
}

function Chart() {
    const [refAreaLeft, setRefAreaLeft] = useState(null);
    const [refAreaRight, setRefAreaRight] = useState(null);
    const [activeDraw, setActiveDraw] = useState(false);

    function handleMouseMove(e) {
        if (activeDraw && e?.activeLabel) {
            setRefAreaRight(e.activeLabel);
        }
    }

    function handleClick(e) {
        if (!activeDraw && e?.activeLabel) {
            setActiveDraw(true);
            setRefAreaLeft(e.activeLabel);
        }

        if (activeDraw && e?.activeLabel) {
            setActiveDraw(false);
            setRefAreaRight(e.activeLabel);
        }
    }

    const data = calc();
    // const data = null;

    return (
        <ResponsiveContainer>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 5,
                }}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                {refAreaLeft && refAreaRight ? (
                    <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.5} />
                ) : null}
            </BarChart>
        </ResponsiveContainer>
    );

}

export default Chart;
