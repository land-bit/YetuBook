import GaugeComponent from "react-gauge-component"
export default function Temperature ({temperature}){
    return (
        <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 15,
              color: '#EA4228',
              showTick: true,
              tooltip: {
                text: 'Très basse température!'
              },
              onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
              onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
              onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
            },
            {
              limit: 17,
              color: '#F5CD19',
              showTick: true,
              tooltip: {
                text: 'Basse température!'
              }
            },
            {
              limit: 28,
              color: '#5BE12C',
              showTick: true,
              tooltip: {
                text: 'Température Okay !'
              }
            },
            {
              limit: 30, color: '#F5CD19', showTick: true,
              tooltip: {
                text: 'Haute temperature!'
              }
            },
            {
              color: '#EA4228',
              tooltip: {
                text: 'Très haute temperature!'
              }
            }
          ]
        }}
        pointer={{
          color: '#345243',
          length: 0.85,
          width: 20,
          // elastic: true,
        }}
        labels={{
          valueLabel: { formatTextValue: value => value + 'ºC' },
          tickLabels: {
            type: 'outer',
            valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 },
            ticks: [
              { value: 13 },
              { value: 22.5 },
              { value: 32 }
            ],
          }
        }}
        value={temperature}
        minValue={10}
        maxValue={35}
      />
    )
}