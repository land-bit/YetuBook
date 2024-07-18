import GaugeComponent from "react-gauge-component"
export default function AirPollutionGauge({ airQualityIndice }) {
  return (
    <>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.5,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 50,
              color: '#72E630',
              showTick: true,
              tooltip: {
                text: 'Air bon'
              },
              onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
              onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
              onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
            },
            {
              limit: 100,
              color: '#FAEF3C',
              showTick: true,
              tooltip: {
                text: 'Air Modéré'
              }
            },
            {
              limit: 150,
              color: '#F67E2A',
              showTick: true,
              tooltip: {
                text: 'Air Mauvais pour les gens sensibles'
              }
            },
            {
              limit: 200,
              color: '#F24423',
              showTick: true,
              tooltip: {
                text: 'Air Mauvais pour la santé'
              }
            },
            {
              limit: 300,
              color: '#9B314D',
              tooltip: {
                text: 'Air Très Mauvais pour la santé'
              }
            },
            {
              limit: 400,
              color: '#7F2223',
              tooltip: {
                text: 'Air Catastrophique'
              }
            },
            {
              color: '#421112',
              tooltip: {
                text: 'Air Très Catastrophique'
              }
            }
          ]
        }}
        pointer={{
          color: '#345243',
          length: 0.9,
          width: 10,
          // elastic: true,
        }}
        labels={{
          valueLabel: { formatTextValue: value => value },
          tickLabels: {
            type: 'outer',
            valueConfig: { formatTextValue: value => value, fontSize: 10 },
            ticks: [
              { value: 50 },
              { value: 100 },
              { value: 150 },
              { value: 200 },
              { value: 300 },
              { value: 400 }
            ],
          }
        }}
        value={airQualityIndice}
        minValue={0}
        maxValue={500}
      />
    </>
  )
}