import GaugeComponent from 'react-gauge-component'

export default function Speedometre ({vitesse}){

  const kbitsToMbits = (value) => {
    if (value >= 1000) {
      value = value / 1000;
      if (Number.isInteger(value)) {
        return value.toFixed(0) + ' m/s';
      } else {
        return value.toFixed(1) + ' m/s';
      }
    } else {
      return value.toFixed(0) + ' Km/h';
    }
  }

  return(

    <GaugeComponent
    arc={{
      nbSubArcs: 150,
      colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
      width: 0.3,
      padding: 0.003
    }}
    labels={{
      valueLabel: {
        fontSize: 40,
        formatTextValue: kbitsToMbits
      },
      tickLabels: {
        type: "outer",
        ticks: [
          { value: 2 },
          { value: 4 },
          { value: 6 },
          { value: 8 },
          { value: 10 },
          { value: 12 },
          { value: 14 },
          { value: 16 },
          { value: 18 },
          { value: 20 },
          { value: 30 },
          { value: 40 },
          { value: 50 },
          { value: 60 },
        ],
        valueConfig: {
          formatTextValue: kbitsToMbits
        }
      }
    }}
    value={vitesse}
    maxValue={70}
  />
  )
}