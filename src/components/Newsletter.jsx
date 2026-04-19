import { useState } from 'react'

const T = {
  bg: '#0E0E0E',
  paper: '#F2EFE6',
  line: '#1C1C1C',
  accent: '#FF4A1C',
  muted: '#8A8578',
  ink: '#0A0A0A',
}

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section style={{
      background: T.bg, color: T.paper,
      display: 'grid', gridTemplateColumns: '1.2fr 1fr',
      borderBottom: `1px solid ${T.line}`,
    }}>
      <div style={{ padding: '48px 36px', borderRight: `1px solid ${T.line}` }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 16 }}>
          [ 004 / RESTE DANS LA BOUCLE ]
        </div>
        <h3 style={{
          fontFamily: "'Archivo Narrow', sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, margin: 0,
          letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.95,
        }}>
          Accès anticipé<br />
          <span style={{ color: T.accent }}>à chaque drop.</span>
        </h3>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: T.muted, marginTop: 18, maxWidth: 480 }}>
          Drops, événements, mixtapes. Pas de spam — que du vrai.
        </p>
      </div>

      <div style={{ padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        {submitted ? (
          <div>
            <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 36, fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
              Tu es dans la liste.
            </div>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: T.muted }}>
              On te prévient dès le prochain drop.
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em' }}>
              ADRESSE E-MAIL
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr auto', border: `1px solid ${T.paper}` }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.com"
                style={{
                  background: 'transparent', border: 'none', padding: '16px 18px',
                  color: T.paper, fontFamily: "'Archivo', sans-serif", fontSize: 16, outline: 'none',
                }}
              />
              <button type="submit" style={{
                background: T.accent, color: T.ink, border: 'none',
                padding: '0 28px', fontFamily: "'Archivo', sans-serif", fontWeight: 800,
                fontSize: 13, letterSpacing: '0.14em', cursor: 'pointer', textTransform: 'uppercase',
              }}>
                ▸ S'abonner
              </button>
            </form>
          </>
        )}

        <div style={{ display: 'flex', gap: 18, marginTop: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted }}>
          <a href="#" style={{ color: T.muted, textDecoration: 'none' }}>SUIVRE SUR SUBSTACK ↗</a>
          <a href="#" style={{ color: T.muted, textDecoration: 'none' }}>VOIR L'INSTAGRAM ↗</a>
        </div>
      </div>
    </section>
  )
}
