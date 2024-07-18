// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// export default function GraphAirPollution({ data }) {
//     return (
//         <div>
//             <LineChart width={730} height={250} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="time" />
//                 <YAxis yAxisId="left" unit="μg/m³" />
//                 <Tooltip />
//                 <Legend />
//                 <Line yAxisId="left" type="monotone" dataKey="co" stroke="#8884d8" />
//                 <Line yAxisId="left" type="monotone" dataKey="nh3" stroke="#82ca9d" />
//                 {/* <Line yAxisId="left" type="monotone" dataKey="no" stroke="#533e0e" /> */}
//                 <Line yAxisId="left" type="monotone" dataKey="no2" stroke="#f9e1c5" />
//                 <Line yAxisId="left" type="monotone" dataKey="o3" stroke="#3fa0b1" />
//                 <Line yAxisId="left" type="monotone" dataKey="pm10" stroke="#6baa15" />
//                 <Line yAxisId="left" type="monotone" dataKey="so2" stroke="#9396f6" />
//             </LineChart>
//         </div>
//     );
// }


// export default function GraphAirPollution({ data }) {
//     return (
//         <div>
//             <LineChart width={730} height={250} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="time" />
//                 <YAxis yAxisId="left" unit="μg/m³" />
//                 <Tooltip />
//                 <Legend />
//                 <Line yAxisId="left" type="monotone" dataKey="co" stroke="#8884d8" />
//                 <Line yAxisId="left" type="monotone" dataKey="nh3" stroke="#82ca9d" />
//                 {/* <Line yAxisId="left" type="monotone" dataKey="no" stroke="#533e0e" /> */}
//                 <Line yAxisId="left" type="monotone" dataKey="no2" stroke="#f9e1c5" />
//                 <Line yAxisId="left" type="monotone" dataKey="o3" stroke="#3fa0b1" />
//                 <Line yAxisId="left" type="monotone" dataKey="pm10" stroke="#6baa15" />
//                 <Line yAxisId="left" type="monotone" dataKey="so2" stroke="#9396f6" />
//             </LineChart>
//         </div>
//     );
// }
// I

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// export default function GraphAirPollution({ data }) {
//     return (
//         <div>
//             <BarChart width={730} height={250} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="time" />
//                 <YAxis yAxisId="left" unit="μg/m³" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="co" fill="#8884d8" />
//                 <Bar dataKey="nh3" fill="#82ca9d" />
//                 <Bar dataKey="no2" fill="#f9e1c5" />
//                 <Bar dataKey="o3" fill="#3fa0b1" />
//                 <Bar dataKey="pm10" fill="#6baa15" />
//                 <Bar dataKey="so2" fill="#9396f6" />
//             </BarChart>
//         </div>
//     );
// }

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function GraphAirPollution({ data }) {
    return (
        <div>
            <BarChart width={200} height={150} data={data}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="" />
                {/* <YAxis yAxisId="left" unit="μg/m³" /> */}
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="co" fill="#8884d8" yAxisId="left" /> */}
                <Bar dataKey="nh3" fill="#82ca9d" yAxisId="left" />
                <Bar dataKey="pm10" fill="#6baa15" yAxisId="left" />
                <Bar dataKey="o3" fill="#3fa0b1" yAxisId="left" />
                <Bar dataKey="no2" fill="#f9e1c5" yAxisId="left" />
                <Bar dataKey="so2" fill="#9396f6" yAxisId="left" />
            </BarChart>
        </div>
    );
}