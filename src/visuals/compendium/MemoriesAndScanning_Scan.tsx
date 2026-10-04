import { C, Diagram, Ln, T, useTime } from '../kit'

const FIELDS = [
  { k: 'Name', v: 'Local' },
  { k: 'Receive', v: '146.940' },
  { k: 'Offset', v: '−0.600' },
  { k: 'Tone', v: '100.0 Hz' },
  { k: 'Mode', v: 'FM' },
  { k: 'Power', v: 'High' },
]

type St = 'open' | 'busy' | 'skip'
const CH: { n: number; st: St }[] = [
  { n: 1, st: 'open' }, { n: 2, st: 'open' }, { n: 3, st: 'skip' }, { n: 4, st: 'busy' },
  { n: 5, st: 'open' }, { n: 6, st: 'skip' }, { n: 7, st: 'open' }, { n: 8, st: 'open' },
]
// scan order: skipped channels are never visited; the scanner dwells on the busy one
const SEQ: number[] = [0, 1, 3, 3, 3, 3, 4, 6, 7]

/** A memory channel stores a whole setup; scanning steps through memories and stops on activity. Example values. */
export function MemoriesAndScanning_Scan() {
  const { t, ref } = useTime(1)
  const tick = Math.floor(t * 3) % SEQ.length
  const cur = SEQ[tick]
  const stopped = CH[cur].st === 'busy'
  const bw = 90, gap = 8, x0 = 20
  const bx = (i: number) => x0 + i * (bw + gap)
  const cw = 68, cg = 8
  const cx = (i: number) => 20 + i * (cw + cg)
  return (
    <Diagram w={640} h={330} svgRef={ref}
      title="A memory channel stores frequency, offset, tone, mode, power and a name together; scanning steps through the stored channels, skips locked-out ones and stops on a channel with a signal"
      caption="Example values only. The scan cursor skips locked-out channels and holds on a busy one.">
      <T x={20} y={20} size={14} bold>One memory channel (example)</T>
      {FIELDS.map((f, i) => (
        <g key={f.k}>
          <rect x={bx(i)} y={36} width={i === 5 ? 84 : bw} height={58} rx={9} fill={C.fill} stroke={C.signal} strokeWidth={2} />
          <T x={bx(i) + (i === 5 ? 42 : bw / 2)} y={54} anchor="middle" size={12} color={C.muted}>{f.k}</T>
          <T x={bx(i) + (i === 5 ? 42 : bw / 2)} y={77} anchor="middle" size={14} bold>{f.v}</T>
        </g>
      ))}
      <T x={20} y={118} size={13} color={C.muted}>Recall it and the radio sets every field at once: no retyping, no wrong offset or tone.</T>

      <T x={20} y={160} size={14} bold>Scanning a bank of memories</T>
      {CH.map((c, i) => {
        const here = i === cur
        const col = c.st === 'busy' ? C.good : c.st === 'skip' ? C.muted : C.signal
        return (
          <g key={c.n} opacity={c.st === 'skip' ? 0.55 : 1}>
            <rect x={cx(i)} y={196} width={cw} height={58} rx={9} fill={c.st === 'busy' ? C.fill2 : C.fill}
              stroke={here ? C.power : col} strokeWidth={here ? 4 : 2} strokeDasharray={c.st === 'skip' ? '5 4' : undefined} />
            <T x={cx(i) + cw / 2} y={216} anchor="middle" size={13} bold>{`Ch ${c.n}`}</T>
            <T x={cx(i) + cw / 2} y={238} anchor="middle" size={12} color={col} bold>
              {c.st === 'busy' ? 'signal' : c.st === 'skip' ? 'skip' : 'quiet'}
            </T>
            {here && <path d={`M${cx(i) + cw / 2 - 9},176 L${cx(i) + cw / 2 + 9},176 L${cx(i) + cw / 2},191 Z`} fill={C.power} />}
          </g>
        )
      })}
      <T x={20} y={282} size={13} bold color={stopped ? C.good : C.power}>
        {stopped ? 'Stopped on Ch 4: the scanner holds while the signal lasts' : 'Moving on: nothing heard here'}
      </T>
      <T x={20} y={306} size={13} color={C.muted}>Dashed channels are locked out (skipped), so a busy or noisy frequency does not stop the scan.</T>
      <Ln x1={20} y1={140} x2={620} y2={140} color={C.fill2} width={1} />
    </Diagram>
  )
}
