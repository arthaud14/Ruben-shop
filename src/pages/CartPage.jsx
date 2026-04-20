import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

const T = {
  bg: '#0E0E0E',
  paper: '#F2EFE6',
  line: '#1C1C1C',
  accent: '#FF4A1C',
  muted: '#8A8578',
  ink: '#0A0A0A',
}

export default function CartPage() {
  const navigate = useNavigate()
  const { items, removeItem, total } = useCart()

  return (
    <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '80rem', borderLeft: `1px solid ${T.line}`, borderRight: `1px solid ${T.line}` }}>

        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', borderBottom: `1px solid ${T.line}`,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: T.paper, fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', letterSpacing: '0.1em' }}>
            ← RETOUR
          </button>
          <a href="/" style={{
            color: T.paper, textDecoration: 'none',
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 18, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            RUBEN<span style={{ color: T.accent }}>/</span>SHOP
          </a>
          <div style={{ width: 80 }} />
        </nav>

        <style>{`
          .cart-item { display: flex; align-items: center; gap: 24px; padding: 24px 36px; border-bottom: 1px solid ${T.line}; }
          .cart-footer { padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; }
          .cart-header { padding: 32px 36px; border-bottom: 1px solid ${T.line}; }
          @media (max-width: 640px) {
            .cart-item { gap: 14px; padding: 16px !important; }
            .cart-footer { flex-direction: column; gap: 16px; align-items: flex-start; padding: 24px 16px !important; }
            .cart-header { padding: 24px 16px !important; }
            .cart-header h1 { font-size: 40px !important; }
          }
        `}</style>

        <div className="cart-header">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 8 }}>[ PANIER ]</div>
          <h1 style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 56, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', color: T.paper }}>
            Mon Panier
          </h1>
        </div>

        {items.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
            <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 800, opacity: 0.3, textTransform: 'uppercase', color: T.paper }}>PANIER VIDE</p>
          </div>
        ) : (
          <>
            <div style={{ borderBottom: `1px solid ${T.line}` }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div style={{ width: 96, height: 96, flexShrink: 0, background: item.couleur_fond ?? '#E8E5D8', border: `1px solid ${T.line}` }}>
                    {item.image_url && (
                      <img src={item.image_url} alt={item.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: '-0.01em', color: T.paper }}>
                      {item.nom}
                    </div>
                    {item.size && (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, marginTop: 4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                        TAILLE : {item.size.toUpperCase()}
                      </div>
                    )}
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, marginTop: 2, letterSpacing: '0.08em' }}>
                      QTÉ : {item.quantity}
                    </div>
                  </div>

                  <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 700, color: T.paper }}>
                    {(Number(item.prix) * item.quantity).toFixed(2).replace('.', ',')} €
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    style={{
                      background: 'none', border: `1px solid ${T.line}`, color: T.muted,
                      padding: '8px 14px', fontFamily: "'Archivo', sans-serif", fontWeight: 700,
                      fontSize: 11, letterSpacing: '0.12em', cursor: 'pointer', textTransform: 'uppercase',
                    }}
                  >
                    RETIRER
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 4 }}>TOTAL</div>
                <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 40, fontWeight: 800, color: T.paper }}>
                  {total.toFixed(2).replace('.', ',')} €
                </div>
              </div>
              <button style={{
                background: T.paper, color: T.ink, border: 'none',
                padding: '20px 48px', fontFamily: "'Archivo Narrow', sans-serif",
                fontWeight: 800, fontSize: 18, letterSpacing: '0.04em',
                cursor: 'pointer', textTransform: 'uppercase',
              }}>
                ▸ COMMANDER
              </button>
            </div>
          </>
        )}

        <Footer />
      </div>
    </div>
  )
}
