import { C, Diagram, Ln, Lines, T } from '../kit'

const COLS: [string, string, string[], string, string][] = [
  ['Space weather', 'the cause', ['solar flux, A and K', 'indices, X-ray flares,', 'solar wind'], 'How disturbed is it?', C.resist],
  ['Prediction models', 'the forecast', ['you enter two places,', 'a date and power;', 'it estimates MUF', 'and reliability'], 'What should work?', C.power],
  ['Live reports', 'the proof', ['receivers and beacons', 'report what they', 'actually heard'], 'What works right now?', C.signal],
]

/** Three kinds of propagation tool and the question each one answers. */
export function PropagationTools_Flow() {
  return (
    <Diagram w={640} h={360} title="Three kinds of propagation tool. Space weather data describes the sun and Earth's magnetic field and answers how disturbed things are. Prediction models take a path, date and power and estimate which frequencies should work. Live reports show what stations and beacons are actually hearing right now. All three feed one decision: which band to try, and when. When a forecast and a live report disagree, believe the live report." caption="Forecasts are statistical; live reports are what is happening. When they disagree, trust the report.">
      {COLS.map(([a, tag, lines, q, col], i) => {
        const x = 8 + i * 210
        return (
          <g key={a}>
            <rect x={x} y={14} width={198} height={196} rx={12} fill={C.fill} stroke={col} strokeWidth={2.4} />
            <T x={x + 99} y={40} anchor="middle" bold size={15}>{a}</T>
            <T x={x + 99} y={62} anchor="middle" size={12.5} bold color={col}>{tag}</T>
            <Lines x={x + 99} y={92} lines={lines} lh={19} anchor="middle" size={12.5} color={C.muted} />
            <Ln x1={x + 20} y1={166} x2={x + 178} y2={166} color={C.muted} width={1.2} dash="3 4" />
            <T x={x + 99} y={188} anchor="middle" size={13} bold>{q}</T>
            <Ln x1={x + 99} y1={212} x2={250 + i * 70} y2={285} color={col} width={2} arrow />
          </g>
        )
      })}
      <rect x={190} y={286} width={260} height={56} rx={12} fill={C.fill} stroke={C.good} strokeWidth={2.6} />
      <T x={320} y={306} anchor="middle" size={15} bold>Which band, and when?</T>
      <T x={320} y={326} anchor="middle" size={12.5} color={C.muted}>then check by listening</T>
    </Diagram>
  )
}
