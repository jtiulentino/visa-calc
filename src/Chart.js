import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function yearArr() {
    
}

const data = [
  {
    date: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    date: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    date: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    date: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    date: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    date: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Chart() {

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
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );

}

export default Chart;
