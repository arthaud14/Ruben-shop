const T = {
  ink: '#0A0A0A',
  paper: '#F2EFE6',
  line: '#1C1C1C',
  accent: '#FF4A1C',
  muted: '#8A8578',
}

const cols = [
  { title: 'BOUTIQUE', links: ['T-Shirts', 'Tote Bags', 'Mixtapes', 'Zines', 'Disques'] },
  { title: 'INFOS', links: ['À propos', 'Manifeste', 'Archive', 'Itinéraire'] },
  { title: 'RÉSEAUX', links: ['Instagram', 'Substack', 'Spotify', 'Contact'] },
  { title: 'LÉGAL', links: ['Livraison', 'Retours', 'Confidentialité', 'CGV'] },
]

export default function Footer() {
  return (
    <footer style={{ background: T.ink, color: T.paper, borderTop: `1px solid ${T.line}` }}>
      <div style={{
        padding: '16px 24px', borderBottom: `1px solid ${T.line}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: T.muted,
      }}>
        <span>RUBEN<span style={{ color: T.accent }}>/</span>SHOP — UNE MARQUE INDÉPENDANTE</span>
        <span>@RUBENSHOP · LYON — FR</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid ${T.line}` }}>
        {cols.map((col, i) => (
          <div key={col.title} style={{ padding: '28px 24px', borderRight: i < 3 ? `1px solid ${T.line}` : 'none' }}>
            <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.14em', color: T.accent, marginBottom: 14 }}>
              {col.title}
            </div>
            {col.links.map(link => (
              <div key={link} style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, padding: '4px 0', color: T.paper, opacity: 0.8 }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{link}</a>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        padding: '24px 24px',
        fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800,
        fontSize: 'clamp(48px, 10vw, 140px)', lineHeight: 0.85, letterSpacing: '-0.04em',
        textTransform: 'uppercase', color: T.paper,
      }}>
        RUBEN<span style={{ color: T.accent }}>/</span>SHOP
        <span style={{ color: T.muted, fontSize: '0.22em', display: 'inline-block', verticalAlign: 'top', marginLeft: 16, fontWeight: 400 }}>© 2026</span>
      </div>
    </footer>
  )
}
