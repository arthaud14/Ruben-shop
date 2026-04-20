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
      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1.4fr 1fr; border-bottom: 1px solid ${T.line}; }
        .hero-left { padding: 56px 40px 40px; border-right: 1px solid ${T.line}; }
        .hero-h1 { font-family: 'Archivo Narrow', 'Archivo', sans-serif; font-weight: 800; font-size: clamp(64px, 12vw, 200px); line-height: 0.85; letter-spacing: -0.04em; margin: 0; text-transform: uppercase; }
        .hero-right { padding: 32px 36px; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
        .hero-cta { display: flex; gap: 16px; margin-top: 40px; align-items: center; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: ${T.muted}; flex-wrap: wrap; }
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-left { padding: 32px 20px 28px !important; border-right: none !important; border-bottom: 1px solid ${T.line}; }
          .hero-h1 { font-size: clamp(52px, 15vw, 100px) !important; }
          .hero-right { padding: 24px 20px !important; }
          .hero-cta { margin-top: 24px !important; }
          .hero-cta span { display: none; }
        }
      `}</style>

      <div className="hero-grid">
        <div className="hero-left">
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted,
            letterSpacing: '0.14em', marginBottom: 24,
          }}>
            [ 001 / INDEX ] — MAJ {new Date().toISOString().slice(0, 10)} · {new Date().toLocaleTimeString('fr-FR').slice(0, 5)}
          </div>
          <h1 className="hero-h1">
            DES<br />
            PIÈCES<br />
            <span style={{ color: T.accent }}>QUI FONT</span><br />
            DU BRUIT.
          </h1>
          <div className="hero-cta">
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

        <div className="hero-right">
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 12 }}>
              → PROCHAIN DROP
            </div>
            <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>
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
                  fontFamily: "'Archivo Narrow', sans-serif", fontSize: 36, fontWeight: 800,
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
