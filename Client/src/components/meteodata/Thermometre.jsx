// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { LinearGaugeComponent, AxesDirective, AxisDirective , PointersDirective, PointerDirective } from '@syncfusion/ej2-react-lineargauge';
// export default function Thermometre({temperature}) {
//    return(
//     <LinearGaugeComponent container={ { width:30, type:'Thermometer' } }>
//         <AxesDirective>
//             <AxisDirective>
//                 <PointersDirective>
//                     <PointerDirective value={temperature} width={15} type='Bar'>
//                     </PointerDirective>
//                 </PointersDirective>
//             </AxisDirective>
//         </AxesDirective>
//     </LinearGaugeComponent>);
// }
import React from 'react';
import GaugeChart from 'react-gauge-chart';

export default function Thermometre({ temperature }) {
  return (
    <GaugeChart
      id="gauge-chart"
      nrOfLevels={3}
      arcWidth={0.3}
      percent={temperature / 100}
      textColor="#333333"
      hideText={true}
      needleColor="#333333"
      backgroundColor="transparent"
      arcPadding={0.02}
      style={{
        height: '100px',
        width: '100px',
      }}
    />
  );
}
