import { useCart } from '../context/CartContext'

const T = {
  bg: '#0E0E0E',
  paper: '#F2EFE6',
  line: '#1C1C1C',
  accent: '#FF4A1C',
  muted: '#8A8578',
}

const tickerItems = [
  'SS 26', 'TIRAGES NUMÉROTÉS', 'LYON / PARIS / BERLIN',
  'RESTOCK — JAMAIS', 'LIVRAISON OFFERTE DÈS 80€',
]

function Ticker() {
  const row = [...tickerItems, ...tickerItems, ...tickerItems]
  return (
    <div style={{
      background: T.bg, color: T.paper, overflow: 'hidden',
      borderTop: `1px solid ${T.line}`,
      fontFamily: "'Archivo', sans-serif", fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: '0.04em', fontSize: 12, whiteSpace: 'nowrap',
    }}>
      <div style={{
        display: 'inline-flex', gap: 32, padding: '9px 0',
        animation: 'static-marquee 32s linear infinite',
      }}>
        {row.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 32 }}>
            {t} <span style={{ color: T.accent }}>✸</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const { count } = useCart()
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: T.bg, color: T.paper,
      borderBottom: `1px solid ${T.line}`,
    }}>
      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .nav-meta { display: none !important; }
          .nav-logo { font-size: 15px !important; }
          .nav-inner { padding: 12px 16px !important; grid-template-columns: 1fr auto !important; }
          .nav-cart { font-size: 12px !important; }
        }
      `}</style>
      <div className="nav-inner" style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '14px 24px',
      }}>
        <nav className="nav-links" style={{ display: 'flex', gap: 22, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', fontFamily: "'Archivo', sans-serif" }}>
          <a href="/" style={{ color: T.paper, textDecoration: 'none', textTransform: 'uppercase' }}>Index</a>
          <a href="/boutique" style={{ color: T.paper, textDecoration: 'none', textTransform: 'uppercase' }}>Boutique</a>
          <a href="#" style={{ color: T.paper, textDecoration: 'none', textTransform: 'uppercase' }}>Manifeste</a>
          <a href="#" style={{ color: T.paper, textDecoration: 'none', textTransform: 'uppercase' }}>Archive</a>
        </nav>
        <a href="/" className="nav-logo" style={{
          color: T.paper, textDecoration: 'none',
          fontFamily: "'Archivo Narrow', sans-serif",
          fontSize: 18, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          RUBEN<span style={{ color: T.accent }}>/</span>SHOP
        </a>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', fontFamily: "'Archivo', sans-serif" }}>
          <span className="nav-meta" style={{ color: T.muted }}>LYON · FR</span>
          <a className="nav-cart" href="/panier" style={{ color: T.paper, textDecoration: 'none', textTransform: 'uppercase' }}>
            PANIER
            <span style={{
              display: 'inline-block', marginLeft: 6, background: T.accent,
              color: '#0A0A0A', padding: '1px 7px', borderRadius: 2, fontWeight: 800,
            }}>
              {count}
            </span>
          </a>
        </div>
      </div>
      <Ticker />
    </header>
  )
}
