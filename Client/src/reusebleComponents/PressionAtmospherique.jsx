import GaugeComponent from 'react-gauge-component'
export default function PressionAtmospherique({pression}){

    const currentPressure = pression;
    const minPressure = 870;
    const maxPressure = 1050;

    const percentage = ((currentPressure - minPressure) / (maxPressure - minPressure)) * 100;

    return (
        <GaugeComponent
        value={Math.round(percentage)}
        type="radial"
        labels={{
          tickLabels: {
            type: "inner",
            ticks: [
              { value: 10 },
              { value: 40 },
              { value: 60 },
              { value: 80 },
              { value: 100 }
            ]
          }
        }}
        arc={{
          colorArray: ['#5BE12C', '#EA4228'],
          subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
          padding: 0.02,
          width: 0.3
        }}
        pointer={{
          elastic: true,
          animationDelay: 0
        }}
      />
    )
}



// import React from 'react';
// import { useGauge } from 'use-gauge'; // Assurez-vous de mettre le nom correct du package

// const PressionAtmospherique = ({ numTicks, diameter, minValue, maxValue, tickColor, tickLength, needleColor, value }) => {
//     const {
//         ticks,
//         angleToValue,
//         getTickProps,
//         getLabelProps,
//         getArcProps,
//         getNeedleProps,
//         getSVGProps,
//     } = useGauge({
//         startAngle: 90,
//         endAngle: 270,
//         numTicks,
//         diameter,
//         domain: [minValue, maxValue],
//     });

//     const { tip, base, points } = getNeedleProps({
//         value,
//         baseRadius: 12,
//         tipRadius: 8,
//     });

//     const valueToAngle = (value) => {
//         // Supposez que la valeur varie de 0 à 100 et que l'angle va de 0 à 360 degrés
//         const angle = (value / 100) * 360;
//         return angle;
//     }
    

//     return (
//         <svg {...getSVGProps()}>
//             {ticks.map((angle) => (
//                 <React.Fragment key={`tick-group-${angle}`}>
//                     <line
//                         stroke={tickColor}
//                         {...getTickProps({ angle, length: tickLength })}
//                     />
//                     <text
//                         className="text-sm fill-gray-500 font-medium"
//                         {...getLabelProps({ angle, offset: 20 })}
//                     >
//                         {angleToValue(angle)}
//                     </text>
//                 </React.Fragment>
//             ))}

//             <path
//                 {...getArcProps({ offset:4, startAngle: 90, endAngle: 270 })}
//                 className="stroke-gray-100"
//                 strokeLinecap="round"
//                 strokeWidth={24}
//             />

//             <path
//                 {...getArcProps({
//                     offset:4,
//                     startAngle:90,
//                     endAngle: valueToAngle(value),
//                 })}
//                 className="stroke-blue-600"
//                 strokeLinecap="round"
//                 strokeWidth={24}
//             />



//             <g id="needle">
//                 <circle className="fill-gray-300" {...base} r={24} />
//                 <circle fill={needleColor} {...base} />
//                 <circle fill={needleColor} {...tip} />
//                 <polyline fill={needleColor} points={points} />
//                 <circle className="fill-white" {...base} r={4} />
//             </g>
//         </svg>
//     );
// };

// export default PressionAtmospherique;