import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export default function GraphiqueCourbes({data}) {
    return (
        <div>
            <LineChart width={370} height={100} data={data}>
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" unit="°C" />
                <YAxis yAxisId="right" unit="mm" orientation="right" />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="precipitation" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}