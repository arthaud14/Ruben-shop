import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function StarRating({ rating = 4, max = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-white" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const ACCENT = "#FF4A1C";
const T = {
  bg: '#0E0E0E',
  paper: '#F2EFE6',
  line: '#1C1C1C',
  muted: '#8A8578',
  ink: '#0A0A0A',
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      setProduct(data);
      if (data?.size) {
        const first = Array.isArray(data.size) ? data.size[0] : data.size;
        setSelectedSize(first);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0E0E0E", color: "#F2EFE6" }}
      >
        <p className="bebas text-2xl tracking-widest opacity-30 animate-pulse">
          Chargement...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0E0E0E", color: "#F2EFE6" }}
      >
        <p className="text-sm">Produit introuvable.</p>
      </div>
    );
  }

  const sizes = Array.isArray(product.size)
    ? product.size
    : product.size
      ? [product.size]
      : [];

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{ background: T.bg }}
    >
      <div className="w-full max-w-7xl" style={{ borderLeft: `1px solid ${T.line}`, borderRight: `1px solid ${T.line}` }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', borderBottom: `1px solid ${T.line}`,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', color: T.paper, fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', letterSpacing: '0.1em' }}
          >
            ← RETOUR
          </button>
          <a href="/" style={{
            color: T.paper, textDecoration: 'none',
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 18, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            RUBEN<span style={{ color: ACCENT }}>/</span>SHOP
          </a>
          <div style={{ width: 80 }} />
        </nav>

        <div className="grid grid-cols-2">
          {/* Image */}
          <div
            className="flex items-center justify-center max-h-[70vh]"
            style={{ background: product.couleur_fond ?? "#E8E5D8", borderRight: `1px solid ${T.line}` }}
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.nom}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="opacity-20 text-xs tracking-widest uppercase">
                Pas d'image
              </span>
            )}
          </div>

          {/* Infos */}
          <div
            className="flex flex-col"
            style={{ background: T.bg, color: T.paper, paddingTop: "3.5rem", paddingBottom: "3rem", paddingLeft: "3.5rem", paddingRight: "3.5rem" }}
          >
            {/* Catégorie + nom */}
            <div style={{ marginBottom: "1.5rem" }}>
              {product.saison && (
                <p
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: "0.75rem" }}
                >
                  RUBEN SHOP · {product.saison}
                </p>
              )}
              <h1
                style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: "0.25rem" }}
              >
                {product.nom}
              </h1>
            </div>

            {/* Prix */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '18px 0', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 44, fontWeight: 800, color: ACCENT }}>
                {Number(product.prix).toFixed(2).replace(".", ",")} €
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted }}>
                TVA INCL. · {product.stock} RESTANTS
              </div>
            </div>

            {/* Onglets */}
            <div style={{ display: 'flex', gap: 20, borderBottom: `1px solid ${T.line}`, marginBottom: 12 }}>
              {["description", "détails"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none', border: 'none', padding: '10px 0',
                    color: activeTab === tab ? ACCENT : T.muted,
                    fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.12em',
                    cursor: 'pointer', borderBottom: activeTab === tab ? `2px solid ${ACCENT}` : '2px solid transparent',
                    marginBottom: -1, textTransform: 'uppercase',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ minHeight: 80, paddingTop: '1rem', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              {activeTab === "description" && product.description && (
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: T.muted, lineHeight: 1.55 }}>
                  {product.description}
                </p>
              )}
              {activeTab === "détails" && (
                <div style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: T.muted, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 12 }}>Stock</span>
                    {product.stock} unités
                  </p>
                  {product.saison && (
                    <p>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 12 }}>Saison</span>
                      {product.saison}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Taille */}
            {sizes.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, letterSpacing: '0.14em', marginBottom: 8 }}>
                  <span>TAILLE</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                  {["xs", "s", "m", "l", "xl", "xxl"].map((t) => {
                    const available = sizes.includes(t);
                    const selected = selectedSize === t;
                    return (
                      <button
                        key={t}
                        disabled={!available}
                        onClick={() => available && setSelectedSize(t)}
                        style={{
                          padding: '14px 0', background: selected ? ACCENT : 'transparent',
                          color: selected ? T.ink : available ? T.paper : T.muted,
                          border: `1px solid ${selected ? ACCENT : T.line}`,
                          fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.1em',
                          cursor: available ? 'pointer' : 'not-allowed',
                          textDecoration: !available ? 'line-through' : 'none',
                        }}
                      >
                        {t.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.stock > 0 && product.stock <= 5 && (
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textAlign: 'center', marginBottom: 16, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}>
                Plus que {product.stock} en stock
              </p>
            )}

            {/* Bouton */}
            <button
              disabled={product.stock === 0 || (sizes.length > 0 && !selectedSize)}
              onClick={async () => {
                addItem(product, selectedSize)
                await supabase
                  .from('products')
                  .update({ stock: product.stock - 1 })
                  .eq('id', product.id)
                setProduct(p => ({ ...p, stock: p.stock - 1 }))
                navigate('/panier')
              }}
              style={{
                width: '100%', padding: '22px 0',
                background: (product.stock === 0 || (sizes.length > 0 && !selectedSize)) ? T.line : T.paper,
                color: T.ink, border: 'none',
                fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800, fontSize: 20,
                letterSpacing: '0.04em', cursor: (product.stock === 0 || (sizes.length > 0 && !selectedSize)) ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase', opacity: (product.stock === 0 || (sizes.length > 0 && !selectedSize)) ? 0.35 : 1,
                transition: 'background 200ms',
              }}
            >
              {product.stock === 0 ? "ÉPUISÉ" : (sizes.length > 0 && !selectedSize) ? "CHOISIR UNE TAILLE" : `▸ AJOUTER AU PANIER — ${Number(product.prix).toFixed(2).replace('.', ',')} €`}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
