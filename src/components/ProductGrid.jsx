import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

const T = {
  bg: '#0E0E0E',
  paper: '#F2EFE6',
  paperLine: 'rgba(10,10,10,0.12)',
  line: '#1C1C1C',
  accent: '#FF4A1C',
  muted: '#8A8578',
  ink: '#0A0A0A',
}

const categories = [
  { n: '01', label: 'Vêtements', meta: 'Pièces du drop', href: '/boutique' },
  { n: '02', label: 'Zines', meta: '4 tirages', href: '#' },
  { n: '03', label: 'Disques', meta: '6 galettes', href: '#' },
  { n: '04', label: 'Accessoires', meta: '10 pièces', href: '#' },
]

function ProductCard({ product }) {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/produit/${product.id}`)}
      style={{ cursor: 'pointer', background: T.paper, border: `1px solid ${T.paperLine}`, position: 'relative' }}
    >
      <div style={{
        position: 'relative', aspectRatio: '1 / 1.15', overflow: 'hidden',
        background: product.couleur_fond ?? '#E8E5D8',
      }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.nom}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 400ms cubic-bezier(.2,.7,.2,1)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.ink }}>
            Pas d'image
          </div>
        )}
        {product.stock === 0 && (
          <div style={{
            position: 'absolute', top: 12, left: 12, background: T.ink,
            color: T.paper, fontFamily: "'Archivo', sans-serif", fontSize: 10,
            fontWeight: 800, letterSpacing: '0.12em', padding: '4px 8px', textTransform: 'uppercase',
          }}>
            ÉPUISÉ
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 'auto 0 0 0', padding: '10px 14px',
          background: hover ? T.ink : 'transparent',
          color: hover ? T.paper : 'transparent',
          fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.14em',
          textTransform: 'uppercase', transition: 'all 200ms ease',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>+ PANIER</span><span>→</span>
        </div>
      </div>

      <div style={{
        padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 10,
        borderTop: `1px solid ${T.paperLine}`, alignItems: 'baseline',
      }}>
        <div>
          <div style={{
            fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800, fontSize: 18,
            letterSpacing: '-0.01em', textTransform: 'uppercase', color: T.ink,
          }}>
            {product.nom}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, marginTop: 2, letterSpacing: '0.08em' }}>
            {product.saison ? product.saison.toUpperCase() : 'RUBEN SHOP'}
          </div>
        </div>
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 20, fontWeight: 800, color: T.ink }}>
          {Number(product.prix).toFixed(2).replace('.', ',')} €
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid() {
  const { products, loading, error } = useProducts()

  return (
    <section style={{ borderBottom: `1px solid ${T.line}` }}>
      {/* Category strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid ${T.line}` }}>
        {categories.map((cat, i) => (
          <a key={cat.n} href={cat.href} style={{
            display: 'block', textDecoration: 'none',
            padding: '28px 24px', color: T.paper,
            borderRight: i < 3 ? `1px solid ${T.line}` : 'none',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em' }}>{cat.n}</div>
            <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 32, fontWeight: 800, margin: '6px 0 4px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              {cat.label}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted }}>{cat.meta}</div>
          </a>
        ))}
      </div>

      {/* Drop section header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        padding: '24px 24px 16px', borderBottom: `1px solid ${T.line}`,
      }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em' }}>[ 002 / LE DROP ]</div>
          <h2 style={{
            fontFamily: "'Archivo Narrow', sans-serif", fontSize: 48, fontWeight: 800, margin: '6px 0 0',
            letterSpacing: '-0.02em', textTransform: 'uppercase', color: T.paper,
          }}>Pièces du moment</h2>
        </div>
        <a href="/boutique" style={{
          background: 'none', border: `1px solid ${T.paper}`, color: T.paper,
          padding: '10px 16px', fontFamily: "'Archivo', sans-serif", fontWeight: 700,
          fontSize: 12, letterSpacing: '0.12em', textDecoration: 'none', textTransform: 'uppercase',
        }}>
          Tout voir →
        </a>
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${T.line}` }}>
        {loading && (
          <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '4/1' }}>
            <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: '0.04em', opacity: 0.3 }}>CHARGEMENT...</p>
          </div>
        )}
        {error && (
          <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '4/1' }}>
            <p style={{ fontSize: 14, color: '#ff6b6b' }}>Erreur : {error}</p>
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '4/1' }}>
            <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 24, fontWeight: 800, opacity: 0.3, textTransform: 'uppercase' }}>Aucun article disponible</p>
          </div>
        )}
        {!loading && !error && products.map((p, i) => (
          <div key={p.id} style={{
            borderRight: (i % 4 < 3) ? `1px solid ${T.line}` : 'none',
            borderBottom: i < 4 ? `1px solid ${T.line}` : 'none',
          }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
