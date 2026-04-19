import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const T = {
  bg: '#0E0E0E',
  paper: '#F2EFE6',
  paperLine: 'rgba(10,10,10,0.12)',
  line: '#1C1C1C',
  accent: '#FF4A1C',
  muted: '#8A8578',
  ink: '#0A0A0A',
}

const cats = ['TOUT', 'VÊTEMENTS', 'ZINES', 'DISQUES', 'ACCESSOIRES']

function ProductCard({ product }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/produit/${product.id}`)}
      style={{
        display: 'flex', alignItems: 'center', gap: 24, padding: '20px 24px',
        cursor: 'pointer', borderBottom: `1px solid ${T.line}`,
        transition: 'background 150ms',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#151515'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{
        width: 80, height: 80, flexShrink: 0, overflow: 'hidden',
        background: product.couleur_fond ?? '#E8E5D8',
      }}>
        {product.image_url && (
          <img src={product.image_url} alt={product.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800, fontSize: 18, textTransform: 'uppercase', letterSpacing: '-0.01em', color: T.paper }}>
          {product.nom}
        </div>
        {product.saison && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, marginTop: 2, letterSpacing: '0.08em' }}>
            {product.saison.toUpperCase()}
          </div>
        )}
        {product.stock === 0 && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
            ÉPUISÉ
          </div>
        )}
      </div>

      <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 20, fontWeight: 700, color: T.paper, whiteSpace: 'nowrap' }}>
        {Number(product.prix).toFixed(2).replace('.', ',')} €
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.1em' }}>
        VOIR →
      </div>
    </div>
  )
}

export default function ShopPage() {
  const { products, loading, error } = useProducts()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('TOUT')

  return (
    <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '80rem', borderLeft: `1px solid ${T.line}`, borderRight: `1px solid ${T.line}` }}>
        <Navbar />

        {/* Shop header */}
        <section style={{
          padding: '48px 36px 24px', borderBottom: `1px solid ${T.line}`,
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 24,
        }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em' }}>
              [ BOUTIQUE / {products.length} ARTICLES ]
            </div>
            <h1 style={{
              fontFamily: "'Archivo Narrow', sans-serif", fontSize: 'clamp(64px, 10vw, 140px)', fontWeight: 800, margin: '10px 0 0',
              letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 0.85, color: T.paper,
            }}>
              BOU<span style={{ color: T.accent }}>·</span>TIQUE
            </h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none', border: `1px solid ${T.line}`, color: T.muted,
              padding: '10px 16px', fontFamily: "'Archivo', sans-serif", fontWeight: 700,
              fontSize: 12, letterSpacing: '0.12em', cursor: 'pointer', textTransform: 'uppercase',
            }}
          >
            ← RETOUR
          </button>
        </section>

        {/* Filters */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${T.line}` }}>
          {cats.map((c, i) => (
            <button key={c} onClick={() => setFilter(c)} style={{
              flex: 1, background: filter === c ? T.accent : 'transparent',
              color: filter === c ? T.ink : T.paper,
              border: 'none', borderRight: i < cats.length - 1 ? `1px solid ${T.line}` : 'none',
              padding: '16px 12px', fontFamily: "'Archivo', sans-serif", fontWeight: 700,
              fontSize: 12, letterSpacing: '0.12em', cursor: 'pointer', textTransform: 'uppercase',
            }}>
              {c}
            </button>
          ))}
        </div>

        {/* Product list */}
        <div>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
              <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 800, opacity: 0.3, textTransform: 'uppercase', color: T.paper }}>CHARGEMENT...</p>
            </div>
          )}
          {error && <p style={{ padding: '2rem', fontSize: 14, color: '#ff6b6b' }}>{error}</p>}
          {!loading && !error && products.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
              <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 800, opacity: 0.3, textTransform: 'uppercase', color: T.paper }}>AUCUN ARTICLE</p>
            </div>
          )}
          {!loading && !error && products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  )
}
