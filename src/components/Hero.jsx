import { useState, useEffect } from 'react'

const T = {
  bg: '#0E0E0E',
  paper: '#F2EFE6',
  line: '#1C1C1C',
  accent: '#FF4A1C',
  muted: '#8A8578',
  card: '#151515',
}

export default function Hero() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(i)
  }, [])

  const target = new Date('2026-05-11T10:00:00').getTime()
  const diff = Math.max(0, target - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)

  return (
    <section style={{ background: T.bg, color: T.paper, borderBottom: `1px solid ${T.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', borderBottom: `1px solid ${T.line}` }}>

        {/* Big typo */}
        <div style={{ padding: '56px 40px 40px', borderRight: `1px solid ${T.line}` }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted,
            letterSpacing: '0.14em', marginBottom: 24,
          }}>
            [ 001 / INDEX ] — MAJ {new Date().toISOString().slice(0, 10)} · {new Date().toLocaleTimeString('fr-FR').slice(0, 5)}
          </div>
          <h1 style={{
            fontFamily: "'Archivo Narrow', 'Archivo', sans-serif", fontWeight: 800,
            fontSize: 'clamp(72px, 12vw, 200px)', lineHeight: 0.85,
            letterSpacing: '-0.04em', margin: 0, textTransform: 'uppercase',
          }}>
            DES<br />
            PIÈCES<br />
            <span style={{ color: T.accent }}>QUI FONT</span><br />
            DU BRUIT.
          </h1>
          <div style={{
            display: 'flex', gap: 16, marginTop: 40, alignItems: 'center',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.muted,
          }}>
            <a href="/boutique" style={{
              background: T.accent, color: '#0A0A0A',
              border: 'none', padding: '14px 26px',
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800, letterSpacing: '0.14em', fontSize: 13,
              textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block',
            }}>
              ▸ Shop le drop
            </a>
            <span>→ tirages numérotés · livr. 48h</span>
          </div>
        </div>

        {/* Countdown panel */}
        <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 12 }}>
              → PROCHAIN DROP
            </div>
            <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>
              DROP 04 — PRINTEMPS 26
            </div>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: T.muted, marginTop: 8, lineHeight: 1.5 }}>
              Vêtements, zines, disques & musique live.<br />
              5 Rue Simone de Beauvoir · 69007 Lyon
            </div>
          </div>

          <div style={{
            background: T.card, border: `1px solid ${T.line}`,
            padding: 18, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8,
          }}>
            {[['JOURS', d], ['HEURES', h], ['MIN', m], ['SEC', s]].map(([label, val]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Archivo Narrow', sans-serif", fontSize: 40, fontWeight: 800,
                  letterSpacing: '-0.03em', color: T.paper,
                  fontVariantNumeric: 'tabular-nums',
                }}>{String(val).padStart(2, '0')}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, letterSpacing: '0.14em' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid ${T.line}` }}>
            <div style={{ padding: 14, borderRight: `1px solid ${T.line}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, letterSpacing: '0.14em' }}>INSCRITS</div>
              <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 26, fontWeight: 700, marginTop: 4 }}>2 147</div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, letterSpacing: '0.14em' }}>DROP PRÉCÉDENT</div>
              <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 26, fontWeight: 700, marginTop: 4, color: T.accent }}>SOLD OUT</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
