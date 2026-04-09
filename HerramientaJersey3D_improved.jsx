import { useState, useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Download, RotateCcw, Eye, EyeOff, Upload, X, FolderOpen, Search, Loader2 } from 'lucide-react'
import { listAllProjectProfiles, getCurrentProfileOwner } from '../projectProfiles'

// ── Design templates ──────────────────────────────────────────────────────────
const TEMPLATES = [
  { id: 'solid',       label: 'Sólido',       icon: '▬' },
  { id: 'grad_v',      label: 'Deg. vertical', icon: '▒' },
  { id: 'grad_h',      label: 'Deg. simétrico',icon: '◧' },
  { id: 'fade_center', label: 'Fade centro',   icon: '◉' },
  { id: 'panels',      label: 'Paneles',       icon: '▐▌' },
  { id: 'stripes_v',   label: 'Rayas vert.',   icon: '|||' },
  { id: 'stripes_h',   label: 'Rayas horiz.',  icon: '≡' },
]

const mk = (id, label, template, p1, p2, sc, name, num, nCol, nOut, font, sponsor, sCol) => ({
  id, label, template, primary: p1, secondary: p2, stripeCount: sc,
  backName: name,    backNameColor: nCol,  backNameOutline: nOut, backNameFont: font,
  backNum:  num,     backNumColor:  nCol,  backNumOutline:  nOut, backNumFont:  font,
  frontNum: num,     frontNumColor: nCol,  frontNumOutline: nOut, frontNumFont: font,
  sponsorText: sponsor, sponsorSub: '', sponsorColor: sCol, sponsorSubColor: sCol,
})

const PRESETS = [
  // ── SÓLIDOS ───────────────────────────────────────────────────────────────
  mk('madrid',     'Real Madrid',     'solid',      '#fafafa', '#c8a84b', 5,  'BELLINGHAM', '5',  '#c8a84b', '#1a1a1a', 'Impact', 'Fly Emirates',       '#c8a84b'),
  mk('liverpool',  'Liverpool',       'solid',      '#c8102e', '#f7f7f7', 5,  'SALAH',      '11', '#f7f7f7', '#c8102e', 'Impact', 'Standard Chartered', '#f7f7f7'),
  mk('brasil',     'Brasil',          'solid',      '#009b3a', '#fedf00', 5,  'VINICIUS',   '7',  '#fedf00', '#002776', 'Impact', 'CBF',                '#fedf00'),
  mk('chelsea',    'Chelsea',         'solid',      '#034694', '#d1ae00', 5,  'PALMER',     '20', '#ffffff', '#034694', 'Impact', 'Infinite Athlete',   '#ffffff'),
  mk('dortmund',   'Dortmund',        'solid',      '#fde100', '#111111', 5,  'SANCHO',     '10', '#111111', '#fde100', 'Impact', 'Evonik',             '#111111'),
  mk('city',       'Man. City',       'solid',      '#6cabdd', '#1c2c5b', 5,  'HAALAND',    '9',  '#ffffff', '#6cabdd', 'Impact', 'Puma',               '#ffffff'),
  mk('noche',      'Noche Dorada',    'solid',      '#0a0a0a', '#c8a84b', 5,  'RODRIGUEZ',  '10', '#c8a84b', '#0a0a0a', 'Impact', 'ELITE FC',           '#c8a84b'),
  mk('rojo',       'Rojo Pasión',     'solid',      '#c8102e', '#111111', 5,  'RODRIGUEZ',  '10', '#ffffff', '#c8102e', 'Impact', 'PASIÓN FC',          '#ffffff'),
  mk('atletico',   'Atlético',        'solid',      '#cc0000', '#ffffff', 5,  'GRIEZMANN',  '7',  '#cc0000', '#ffffff', 'Impact', 'Civitas',            '#cc0000'),
  mk('barca',      'Barcelona',       'solid',      '#a50044', '#004d98', 5,  'PEDRI',      '8',  '#ffffff', '#fcb514', 'Impact', 'Rakuten',            '#ffffff'),
  // ── DEGRADADOS VERTICALES ─────────────────────────────────────────────────
  mk('oceano',     'Océano',          'grad_v',     '#0096c7', '#03045e', 5,  'RODRIGUEZ',  '10', '#caf0f8', '#03045e', 'Impact', 'OCÉANO FC',          '#caf0f8'),
  mk('aurora',     'Aurora',          'grad_v',     '#7c3aed', '#0d0d0d', 5,  'RODRIGUEZ',  '10', '#e9d5ff', '#3b0764', 'Impact', 'AURORA FC',          '#c4b5fd'),
  mk('psg',        'PSG Style',       'grad_v',     '#001f5b', '#da0022', 5,  'MBAPPÉ',     '7',  '#ffffff', '#da0022', 'Impact', 'Qatar Airways',      '#ffffff'),
  mk('verde_noche','Verde Noche',     'grad_v',     '#064e3b', '#0a0a0a', 5,  'RODRIGUEZ',  '10', '#6ee7b7', '#064e3b', 'Impact', 'VERDE FC',           '#6ee7b7'),
  mk('cielo',      'Cielo',           'grad_v',     '#bfdbfe', '#1e40af', 5,  'RODRIGUEZ',  '10', '#1e3a8a', '#bfdbfe', 'Impact', 'SKY FC',             '#1e40af'),
  // ── DEGRADADOS SIMÉTRICOS (primary en bordes, secondary en centro) ──────────
  mk('juventus',   'Juve Style',      'grad_h',     '#f5f5f5', '#111111', 5,  'VLAHOVIĆ',   '9',  '#111111', '#f5f5f5', 'Impact', 'Jeep',               '#111111'),
  mk('oro_negro',  'Oro & Negro',     'grad_h',     '#c8a84b', '#0a0a0a', 5,  'RODRIGUEZ',  '10', '#ffffff', '#0a0a0a', 'Impact', 'GOLD FC',            '#c8a84b'),
  mk('sunset',     'Sunset',          'grad_h',     '#ea580c', '#7c3aed', 5,  'RODRIGUEZ',  '10', '#ffffff', '#1a0a00', 'Impact', 'SUNSET FC',          '#fed7aa'),
  mk('fuego_h',    'Bicolor',         'grad_h',     '#fbbf24', '#1e3a8a', 5,  'RODRIGUEZ',  '10', '#ffffff', '#1e3a8a', 'Impact', 'SPORT FC',           '#fbbf24'),
  // ── PANELES (lateral secondary, cuerpo primary) ───────────────────────────
  mk('panels_bw',  'Franjas Negras',  'panels',     '#f5f5f5', '#111111', 5,  'VLAHOVIĆ',   '9',  '#111111', '#f5f5f5', 'Impact', 'Jeep',               '#111111'),
  mk('panels_red', 'Franjas Rojas',   'panels',     '#f5f5f5', '#cc0000', 5,  'GRIEZMANN',  '7',  '#cc0000', '#f5f5f5', 'Impact', 'Civitas',            '#cc0000'),
  mk('panels_bl',  'Franjas Azules',  'panels',     '#f0f9ff', '#1e3a8a', 5,  'RODRIGUEZ',  '10', '#1e3a8a', '#f0f9ff', 'Impact', 'SPORT FC',           '#1e3a8a'),
  mk('panels_gold','Franjas Doradas', 'panels',     '#0a0a0a', '#c8a84b', 5,  'RODRIGUEZ',  '10', '#c8a84b', '#0a0a0a', 'Impact', 'ELITE FC',           '#c8a84b'),
  // ── RAYAS VERTICALES ──────────────────────────────────────────────────────
  mk('barca_v',    'Barça Style',     'stripes_v',  '#a50044', '#004d98', 6,  'PEDRI',      '8',  '#ffffff', '#fcb514', 'Impact', 'Rakuten',            '#ffffff'),
  mk('juve_v',     'Juve Style',      'stripes_v',  '#f5f5f5', '#111111', 5,  'VLAHOVIĆ',   '9',  '#111111', '#f5f5f5', 'Impact', 'Jeep',               '#111111'),
  mk('inter_v',    'Inter Style',     'stripes_v',  '#003da5', '#000000', 6,  'LAUTARO',    '10', '#ffffff', '#003da5', 'Impact', 'Socios',             '#ffffff'),
  mk('colombia_v', 'Colombia',        'stripes_v',  '#fcd116', '#003087', 4,  'JAMES',      '10', '#003087', '#fcd116', 'Impact', 'FCF',                '#003087'),
  // ── RAYAS HORIZONTALES ────────────────────────────────────────────────────
  mk('rugby_h',    'Rugby Classic',   'stripes_h',  '#cc0000', '#ffffff', 8,  'GARCIA',     '13', '#cc0000', '#ffffff', 'Impact', 'RUGBY FC',           '#cc0000'),
  mk('sky_h',      'Sky Hoops',       'stripes_h',  '#6cabdd', '#1c2c5b', 6,  'HAALAND',    '9',  '#ffffff', '#6cabdd', 'Impact', 'CITY FC',            '#ffffff'),
  mk('gold_h',     'Gold Hoops',      'stripes_h',  '#fde100', '#111111', 5,  'RODRIGUEZ',  '10', '#111111', '#fde100', 'Impact', 'ELITE FC',           '#111111'),
  // ── FADE CENTER ───────────────────────────────────────────────────────────
  mk('galaxy',     'Galaxy',          'fade_center','#6d28d9', '#0a0018', 5,  'RODRIGUEZ',  '10', '#e9d5ff', '#4c1d95', 'Impact', 'GALAXY FC',          '#c4b5fd'),
  mk('fuego',      'Fuego Center',    'fade_center','#ea580c', '#1a0500', 5,  'RODRIGUEZ',  '10', '#fff7ed', '#7c2d12', 'Impact', 'FUEGO FC',           '#fed7aa'),
  mk('hielo',      'Hielo',           'fade_center','#e0f2fe', '#0c4a6e', 5,  'RODRIGUEZ',  '10', '#0c4a6e', '#e0f2fe', 'Impact', 'ICE FC',             '#0c4a6e'),
  mk('esmeralda',  'Esmeralda',       'fade_center','#10b981', '#052e16', 5,  'RODRIGUEZ',  '10', '#d1fae5', '#052e16', 'Impact', 'EMERALD FC',         '#d1fae5'),
  mk('rosado',     'Rosa Neón',       'fade_center','#f472b6', '#4a044e', 5,  'RODRIGUEZ',  '10', '#fce7f3', '#831843', 'Impact', 'NEON FC',            '#f9a8d4'),
]

// ── Jersey zone SVG ────────────────────────────────────────────────────────────
const ZONES = {
  full:         { x: 10, y: 30, w: 80, h: 66 },
  'back-top':   { x: 22, y: 34, w: 56, h: 15 },
  'back-center':{ x: 20, y: 50, w: 60, h: 32 },
  'chest':      { x: 12, y: 35, w: 34, h: 22 },
  'bottom':     { x: 16, y: 76, w: 68, h: 16 },
  'logo':       { x: 52, y: 35, w: 26, h: 20 },
}
const JERSEY_PATH = 'M35,8 Q50,18 65,8 L90,2 L108,26 L90,32 L90,98 L10,98 L10,32 L-8,26 L10,2 Z'

function JerseyZoneSVG({ zone = 'full', size = 38 }) {
  const z = ZONES[zone] || ZONES.full
  return (
    <svg width={size} height={size * 1.05} viewBox="-10 0 120 108" fill="none" className="shrink-0">
      <path d={JERSEY_PATH} fill="#1c1c28" stroke="#ffffff18" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x={z.x} y={z.y} width={z.w} height={z.h} fill="#e63946" opacity="0.55" rx="3" />
    </svg>
  )
}

const FONTS = [
  { value: 'Impact',      label: 'Impact' },
  { value: 'Arial Black', label: 'Arial Black' },
  { value: 'Georgia',     label: 'Georgia' },
  { value: 'Courier New', label: 'Courier' },
]

// ── Draw jersey texture onto canvas ───────────────────────────────────────────
// Clave: dibujamos el patrón solo en la MITAD IZQUIERDA del canvas y luego
// la espejamos a la mitad derecha. Así las dos mitades del canvas son
// idénticas y, dado que la UV del modelo suele ser simétrica, ambos lados
// de la camiseta ven el mismo patrón sin rayas ni asimetrías.
function drawJerseyTexture(canvas, { template, primary, secondary, stripeCount = 6 }) {
  const W = canvas.width, H = canvas.height
  const HW = W / 2  // mitad del canvas
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, W, H)

  // Dibujamos solo en la mitad izquierda (0 → HW)
  switch (template) {
    case 'solid':
      ctx.fillStyle = primary; ctx.fillRect(0, 0, HW, H)
      break
    case 'grad_v': {
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, primary); g.addColorStop(1, secondary)
      ctx.fillStyle = g; ctx.fillRect(0, 0, HW, H)
      break
    }
    case 'grad_h': {
      // Degradado de primary (borde izq) → secondary (centro)
      // Al espejarlo: secondary en el centro, primary en ambos bordes
      const g = ctx.createLinearGradient(0, 0, HW, 0)
      g.addColorStop(0, primary); g.addColorStop(1, secondary)
      ctx.fillStyle = g; ctx.fillRect(0, 0, HW, H)
      break
    }
    case 'fade_center': {
      ctx.fillStyle = secondary; ctx.fillRect(0, 0, HW, H)
      const g = ctx.createRadialGradient(HW / 2, H * 0.4, 0, HW / 2, H * 0.4, HW * 0.7)
      g.addColorStop(0, primary); g.addColorStop(1, 'transparent')
      ctx.fillStyle = g; ctx.fillRect(0, 0, HW, H)
      break
    }
    case 'panels': {
      ctx.fillStyle = primary; ctx.fillRect(0, 0, HW, H)
      const pw = HW * 0.30   // panel = 30% de la mitad → 15% del total por lado
      ctx.fillStyle = secondary; ctx.fillRect(0, 0, pw, H)
      break
    }
    case 'stripes_v':
    case 'stripes_h': {
      // El canvas queda blanco puro — el shader world-space sobreescribe con
      // las rayas procedurales (sin costuras, independiente del UV del modelo).
      // El canvas solo se usa para los thumbnails de preset/template.
      const count = Math.max(2, Math.round(stripeCount))
      if (template === 'stripes_v') {
        const sw = HW / count
        for (let i = 0; i < count; i++) {
          ctx.fillStyle = i % 2 === 0 ? primary : secondary
          ctx.fillRect(Math.round(i * sw), 0, Math.ceil(sw), H)
        }
      } else {
        const sh = H / count
        for (let i = 0; i < count; i++) {
          ctx.fillStyle = i % 2 === 0 ? primary : secondary
          ctx.fillRect(0, Math.round(i * sh), HW, Math.ceil(sh))
        }
      }
      break
    }
    default:
      ctx.fillStyle = primary; ctx.fillRect(0, 0, HW, H)
  }

  // ── Espejo: copia la mitad izquierda → mitad derecha (invertida) ──────────
  const snap = document.createElement('canvas')
  snap.width = HW; snap.height = H
  snap.getContext('2d').drawImage(canvas, 0, 0, HW, H, 0, 0, HW, H)
  ctx.save()
  ctx.translate(W, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(snap, 0, 0, HW, H)
  ctx.restore()

  // Sutil ruido de tela
  const nc = document.createElement('canvas'); nc.width = W; nc.height = H
  const nCtx = nc.getContext('2d')
  const nd = nCtx.createImageData(W, H)
  for (let i = 0; i < nd.data.length; i += 4) {
    const v = (Math.random() - 0.5) * 18
    nd.data[i] = nd.data[i+1] = nd.data[i+2] = v > 0 ? 255 : 0
    nd.data[i+3] = Math.abs(v) * 1.2
  }
  nCtx.putImageData(nd, 0, 0)
  ctx.drawImage(nc, 0, 0)
}

// ── Canvas text for decals ─────────────────────────────────────────────────────
function makeTextCanvas({ text, font, color, outline, width, height }) {
  const c = document.createElement('canvas')
  c.width = width; c.height = height
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, width, height)
  if (!text?.trim()) return c

  let size = height * 0.78
  ctx.font = `900 ${size}px "${font}"`
  while (ctx.measureText(text).width > width * 0.88 && size > 10) {
    size -= 2
    ctx.font = `900 ${size}px "${font}"`
  }

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const cx = width / 2, cy = height / 2

  if (outline) {
    ctx.lineWidth = Math.max(2, size * 0.07)
    ctx.strokeStyle = outline
    ctx.lineJoin = 'round'
    ctx.strokeText(text, cx, cy)
  }
  ctx.fillStyle = color
  ctx.fillText(text, cx, cy)
  return c
}

// ── Sponsor / bottom text canvas ──────────────────────────────────────────────
function makeSponsorCanvas({ mainText, subText, font, color, subColor }) {
  const W = 1024, H = subText?.trim() ? 220 : 130
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, W, H)
  if (!mainText?.trim()) return c

  let sz = subText?.trim() ? 100 : 120
  ctx.font = `900 ${sz}px "${font}"`
  while (ctx.measureText(mainText).width > W * 0.9 && sz > 14) { sz -= 2; ctx.font = `900 ${sz}px "${font}"` }
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = color
  const mainY = subText?.trim() ? sz + 6 : H / 2 + sz * 0.35
  ctx.fillText(mainText, W / 2, mainY)

  if (subText?.trim()) {
    let subSz = 52
    ctx.font = `600 ${subSz}px "${font}"`
    while (ctx.measureText(subText).width > W * 0.88 && subSz > 10) { subSz -= 2; ctx.font = `600 ${subSz}px "${font}"` }
    ctx.fillStyle = subColor || color
    ctx.globalAlpha = 0.72
    ctx.fillText(subText, W / 2, mainY + subSz + 12)
    ctx.globalAlpha = 1
  }
  return c
}

// ── UI atoms ──────────────────────────────────────────────────────────────────
const labelCls = 'block text-[8px] font-black text-white/25 tracking-[0.26em] uppercase mb-1.5'
const inputCls = 'w-full px-3 py-2.5 rounded-xl bg-[#0a0a0d] border border-white/6 text-white text-[13px] focus:outline-none focus:border-[#e63946]/70 transition-all placeholder:text-white/15'

function ColorSwatch({ label, value, onChange }) {
  return (
    <div>
      {label && <span className={labelCls}>{label}</span>}
      <div className="relative h-9 rounded-xl overflow-hidden border border-white/8 cursor-pointer group">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10" />
        <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ backgroundColor: value }} />
        <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20" />
      </div>
    </div>
  )
}

function Slider({ label, value, min, max, step = 1, onChange, unit = '' }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className={labelCls}>{label}</span>
        <span className="text-[9px] font-mono text-[#e63946]/80">{typeof value === 'number' && step < 1 ? value.toFixed(1) : value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(step < 1 ? parseFloat(e.target.value) : +e.target.value)}
        onWheel={e => e.currentTarget.blur()}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#e63946' }} />
    </div>
  )
}

// ── Preset thumbnail ──────────────────────────────────────────────────────────
function PresetThumb({ preset }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    c.width = 56; c.height = 72
    drawJerseyTexture(c, { template: preset.template, primary: preset.primary, secondary: preset.secondary, stripeCount: preset.stripeCount })
  }, [preset.template, preset.primary, preset.secondary])
  return <canvas ref={ref} className="w-full h-full" style={{ imageRendering: 'auto' }} />
}

// ── Template thumbnail ─────────────────────────────────────────────────────────
function TemplateThumbnail({ tpl, active, primary, secondary, stripeCount = 6, onClick }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    c.width = 56; c.height = 72
    drawJerseyTexture(c, { template: tpl.id, primary, secondary, stripeCount })
  }, [tpl.id, primary, secondary, stripeCount])
  return (
    <button onClick={onClick}
      className={`relative flex flex-col items-center gap-1.5 p-1 rounded-xl border-2 transition-all ${active ? 'border-[#e63946] shadow-[0_0_0_2px_rgba(230,57,70,0.25)]' : 'border-white/8 hover:border-white/20'}`}>
      <canvas ref={ref} className="rounded-lg w-full aspect-[7/9] object-cover" style={{ imageRendering: 'auto' }} />
      <span className="text-[8px] font-bold text-white/40 leading-tight text-center">{tpl.label}</span>
      {active && <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#e63946] border border-white/50" />}
    </button>
  )
}

// ── Helper: extract preview URL from project snapshot ─────────────────────────
function getPreviewUrl(project) {
  const s = project?.snapshot ?? {}
  return s.halftoneDataUrl      || s.project?.halftoneDataUrl  ||
    s.processedDataUrl          || s.project?.imagenProcesada  ||
    s.previewDataUrl            || s.project?.previewDataUrl   ||
    s.imagenDataUrl             || s.originalDataUrl           || ''
}

// ── Project picker modal ───────────────────────────────────────────────────────
function ProjectPickerModal({ onSelect, onClose }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const owner = await getCurrentProfileOwner()
        if (!owner) { setLoading(false); return }
        const list = await listAllProjectProfiles(owner)
        if (!cancelled) setProjects(list.filter(p => !p.isDeleted))
      } catch (e) { console.error('Error loading projects:', e) }
      finally { if (!cancelled) setLoading(false) }
    })()
    return () => { cancelled = true }
  }, [])

  const filtered = projects.filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#0f0f14] border border-white/10 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden" style={{ maxHeight: '80vh' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
          <div>
            <p className="text-[13px] font-black uppercase tracking-[0.2em] text-white">Mis Proyectos</p>
            <p className="text-[9px] text-white/30 mt-0.5">Selecciona el diseño que quieres usar como escudo</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/8 text-white/30 hover:text-white transition-all"><X size={15} /></button>
        </div>
        <div className="px-4 py-3 border-b border-white/5 shrink-0">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar proyecto..." autoFocus
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#0a0a0d] border border-white/8 text-white text-[12px] placeholder:text-white/20 focus:outline-none focus:border-[#e63946]/60 transition-all" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3">
              <Loader2 size={22} className="animate-spin text-[#e63946]/60" />
              <p className="text-[11px] text-white/30">Cargando proyectos...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2">
              <FolderOpen size={28} className="text-white/15" />
              <p className="text-[11px] text-white/30">{search ? 'Sin resultados' : 'No hay proyectos guardados'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {filtered.map(p => {
                const url = getPreviewUrl(p)
                return (
                  <button key={p.id} onClick={() => onSelect(p)}
                    className="group flex flex-col gap-1.5 rounded-xl border border-white/8 hover:border-[#e63946]/50 bg-white/2 hover:bg-[#e63946]/5 p-2 transition-all text-left">
                    <div className="w-full aspect-square rounded-lg bg-[#0a0a0d] border border-white/5 overflow-hidden flex items-center justify-center">
                      {url ? <img src={url} alt={p.name} className="w-full h-full object-contain" /> : <FolderOpen size={20} className="text-white/15" />}
                    </div>
                    <p className="text-[9px] font-semibold text-white/50 group-hover:text-white/80 transition-colors leading-tight truncate">{p.name || 'Sin nombre'}</p>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function HerramientaJersey3D() {
  // Design
  const [template, setTemplate]       = useState('solid')
  const [primary, setPrimary]         = useState('#1a3a6b')
  const [secondary, setSecondary]     = useState('#e63946')
  const [stripeVisibility, setStripeVisibility] = useState(0) // 0=both, 1=front, 2=back
  const [stripeCount, setStripeCount] = useState(6)

  // Back name
  const [backName, setBackName]               = useState('RODRIGUEZ')
  const [backNameColor, setBackNameColor]     = useState('#ffffff')
  const [backNameOutline, setBackNameOutline] = useState('')
  const [backNameFont, setBackNameFont]       = useState('Impact')
  const [backNameY, setBackNameY]             = useState(16)
  const [backNameScale, setBackNameScale]     = useState(52)
  const [showBackName, setShowBackName]       = useState(true)

  // Back number
  const [backNum, setBackNum]               = useState('10')
  const [backNumColor, setBackNumColor]     = useState('#ffffff')
  const [backNumOutline, setBackNumOutline] = useState('')
  const [backNumFont, setBackNumFont]       = useState('Impact')
  const [backNumY, setBackNumY]             = useState(38)
  const [backNumScale, setBackNumScale]     = useState(34)
  const [showBackNum, setShowBackNum]       = useState(true)

  // Front number
  const [frontNum, setFrontNum]               = useState('10')
  const [frontNumColor, setFrontNumColor]     = useState('#ffffff')
  const [frontNumOutline, setFrontNumOutline] = useState('')
  const [frontNumFont, setFrontNumFont]       = useState('Impact')
  const [frontNumY, setFrontNumY]             = useState(20)
  const [frontNumScale, setFrontNumScale]     = useState(14)
  const [showFrontNum, setShowFrontNum]       = useState(true)

  // Sponsor
  const [sponsorText, setSponsorText]         = useState('')
  const [sponsorSub, setSponsorSub]           = useState('')
  const [sponsorFont, setSponsorFont]         = useState('Arial Black')
  const [sponsorColor, setSponsorColor]       = useState('#ffffff')
  const [sponsorSubColor, setSponsorSubColor] = useState('#ffffff')
  const [sponsorSide, setSponsorSide]         = useState('back')
  const [sponsorX, setSponsorX]               = useState(50)
  const [sponsorY, setSponsorY]               = useState(85)
  const [sponsorScale, setSponsorScale]       = useState(30)
  const [showSponsor, setShowSponsor]         = useState(true)

  // Logo
  const [logoSrc, setLogoSrc]       = useState(null)
  const [logoSide, setLogoSide]     = useState('front')
  const [logoX, setLogoX]           = useState(65)
  const [logoY, setLogoY]           = useState(20)
  const [logoScale, setLogoScale]   = useState(14)
  const [showLogo, setShowLogo]     = useState(true)
  const [showProjectPicker, setShowProjectPicker] = useState(false)
  const logoMeshGroupRef            = useRef(null)

  const texCanvasRef  = useRef(null)
  const jerseyTexRef  = useRef(null)

  // ref para actualizar uniforms del shader después de compilar
  const jerseyMatsRef = useRef([])   // lista de materiales del jersey

  // Presets
  const [presets, setPresets] = useState(PRESETS)
  const deletePreset = (id, e) => { e.stopPropagation(); setPresets(prev => prev.filter(p => p.id !== id)) }

  // Sidebar accordion
  const [openSection, setOpenSection] = useState(null)
  const toggleSection = (id) => setOpenSection(prev => prev === id ? null : id)

  const applyPreset = (p) => {
    setTemplate(p.template); setPrimary(p.primary); setSecondary(p.secondary); setStripeCount(p.stripeCount)
    if (p.backName   !== undefined) { setBackName(p.backName);     setBackNameColor(p.backNameColor);   setBackNameOutline(p.backNameOutline); setBackNameFont(p.backNameFont) }
    if (p.backNum    !== undefined) { setBackNum(p.backNum);       setBackNumColor(p.backNumColor);     setBackNumOutline(p.backNumOutline);   setBackNumFont(p.backNumFont) }
    if (p.frontNum   !== undefined) { setFrontNum(p.frontNum);     setFrontNumColor(p.frontNumColor);   setFrontNumOutline(p.frontNumOutline); setFrontNumFont(p.frontNumFont) }
    if (p.sponsorText !== undefined) { setSponsorText(p.sponsorText); setSponsorSub(p.sponsorSub || ''); setSponsorColor(p.sponsorColor); setSponsorSubColor(p.sponsorSubColor) }
    setShowBackName(true); setShowBackNum(true); setShowFrontNum(true); setShowSponsor(!!p.sponsorText)
  }

  // 3D refs
  const mountRef    = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef    = useRef(null)
  const cameraRef   = useRef(null)
  const controlsRef = useRef(null)
  const modelRef    = useRef(null)
  const decalsRef   = useRef([])
  const animRef     = useRef(null)
  const tokenRef    = useRef(0)

  // ── Init Three.js scene ────────────────────────────────────────────────────
  useEffect(() => {
    const mount = mountRef.current; if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0d0d10')
    scene.fog = new THREE.FogExp2('#0d0d10', 0.15)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(36, mount.clientWidth / mount.clientHeight, 0.01, 100)
    camera.position.set(0, 0.15, 3.4)
    cameraRef.current = camera

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const key = new THREE.DirectionalLight(0xfff5ea, 2.0)
    key.position.set(2.5, 5, 3); key.castShadow = true; scene.add(key)
    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.7)
    fill.position.set(-3, 2, -1); scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 0.4)
    rim.position.set(0, -3, -2); scene.add(rim)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true; controls.dampingFactor = 0.07
    controls.minDistance = 1.0; controls.maxDistance = 7
    controls.target.set(0, 0.1, 0); controls.update()
    controlsRef.current = controls

    const animate = () => {
      animRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Canvas texture
    const texCanvas = document.createElement('canvas')
    texCanvas.width = texCanvas.height = 2048
    texCanvasRef.current = texCanvas
    const jerseyTex = new THREE.CanvasTexture(texCanvas)
    jerseyTex.flipY = false
    jerseyTex.colorSpace = THREE.SRGBColorSpace
    jerseyTexRef.current = jerseyTex

    const loader = new GLTFLoader()
    loader.load('/Diseños_prendas3D/oversized_t-shirt.glb', (gltf) => {
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const s = 2 / Math.max(size.x, size.y, size.z)
      model.scale.setScalar(s)
      model.position.sub(center.multiplyScalar(s))
      model.position.y -= 0.08

      drawJerseyTexture(texCanvas, { template: 'solid', primary: '#1a3a6b', secondary: '#e63946' })
      jerseyTex.needsUpdate = true

      // ── Bounding Box en espacio MUNDO (después de escalar y reposicionar) ──
      // Necesitamos las coordenadas world-space reales para que el shader
      // proyecte las rayas correctamente sobre la malla transformada.
      model.updateMatrixWorld(true)
      const worldBox = new THREE.Box3().setFromObject(model)
      const worldCenter = worldBox.getCenter(new THREE.Vector3())
      const worldHalf   = worldBox.getSize(new THREE.Vector3()).multiplyScalar(0.5)

      model.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true; node.receiveShadow = true
          const mats = Array.isArray(node.material) ? node.material : [node.material]
          mats.forEach(mat => {
            mat.map = jerseyTex
            mat.vertexColors = false
            mat.color.set('#ffffff')
            mat.roughness = 0.82; mat.metalness = 0.0

            // ── Shader de rayas RECTAS (Proyección World-Space Planar) ────
            // Usamos coordenadas MUNDO para que las rayas se proyecten
            // de forma plana, recta y simétrica sobre toda la camiseta.
            mat.onBeforeCompile = (shader) => {
              shader.uniforms.uPrimary      = { value: new THREE.Color('#1a3a6b') }
              shader.uniforms.uSecondary    = { value: new THREE.Color('#e63946') }
              shader.uniforms.uStripeCount  = { value: 6.0 }
              shader.uniforms.uStripeMode   = { value: 0 }   // 0=off 1=vert 2=horiz
              shader.uniforms.uStripeFacing = { value: 0 }   // 0=ambos 1=delante 2=detrás
              shader.uniforms.uBBoxCenter   = { value: worldCenter.clone() }
              shader.uniforms.uBBoxHalf     = { value: worldHalf.clone() }

              // Vertex: calcular posición mundo real (modelMatrix incluye
              // la escala y posición del grupo padre)
              shader.vertexShader =
                'varying vec3 vWorldPos;\n' +
                shader.vertexShader.replace(
                  '#include <worldpos_vertex>',
                  `#include <worldpos_vertex>\n vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
                )

              // Fragment: proyección planar world-space → rayas rectas y simétricas
              shader.fragmentShader =
                `uniform vec3 uPrimary;
                uniform vec3 uSecondary;
                uniform float uStripeCount;
                uniform int uStripeMode;
                uniform int uStripeFacing;
                uniform vec3 uBBoxCenter;
                uniform vec3 uBBoxHalf;
                varying vec3 vWorldPos;\n` +
                shader.fragmentShader.replace(
                  '#include <map_fragment>',
                  `#include <map_fragment>
                  if (uStripeMode > 0) {
                    // Detectar cara delantera/trasera según Z respecto al centro
                    bool isFront = vWorldPos.z > uBBoxCenter.z;

                    // Visibilidad de rayas (delante / detrás / ambos)
                    bool shouldStripe = (uStripeFacing == 0) ||
                                        (uStripeFacing == 1 && isFront) ||
                                        (uStripeFacing == 2 && !isFront);

                    if (shouldStripe) {
                      float u;
                      if (uStripeMode == 1) {
                        // Rayas verticales SIMÉTRICAS: espejamos X con abs()
                        // para garantizar que izquierda = derecha siempre.
                        // abs() hace que 0 = centro, 1 = borde (ambos lados).
                        float nx = abs(vWorldPos.x - uBBoxCenter.x) / uBBoxHalf.x;
                        u = nx * uStripeCount * 0.5;
                      } else {
                        // Rayas horizontales: proyección en eje Y mundo
                        u = (vWorldPos.y - uBBoxCenter.y + uBBoxHalf.y) / (2.0 * uBBoxHalf.y);
                        u = u * uStripeCount;
                      }
                      // Bordes suavizados (anti-aliasing)
                      float stripe = fract(u);
                      float pattern = smoothstep(0.47, 0.53, stripe);
                      diffuseColor.rgb = mix(uPrimary, uSecondary, pattern);
                    } else {
                      // Lado sin rayas: color primario sólido
                      diffuseColor.rgb = uPrimary;
                    }
                  }`
                )

              mat.userData.shader = shader
            }
            mat.customProgramCacheKey = () => 'jersey_planar_v3'
            mat.needsUpdate = true
            jerseyMatsRef.current.push(mat)
          })
        }
      })
      scene.add(model)
      modelRef.current = model
    }, undefined, err => console.error('GLB error:', err))

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      controls.dispose(); renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      jerseyMatsRef.current = []
    }
  }, [])

  // ── Redraw jersey texture + update stripe shader uniforms ────────────────
  useEffect(() => {
    const apply = () => {
      const canvas = texCanvasRef.current; const tex = jerseyTexRef.current
      if (!canvas || !tex) return

      // ── Actualizar uniforms del stripe shader vía userData.shader ────
      const mode = template === 'stripes_v' ? 1 : template === 'stripes_h' ? 2 : 0
      jerseyMatsRef.current.forEach(mat => {
        const s = mat.userData.shader
        if (!s) return
        s.uniforms.uPrimary.value.set(primary)
        s.uniforms.uSecondary.value.set(secondary)
        s.uniforms.uStripeCount.value  = stripeCount
        s.uniforms.uStripeMode.value   = mode
        s.uniforms.uStripeFacing.value = stripeVisibility
      })

      // Canvas solo para templates no-rayas (degradados, sólidos, paneles…)
      // Para rayas el shader sobreescribe el color, canvas no importa
      drawJerseyTexture(canvas, { template, primary, secondary, stripeCount })
      tex.needsUpdate = true
    }
    if (!texCanvasRef.current) {
      const poll = setInterval(() => { if (texCanvasRef.current) { clearInterval(poll); apply() } }, 100)
      return () => clearInterval(poll)
    }
    apply()
  }, [template, primary, secondary, stripeCount, stripeVisibility])

  // ── Rebuild text decals ────────────────────────────────────────────────────
  const rebuildDecals = useCallback(() => {
    if (!modelRef.current || !sceneRef.current) return

    tokenRef.current += 1
    const token = tokenRef.current

    // Clear old decals
    decalsRef.current.forEach(d => {
      d.geometry?.dispose()
      const mats = Array.isArray(d.material) ? d.material : [d.material]
      mats.forEach(m => { m.map?.dispose(); m.dispose() })
      d.parent?.remove(d)
    })
    decalsRef.current = []

    const model = modelRef.current
    const scene = sceneRef.current
    const box = new THREE.Box3().setFromObject(model)
    const W = box.max.x - box.min.x
    const H = box.max.y - box.min.y
    const D = box.max.z - box.min.z

    const placeDecal = ({ canvas, yPct, xPct = 50, isFront, scaleW, scaleH, polygonOffsetFactor = -5 }) => {
      if (token !== tokenRef.current) return
      if (!canvas) return

      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true

      const projDepth = D * 0.62
      const cx = (box.min.x + box.max.x) / 2
      const relX = (xPct - 50) / 100
      const px = isFront ? cx + relX * W : cx - relX * W
      const py = box.max.y - (yPct / 100) * H
      const pz = isFront ? box.max.z - projDepth / 2 : box.min.z + projDepth / 2

      const pos = new THREE.Vector3(px, py, pz)
      const dummy = new THREE.Object3D()
      dummy.position.copy(pos)
      dummy.lookAt(pos.clone().add(new THREE.Vector3(0, 0, isFront ? 1 : -1)))
      const orientation = new THREE.Euler().copy(dummy.rotation)
      const size3D = new THREE.Vector3((scaleW / 100) * W, (scaleH / 100) * H, projDepth)

      const mat = new THREE.MeshStandardMaterial({
        map: tex, transparent: true,
        roughness: 0.75, metalness: 0.0,
        depthTest: true, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor, polygonOffsetUnits: polygonOffsetFactor,
      })

      model.traverse(node => {
        if (node.isMesh && node.name !== 'DecalMesh') {
          try {
            const geom = new DecalGeometry(node, pos, orientation, size3D)
            if (geom.attributes.position?.count > 0) {
              const m = new THREE.Mesh(geom, mat)
              m.name = 'DecalMesh'
              scene.add(m); decalsRef.current.push(m)
            } else geom.dispose()
          } catch (_) {}
        }
      })
    }

    if (showBackName && backName.trim()) {
      const h = Math.max(64, Math.round(512 * (backNameScale / 100) * 0.28))
      placeDecal({
        canvas: makeTextCanvas({ text: backName.toUpperCase(), font: backNameFont, color: backNameColor, outline: backNameOutline || null, width: 1024, height: h }),
        yPct: backNameY, isFront: false, scaleW: backNameScale, scaleH: backNameScale * 0.13,
      })
    }

    if (showBackNum && backNum.trim()) {
      placeDecal({
        canvas: makeTextCanvas({ text: backNum, font: backNumFont, color: backNumColor, outline: backNumOutline || null, width: 512, height: 512 }),
        yPct: backNumY, isFront: false, scaleW: backNumScale, scaleH: backNumScale,
      })
    }

    if (showFrontNum && frontNum.trim()) {
      placeDecal({
        canvas: makeTextCanvas({ text: frontNum, font: frontNumFont, color: frontNumColor, outline: frontNumOutline || null, width: 256, height: 256 }),
        yPct: frontNumY, xPct: 36, isFront: true, scaleW: frontNumScale, scaleH: frontNumScale,
      })
    }

    if (showSponsor && sponsorText.trim()) {
      const sc = makeSponsorCanvas({ mainText: sponsorText, subText: sponsorSub, font: sponsorFont, color: sponsorColor, subColor: sponsorSubColor })
      const ratio = sc.width / sc.height
      const scaleH = sponsorScale / ratio
      placeDecal({
        canvas: sc,
        xPct: sponsorX, yPct: sponsorY,
        isFront: sponsorSide === 'front',
        scaleW: sponsorScale,
        scaleH: Math.max(scaleH, 2),
      })
    }
  }, [
    showBackName, backName, backNameFont, backNameColor, backNameOutline, backNameY, backNameScale,
    showBackNum, backNum, backNumFont, backNumColor, backNumOutline, backNumY, backNumScale,
    showFrontNum, frontNum, frontNumFont, frontNumColor, frontNumOutline, frontNumY, frontNumScale,
    showSponsor, sponsorText, sponsorSub, sponsorFont, sponsorColor, sponsorSubColor, sponsorSide, sponsorX, sponsorY, sponsorScale,
  ])

  useEffect(() => {
    if (!modelRef.current) {
      const poll = setInterval(() => { if (modelRef.current) { clearInterval(poll); rebuildDecals() } }, 150)
      return () => clearInterval(poll)
    }
    rebuildDecals()
  }, [rebuildDecals])

  // ── Logo decal ────────────────────────────────────────────────────────────
  const buildLogoMesh = useCallback(() => {
    const scene = sceneRef.current
    const model = modelRef.current

    if (logoMeshGroupRef.current && scene) {
      logoMeshGroupRef.current.forEach(m => {
        m.geometry?.dispose()
        const mats = Array.isArray(m.material) ? m.material : [m.material]
        mats.forEach(mat => { mat.map?.dispose(); mat.dispose() })
        scene.remove(m)
      })
      logoMeshGroupRef.current = null
    }

    if (!showLogo || !logoSrc || !model || !scene) return

    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      if (cancelled) return

      const box = new THREE.Box3().setFromObject(model)
      const BW = box.max.x - box.min.x
      const BH = box.max.y - box.min.y
      const BD = box.max.z - box.min.z

      const PAD = 0.25; const SIZE = 512
      const padPx = Math.round(SIZE * PAD)
      const inner = SIZE - padPx * 2
      const cv = document.createElement('canvas')
      cv.width = SIZE; cv.height = SIZE
      const ctx = cv.getContext('2d')
      ctx.clearRect(0, 0, SIZE, SIZE)
      const aspect = img.naturalWidth / (img.naturalHeight || 1)
      let dw = inner, dh = inner
      if (aspect > 1) { dh = inner / aspect } else { dw = inner * aspect }
      const dx = padPx + (inner - dw) / 2
      const dy = padPx + (inner - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)

      const tex = new THREE.CanvasTexture(cv)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true

      const mat = new THREE.MeshStandardMaterial({
        map: tex, transparent: true, alphaTest: 0.02,
        roughness: 0.2, metalness: 0.0,
        depthTest: true, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -12, polygonOffsetUnits: -12,
      })

      const sizeXY = (logoScale / 100) * BW / (1 - PAD * 2)
      const projDepth = BD * 0.65
      const isFront = logoSide === 'front'
      const cx = (box.min.x + box.max.x) / 2
      const relX = (logoX - 50) / 100
      const px = isFront ? cx + relX * BW : cx - relX * BW
      const py = box.max.y - (logoY / 100) * BH
      const pz = isFront ? box.max.z - projDepth / 2 : box.min.z + projDepth / 2

      const pos = new THREE.Vector3(px, py, pz)
      const dummy = new THREE.Object3D()
      dummy.position.copy(pos)
      dummy.lookAt(pos.clone().add(new THREE.Vector3(0, 0, isFront ? 1 : -1)))
      const orientation = new THREE.Euler().copy(dummy.rotation)
      const size3D = new THREE.Vector3(sizeXY, sizeXY, projDepth)

      const placed = []
      model.traverse(node => {
        if (!node.isMesh) return
        try {
          const geom = new DecalGeometry(node, pos, orientation, size3D)
          if ((geom.attributes.position?.count ?? 0) > 0) {
            const m = new THREE.Mesh(geom, mat)
            m.renderOrder = 1
            scene.add(m); placed.push(m)
          } else geom.dispose()
        } catch (_) {}
      })

      if (cancelled) {
        placed.forEach(m => { m.geometry.dispose(); scene.remove(m) })
        mat.map?.dispose(); mat.dispose()
        return
      }
      logoMeshGroupRef.current = placed
    }

    img.onerror = () => {
      if (cancelled) return
      const img2 = new Image(); img2.onload = img.onload; img2.src = logoSrc
    }
    img.src = logoSrc
    return () => { cancelled = true }
  }, [showLogo, logoSrc, logoX, logoY, logoScale, logoSide])

  useEffect(() => {
    if (!modelRef.current) {
      const poll = setInterval(() => { if (modelRef.current) { clearInterval(poll); buildLogoMesh() } }, 150)
      return () => clearInterval(poll)
    }
    return buildLogoMesh()
  }, [buildLogoMesh])

  const exportPNG = () => {
    if (!rendererRef.current) return
    rendererRef.current.render(sceneRef.current, cameraRef.current)
    const a = document.createElement('a')
    a.href = rendererRef.current.domElement.toDataURL('image/png')
    a.download = 'jersey_3d.png'; a.click()
  }

  const resetCamera = () => {
    cameraRef.current?.position.set(0, 0.15, 3.4)
    if (controlsRef.current) { controlsRef.current.target.set(0, 0.1, 0); controlsRef.current.update() }
  }

  const AccSection = ({ id, zone, title, badge, toggle, toggled, children }) => {
    const open = openSection === id
    return (
      <div className="bg-[#111114] border border-white/8 rounded-2xl overflow-hidden">
        <button onClick={() => toggleSection(id)}
          className="w-full flex items-center gap-3 px-3.5 py-3.5 hover:bg-white/3 transition-all">
          <JerseyZoneSVG zone={zone} size={36} />
          <div className="flex-1 text-left min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80 leading-none">{title}</p>
            {badge && <p className="text-[9px] text-white/28 mt-1 truncate">{badge}</p>}
          </div>
          {toggle !== undefined && (
            <button onClick={e => { e.stopPropagation(); toggled !== undefined && toggle(!toggled) }}
              className={`p-1 rounded-lg transition-all border shrink-0 ${toggled ? 'bg-[#e63946]/15 border-[#e63946]/30 text-[#e63946] shadow-sm' : 'bg-white/4 border-white/8 text-white/25'}`}>
              {toggled ? <Eye size={11} /> : <EyeOff size={11} />}
            </button>
          )}
          <ChevronRight size={12} className={`text-white/25 transition-transform duration-200 shrink-0 ${open ? 'rotate-90' : ''}`} />
        </button>
        {open && (
          <div className="px-3.5 pb-3.5 space-y-3 border-t border-white/5 pt-3">
            {children}
          </div>
        )}
      </div>
    )
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setLogoSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleProjectSelect = (project) => {
    const url = getPreviewUrl(project)
    setLogoSrc(url || null)
    setShowProjectPicker(false)
    setOpenSection('logo')
  }

  const clearLogo = () => {
    setLogoSrc(null)
    if (logoMeshGroupRef.current && sceneRef.current) {
      logoMeshGroupRef.current.forEach(m => {
        m.geometry?.dispose()
        const mats = Array.isArray(m.material) ? m.material : [m.material]
        mats.forEach(mat => { mat.map?.dispose(); mat.dispose() })
        sceneRef.current.remove(m)
      })
      logoMeshGroupRef.current = null
    }
  }

  const FontSelect = ({ value, onChange }) => (
    <div>
      <span className={labelCls}>Tipografía</span>
      <select value={value} onChange={e => onChange(e.target.value)} className={inputCls + ' text-[11px]'}>
        {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
      </select>
    </div>
  )

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0d0d10] text-white overflow-hidden select-none font-sans">
      {/* Header */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-white/6 bg-[#080809] z-50">
        <div className="flex items-center gap-3">
          <Link to="/herramientas" className="p-2 hover:bg-white/8 rounded-xl text-white/30 hover:text-[#e63946] transition-all">
            <ChevronLeft size={17} />
          </Link>
          <div className="w-px h-5 bg-white/8" />
          <div>
            <p className="text-[12px] font-black tracking-[0.15em] uppercase text-white leading-none">Jersey 3D</p>
            <p className="text-[9px] text-white/22 mt-0.5">Diseña la equipación · nombre · número · patrón</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={resetCamera} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-white/35 hover:text-white hover:bg-white/10 transition-all text-[10px] font-bold">
            <RotateCcw size={11} /> Reset
          </button>
          <button onClick={exportPNG} className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#e63946] hover:bg-[#c12635] text-white text-[10px] font-black tracking-widest uppercase transition-all shadow-[0_4px_16px_rgba(230,57,70,0.35)]">
            <Download size={11} /> Exportar PNG
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[280px] shrink-0 bg-[#09090c] border-r border-white/5 overflow-y-auto flex flex-col gap-2 p-3 min-h-0">

          {/* Plantillas rápidas */}
          <div className="bg-[#111114] border border-white/8 rounded-2xl overflow-hidden">
            <button onClick={() => toggleSection('presets')}
              className="w-full flex items-center gap-3 px-3.5 py-3.5 hover:bg-white/3 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#e63946]/12 border border-[#e63946]/20 flex items-center justify-center shrink-0">
                <span className="text-base">⚡</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80 leading-none">Plantillas rápidas</p>
                <p className="text-[9px] text-white/28 mt-1">{presets.length} diseños · todos los tipos</p>
              </div>
              <ChevronRight size={12} className={`text-white/25 transition-transform duration-200 shrink-0 ${openSection === 'presets' ? 'rotate-90' : ''}`} />
            </button>
            {openSection === 'presets' && (
              <div className="px-3 pb-3 border-t border-white/5 pt-3">
                <div className="grid grid-cols-4 gap-1.5 max-h-[55vh] overflow-y-auto pr-0.5"
                  onWheel={e => e.stopPropagation()}>
                  {presets.map(p => (
                    <div key={p.id} className="relative group/card">
                      <button onClick={() => applyPreset(p)}
                        className={`w-full flex flex-col items-center gap-1 p-1 rounded-xl border-2 transition-all ${template === p.template && primary === p.primary && secondary === p.secondary ? 'border-[#e63946] shadow-[0_0_0_2px_rgba(230,57,70,0.2)]' : 'border-white/8 hover:border-white/25'}`}>
                        <div className="w-full aspect-[7/9] rounded-lg overflow-hidden">
                          <PresetThumb preset={p} />
                        </div>
                        <span className="text-[7.5px] font-bold text-white/40 leading-tight text-center">{p.label}</span>
                      </button>
                      <button onClick={(e) => deletePreset(p.id, e)}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e63946] text-white items-center justify-center hidden group-hover/card:flex shadow-md hover:bg-[#c12635] z-10">
                        <X size={8} />
                      </button>
                    </div>
                  ))}
                  {presets.length === 0 && (
                    <p className="col-span-4 text-center text-[9px] text-white/20 py-3">Sin plantillas · recarga para restaurar</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Diseño */}
          <AccSection id="diseno" zone="full" title="Diseño" badge={`${TEMPLATES.find(t=>t.id===template)?.label} · ${primary}`}>
            <div className="grid grid-cols-4 gap-1.5 mb-1">
              {TEMPLATES.map(tpl => (
                <TemplateThumbnail key={tpl.id} tpl={tpl} active={template === tpl.id}
                  primary={primary} secondary={secondary} stripeCount={stripeCount} onClick={() => setTemplate(tpl.id)} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ColorSwatch label="Color 1" value={primary}   onChange={setPrimary} />
              <ColorSwatch label="Color 2" value={secondary} onChange={setSecondary} />
            </div>
            {(template === 'stripes_v' || template === 'stripes_h') && (
              <Slider label="Número de rayas" value={stripeCount} min={2} max={16} step={1}
                onChange={setStripeCount} />
            )}
            {(template === 'stripes_v' || template === 'stripes_h') && (
              <div className="space-y-1.5">
                <span className={labelCls}>Visibilidad de rayas</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button onClick={() => setStripeVisibility(0)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${stripeVisibility === 0 ? 'bg-[#e63946]/15 border-[#e63946]/40 text-[#e63946] shadow-sm' : 'bg-white/4 border-white/8 text-white/30 hover:text-white/50'}`}>
                    Ambos
                  </button>
                  <button onClick={() => setStripeVisibility(1)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${stripeVisibility === 1 ? 'bg-[#e63946]/15 border-[#e63946]/40 text-[#e63946] shadow-sm' : 'bg-white/4 border-white/8 text-white/30 hover:text-white/50'}`}>
                    Delante
                  </button>
                  <button onClick={() => setStripeVisibility(2)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${stripeVisibility === 2 ? 'bg-[#e63946]/15 border-[#e63946]/40 text-[#e63946] shadow-sm' : 'bg-white/4 border-white/8 text-white/30 hover:text-white/50'}`}>
                    Detrás
                  </button>
                </div>
              </div>
            )}
          </AccSection>

          {/* Nombre · Espalda */}
          <AccSection id="back-name" zone="back-top" title="Nombre · Espalda"
            badge={backName || 'Sin configurar'} toggle={setShowBackName} toggled={showBackName}>
            <div className={`space-y-3 ${!showBackName ? 'opacity-25 pointer-events-none' : ''}`}>
              <div>
                <span className={labelCls}>Nombre</span>
                <input value={backName} onChange={e => setBackName(e.target.value.toUpperCase())}
                  className={inputCls} placeholder="RODRIGUEZ" maxLength={16} />
              </div>
              <FontSelect value={backNameFont} onChange={setBackNameFont} />
              <div className="grid grid-cols-2 gap-2">
                <ColorSwatch label="Color"    value={backNameColor}             onChange={setBackNameColor} />
                <ColorSwatch label="Contorno" value={backNameOutline||'#000000'} onChange={setBackNameOutline} />
              </div>
              <Slider label="Tamaño"     value={backNameScale} min={25} max={80} onChange={setBackNameScale} unit="%" />
              <Slider label="Posición Y" value={backNameY}     min={8}  max={50} onChange={setBackNameY}     unit="%" />
            </div>
          </AccSection>

          {/* Número · Espalda */}
          <AccSection id="back-num" zone="back-center" title="Número · Espalda"
            badge={backNum || 'Sin configurar'} toggle={setShowBackNum} toggled={showBackNum}>
            <div className={`space-y-3 ${!showBackNum ? 'opacity-25 pointer-events-none' : ''}`}>
              <input value={backNum} onChange={e => setBackNum(e.target.value)}
                className={`${inputCls} text-center text-2xl font-black`} placeholder="10" maxLength={3} />
              <FontSelect value={backNumFont} onChange={setBackNumFont} />
              <div className="grid grid-cols-2 gap-2">
                <ColorSwatch label="Color"    value={backNumColor}              onChange={setBackNumColor} />
                <ColorSwatch label="Contorno" value={backNumOutline||'#000000'} onChange={setBackNumOutline} />
              </div>
              <Slider label="Tamaño"     value={backNumScale} min={15} max={55} onChange={setBackNumScale} unit="%" />
              <Slider label="Posición Y" value={backNumY}     min={25} max={72} onChange={setBackNumY}     unit="%" />
            </div>
          </AccSection>

          {/* Número · Pecho */}
          <AccSection id="front-num" zone="chest" title="Número · Pecho"
            badge={frontNum || 'Sin configurar'} toggle={setShowFrontNum} toggled={showFrontNum}>
            <div className={`space-y-3 ${!showFrontNum ? 'opacity-25 pointer-events-none' : ''}`}>
              <input value={frontNum} onChange={e => setFrontNum(e.target.value)}
                className={`${inputCls} text-center text-xl font-black`} placeholder="10" maxLength={3} />
              <FontSelect value={frontNumFont} onChange={setFrontNumFont} />
              <div className="grid grid-cols-2 gap-2">
                <ColorSwatch label="Color"    value={frontNumColor}             onChange={setFrontNumColor} />
                <ColorSwatch label="Contorno" value={frontNumOutline||'#000000'} onChange={setFrontNumOutline} />
              </div>
              <Slider label="Tamaño"     value={frontNumScale} min={8}  max={28} onChange={setFrontNumScale} unit="%" />
              <Slider label="Posición Y" value={frontNumY}     min={10} max={55} onChange={setFrontNumY}     unit="%" />
            </div>
          </AccSection>

          {/* Patrocinador */}
          <AccSection id="sponsor" zone="bottom" title="Patrocinador"
            badge={sponsorText || 'Sin configurar'} toggle={setShowSponsor} toggled={showSponsor}>
            <div className={`space-y-3 ${!showSponsor ? 'opacity-25 pointer-events-none' : ''}`}>
              <div>
                <span className={labelCls}>Texto principal</span>
                <input value={sponsorText} onChange={e => setSponsorText(e.target.value)}
                  className={inputCls} placeholder="UNHCR ACNUR" maxLength={24} />
              </div>
              <div>
                <span className={labelCls}>Subtítulo (opcional)</span>
                <input value={sponsorSub} onChange={e => setSponsorSub(e.target.value)}
                  className={inputCls} placeholder="The UN Refugee Agency" maxLength={36} />
              </div>
              <FontSelect value={sponsorFont} onChange={setSponsorFont} />
              <div className="grid grid-cols-2 gap-2">
                <ColorSwatch label="Color texto"     value={sponsorColor}    onChange={setSponsorColor} />
                <ColorSwatch label="Color subtítulo" value={sponsorSubColor} onChange={setSponsorSubColor} />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {['front','back'].map(s => (
                  <button key={s} onClick={() => setSponsorSide(s)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${sponsorSide === s ? 'bg-[#e63946]/15 border-[#e63946]/40 text-[#e63946] shadow-sm' : 'bg-white/4 border-white/8 text-white/30 hover:text-white/50'}`}>
                    {s === 'front' ? 'Pecho' : 'Espalda'}
                  </button>
                ))}
              </div>
              <Slider label="Tamaño"     value={sponsorScale} min={10} max={55} onChange={setSponsorScale} unit="%" />
              <Slider label="Posición X" value={sponsorX}     min={15} max={85} onChange={setSponsorX}     unit="%" />
              <Slider label="Posición Y" value={sponsorY}     min={40} max={92} onChange={setSponsorY}     unit="%" />
            </div>
          </AccSection>

          {/* Logo / Escudo */}
          <AccSection id="logo" zone="logo" title="Logo / Escudo"
            badge={logoSrc ? 'Logo cargado' : 'Sin configurar'} toggle={setShowLogo} toggled={showLogo}>
            <div className={`space-y-3 ${!showLogo ? 'opacity-25 pointer-events-none' : ''}`}>
              {!logoSrc ? (
                <div className="space-y-2">
                  <button onClick={() => setShowProjectPicker(true)}
                    className="w-full flex items-center justify-center gap-2.5 h-16 rounded-xl border-2 border-[#e63946]/30 hover:border-[#e63946]/60 bg-[#e63946]/5 hover:bg-[#e63946]/10 cursor-pointer transition-all group">
                    <FolderOpen size={16} className="text-[#e63946]/60 group-hover:text-[#e63946] transition-colors" />
                    <div className="text-left">
                      <p className="text-[10px] font-black text-white/70 group-hover:text-white transition-colors">Elegir de Mis Proyectos</p>
                      <p className="text-[8px] text-white/25">Importa un diseño guardado</p>
                    </div>
                  </button>
                  <label className="flex items-center justify-center gap-2 h-9 rounded-xl border border-dashed border-white/12 hover:border-white/25 cursor-pointer transition-all group bg-white/2">
                    <Upload size={12} className="text-white/20 group-hover:text-white/40 transition-colors" />
                    <span className="text-[9px] text-white/25 group-hover:text-white/40 font-medium">O subir archivo (PNG/SVG)</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img src={logoSrc} alt="logo" className="w-full h-24 object-contain rounded-xl bg-white/5 border border-white/8" />
                  <button onClick={clearLogo} className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 hover:bg-[#e63946]/80 text-white/50 hover:text-white transition-all">
                    <X size={10} />
                  </button>
                  <button onClick={() => setShowProjectPicker(true)}
                    className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 hover:bg-white/10 text-white/40 hover:text-white/80 text-[8px] font-bold transition-all">
                    <FolderOpen size={9} /> Cambiar
                  </button>
                </div>
              )}
              {logoSrc && (<>
                <div className="grid grid-cols-2 gap-1.5">
                  {['front','back'].map(s => (
                    <button key={s} onClick={() => setLogoSide(s)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${logoSide === s ? 'bg-[#e63946]/15 border-[#e63946]/40 text-[#e63946]' : 'bg-white/4 border-white/8 text-white/30 hover:text-white/50'}`}>
                      {s === 'front' ? 'Pecho' : 'Espalda'}
                    </button>
                  ))}
                </div>
                <Slider label="Tamaño"     value={logoScale} min={5}  max={35} onChange={setLogoScale} unit="%" />
                <Slider label="Posición X" value={logoX}     min={20} max={80} onChange={setLogoX}     unit="%" />
                <Slider label="Posición Y" value={logoY}     min={10} max={65} onChange={setLogoY}     unit="%" />
              </>)}
            </div>
          </AccSection>

        </aside>

        {/* 3D viewport */}
        <div className="flex-1 relative overflow-hidden">
          <div ref={mountRef} className="w-full h-full" />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/45 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/6 pointer-events-none">
            <span className="text-[9.5px] text-white/35 font-medium tracking-wide">Arrastra · rotar &nbsp;|&nbsp; Scroll · zoom &nbsp;|&nbsp; Click derecho · desplazar</span>
          </div>
        </div>
      </div>

      {showProjectPicker && (
        <ProjectPickerModal onSelect={handleProjectSelect} onClose={() => setShowProjectPicker(false)} />
      )}
    </div>
  )
}
