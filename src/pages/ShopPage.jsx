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
        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
        cursor: 'pointer', borderBottom: `1px solid ${T.line}`,
        transition: 'background 150ms',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#151515'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{
        width: 72, height: 72, flexShrink: 0, overflow: 'hidden',
        background: product.couleur_fond ?? '#E8E5D8',
      }}>
        {product.image_url && (
          <img src={product.image_url} alt={product.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800,
          fontSize: 16, textTransform: 'uppercase', letterSpacing: '-0.01em',
          color: T.paper, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {product.nom}
        </div>
        {product.saison && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, marginTop: 2, letterSpacing: '0.08em' }}>
            {product.saison.toUpperCase()}
          </div>
        )}
        {product.stock === 0 && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
            ÉPUISÉ
          </div>
        )}
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 18, fontWeight: 700, color: T.paper, marginTop: 4 }}>
          {Number(product.prix).toFixed(2).replace('.', ',')} €
        </div>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.1em', flexShrink: 0 }}>
        VOIR →
      </div>
    </div>
  )
}

export default function ShopPage() {
  const { products, loading, error } = useProducts()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('TOUT')

  const filtered = filter === 'TOUT' ? products : products.filter(p =>
    p.categorie?.toUpperCase() === filter
  )

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>
      <style>{`
        .shop-header { padding: 36px 24px 20px; border-bottom: 1px solid ${T.line}; display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 16; }
        .shop-h1 { font-family: 'Archivo Narrow', sans-serif; font-size: clamp(56px, 10vw, 140px); font-weight: 800; margin: 10px 0 0; letter-spacing: -0.04em; text-transform: uppercase; line-height: 0.85; color: ${T.paper}; }
        .filters-bar { display: flex; border-bottom: 1px solid ${T.line}; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .filters-bar::-webkit-scrollbar { display: none; }
        .filter-btn { flex-shrink: 0; padding: 14px 16px; font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.12em; cursor: pointer; text-transform: uppercase; border: none; transition: background 150ms; }
        @media (max-width: 640px) {
          .shop-header { padding: 24px 16px 16px !important; }
          .shop-h1 { font-size: clamp(48px, 14vw, 80px) !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '80rem', margin: '0 auto', borderLeft: `1px solid ${T.line}`, borderRight: `1px solid ${T.line}` }}>
        <Navbar />

        <section className="shop-header">
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em' }}>
              [ BOUTIQUE / {products.length} ARTICLES ]
            </div>
            <h1 className="shop-h1">
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

        <div className="filters-bar">
          {cats.map((c, i) => (
            <button key={c} onClick={() => setFilter(c)} className="filter-btn" style={{
              background: filter === c ? T.accent : 'transparent',
              color: filter === c ? T.ink : T.paper,
              borderRight: i < cats.length - 1 ? `1px solid ${T.line}` : 'none',
            }}>
              {c}
            </button>
          ))}
        </div>

        <div>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
              <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 800, opacity: 0.3, textTransform: 'uppercase', color: T.paper }}>CHARGEMENT...</p>
            </div>
          )}
          {error && <p style={{ padding: '2rem', fontSize: 14, color: '#ff6b6b' }}>{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 0' }}>
              <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 800, opacity: 0.3, textTransform: 'uppercase', color: T.paper }}>AUCUN ARTICLE</p>
            </div>
          )}
          {!loading && !error && filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  )
}
