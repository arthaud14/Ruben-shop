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
      <style>{`
        .footer-top { padding: 16px 24px; border-bottom: 1px solid ${T.line}; display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; color: ${T.muted}; }
        .footer-cols { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid ${T.line}; }
        .footer-col { padding: 28px 20px; border-right: 1px solid ${T.line}; }
        .footer-col:last-child { border-right: none; }
        @media (max-width: 640px) {
          .footer-top { flex-direction: column; gap: 4px; }
          .footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-col:nth-child(2n) { border-right: none !important; }
          .footer-col:nth-child(1), .footer-col:nth-child(2) { border-bottom: 1px solid ${T.line}; }
        }
      `}</style>
      <div className="footer-top">
        <span>RUBEN<span style={{ color: T.accent }}>/</span>SHOP — UNE MARQUE INDÉPENDANTE</span>
        <span>@RUBENSHOP · LYON — FR</span>
      </div>

      <div className="footer-cols">
        {cols.map((col) => (
          <div key={col.title} className="footer-col">
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
