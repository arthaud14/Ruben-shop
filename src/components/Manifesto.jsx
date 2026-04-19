const T = {
  paper: '#F2EFE6',
  paperLine: 'rgba(10,10,10,0.12)',
  ink: '#0A0A0A',
  muted: '#8A8578',
  accent: '#FF4A1C',
  line: '#1C1C1C',
}

const points = [
  ['PAS DE RÉASSORT.', "Quand c'est parti, c'est parti."],
  ['TIRAGES NUMÉROTÉS.', 'Chaque drop est limité et numéroté à la main.'],
  ['COMMUNAUTÉ AVANT TOUT.', 'Les abonnés ont accès en avant-première.'],
  ['INDÉPENDANT. TOUJOURS.', 'Financé par toi, pas par un fond.'],
]

export default function Manifesto() {
  return (
    <section style={{ background: T.paper, color: T.ink, borderBottom: `1px solid ${T.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${T.paperLine}` }}>
        <div style={{ padding: '56px 36px', borderRight: `1px solid ${T.paperLine}` }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 20 }}>
            [ 003 / MANIFESTE ]
          </div>
          <div style={{
            fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800,
            fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.9,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
          }}>
            Des <span style={{ color: T.accent }}>vêtements</span><br />
            qui ne demandent<br />
            pas la permission.
          </div>
        </div>

        <div style={{ padding: '56px 36px', display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gap: 0 }}>
          {points.map(([title, desc], i) => (
            <div key={i} style={{
              padding: '18px 0', borderBottom: i < 3 ? `1px solid ${T.paperLine}` : 'none',
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'baseline',
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.accent, letterSpacing: '0.14em' }}>0{i + 1}</span>
              <div>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.06em' }}>{title}</div>
                <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: T.muted, marginTop: 4 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
