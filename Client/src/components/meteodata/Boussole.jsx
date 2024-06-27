import './meteodata.css'

export default function Boussole({ direction }) {
    return (
        <>
            <div className='direction'>
                <div className='boussole'>
                    <svg width={100} height={100}>
                        <circle cx={50} cy={50} r={40} fill="transparent" stroke="transparent" strokeWidth={1} />
                        {/* <line x1={50} y1={50} x2={50 + 15 * Math.sin((direction * Math.PI) / 180)} y2={50 - 15 * Math.cos((direction * Math.PI) / 180)} stroke={direction >= 180 ? 'red' : 'blue'} strokeWidth={5} strokeLinecap="round" /> */}
                        <line x1={50} y1={50} x2={50 + 25 * Math.sin((direction * Math.PI) / 180)} y2={50 - 25 * Math.cos((direction * Math.PI) / 180)} stroke={ 'red' } strokeWidth={6} strokeLinecap="round" />
                        {Array.from(Array(360).keys()).map(angle => {
                            return (
                                <line
                                    key={angle}
                                    x1={50 + 27 * Math.cos(angle * Math.PI / 180)}
                                    y1={50 + 27 * Math.sin(angle * Math.PI / 180)}
                                    x2={50 + 30 * Math.cos(angle * Math.PI / 180)}
                                    y2={50 + 30 * Math.sin(angle * Math.PI / 180)}
                                    stroke="transparent"
                                    strokeWidth={angle % 10 === 0 ? 2 : 1}
                                />
                            );
                        })}
                    </svg>
                </div>
                <small>{direction}°</small>
            </div>
        </>
    )
}