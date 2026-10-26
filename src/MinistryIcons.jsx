/*
  Lightweight inline-SVG icons for the Ministries cards.
  No images, no extra packages. All motion is plain CSS (see "Ministry icons" in App.css)
  and is triggered by hovering the parent .card (or .is-live on touch screens).
*/

const Sparkle = ({ x, y, d }) => (
  <g transform={`translate(${x} ${y})`}>
    <path
      className="mi-spark"
      style={{ animationDelay: `${d}s` }}
      d="M0 -4.5 L1.1 -1.1 L4.5 0 L1.1 1.1 L0 4.5 L-1.1 1.1 L-4.5 0 L-1.1 -1.1 Z"
    />
  </g>
)

/* ---------- Healing & Deliverance: dove with heavenly glow ---------- */
// one feather = a pointed petal drawn along +x, then rotated/scaled around the wing root
const FEATHER = 'M0 0 C8 -4.6 22 -4.9 30 0 C22 4.9 8 4.6 0 0 Z'
const Wing = ({ root, feathers, far }) => (
  <g className={`mi-wing${far ? ' mi-wing--far' : ''}`}>
    {feathers.map(([angle, len], i) => (
      <path
        key={i}
        className="mi-fill mi-feather"
        d={FEATHER}
        transform={`translate(${root[0]} ${root[1]}) rotate(${angle}) scale(${len / 30} 1)`}
      />
    ))}
    {/* coverts: short shoulder feathers */}
    {[[-138, 13], [-114, 15], [-90, 15], [-68, 12]].map(([angle, len], i) => (
      <path
        key={`c${i}`}
        className="mi-fill mi-feather"
        d={FEATHER}
        transform={`translate(${root[0] + 0.5} ${root[1] + 0.5}) rotate(${angle}) scale(${len / 30} 1.15)`}
      />
    ))}
  </g>
)

const TAIL = 'M0 0 C4 -2.4 11 -2.6 16 0 C11 2.6 4 2.4 0 0 Z'

export function DoveIcon() {
  return (
    <svg className="mi mi--dove" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="mi-dove-glow">
          <stop offset="0" stopColor="#fff7c9" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffdf7a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffdf7a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mi-dove-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6dfec" />
        </linearGradient>
      </defs>

      <circle className="mi-halo" cx="32" cy="32" r="31" fill="url(#mi-dove-glow)" />

      <g className="mi-dove">
        {/* far wing */}
        <Wing far root={[31, 35]} feathers={[[-128, 19], [-117, 23], [-106, 26], [-95, 25], [-84, 21]]} />

        {/* tail feathers */}
        <path className="mi-fill" d={TAIL} transform="translate(17 41) rotate(158)" />
        <path className="mi-fill" d={TAIL} transform="translate(17 41) rotate(142)" />
        <path className="mi-fill" d={TAIL} transform="translate(17 41) rotate(126)" />

        {/* body, head and beak */}
        <path
          className="mi-fill mi-body"
          d="M10 41 C14 34 23 31 32 32 C34 27 39 24.5 44.5 25.5 C48.5 26.3 51 29 50.8 32 L56.5 33.6 L50.4 35.2 C48 41.5 39 46 29 45.5 C21 45 14 43.5 10 41 Z"
        />
        {/* chest feathers */}
        <path className="mi-lines mi-lines--body" d="M22 39.5 C25 41.5 30 42.2 35 41.2 M26 36.2 C29 37.8 33 38 37 37 M31 42.8 C35 43.2 39 42 42 39.5" />

        {/* near wing */}
        <Wing root={[29, 36]} feathers={[[-132, 21], [-121, 26], [-110, 30], [-99, 31], [-88, 29], [-77, 24]]} />

        {/* eye */}
        <circle cx="46.6" cy="29.4" r="1.25" className="mi-eye" />
        <circle cx="47" cy="29" r="0.4" fill="#fff" />

        {/* olive branch */}
        <path className="mi-stem" d="M54.8 34 C57.5 34.2 60 32.8 61.8 30" />
        <path className="mi-leaf" d="M0 0 C2 -2.4 5.2 -2.4 7 0 C5.2 2.4 2 2.4 0 0 Z" transform="translate(57.2 33.9) rotate(-52)" />
        <path className="mi-leaf" d="M0 0 C2 -2.4 5.2 -2.4 7 0 C5.2 2.4 2 2.4 0 0 Z" transform="translate(58.6 33) rotate(20)" />
        <path className="mi-leaf" d="M0 0 C2 -2.4 5.2 -2.4 7 0 C5.2 2.4 2 2.4 0 0 Z" transform="translate(60 31.4) rotate(-78)" />
      </g>

      <Sparkle x={9} y={13} d={0} />
      <Sparkle x={55} y={12} d={0.5} />
      <Sparkle x={50} y={55} d={1} />
    </svg>
  )
}

/* ---------- Word & Teaching: open Bible that turns pages ---------- */
const PAGE = 'M32 17 C40 13.5 49 13.5 56.5 16 L56.5 48.5 C49 46 40 46 32 50 Z'
const LINES = 'M37 23 C42 21.5 47 21.5 52 23 M37 28 C42 26.5 47 26.5 52 28 M37 33 C42 31.5 47 31.5 52 33 M37 38 C42 36.5 47 36.5 52 38'

export function BibleIcon() {
  return (
    <svg className="mi mi--bible" viewBox="0 0 64 64" aria-hidden="true">
      {/* cover */}
      <path className="mi-cover" d="M3 18 L3 53 C13 50 24 50 32 54 C40 50 51 50 61 53 L61 18 Z" />
      {/* left page */}
      <path className="mi-fill" d="M32 16 C24 12 14 12 6 15 L6 50 C14 47 24 47 32 51 Z" />
      <path className="mi-lines" d="M12 23 C17 21.5 22 21.5 27 23 M12 28 C17 26.5 22 26.5 27 28 M12 33 C17 31.5 22 31.5 27 33 M12 38 C17 36.5 22 36.5 27 38" />
      {/* right page */}
      <path className="mi-fill" d="M32 16 C40 12 50 12 58 15 L58 50 C50 47 40 47 32 51 Z" />
      <path className="mi-lines" d={LINES} />

      {/* pages that turn */}
      <g className="mi-turn mi-turn--b">
        <path className="mi-fill" d={PAGE} />
        <path className="mi-lines" d={LINES} />
      </g>
      <g className="mi-turn mi-turn--a">
        <path className="mi-fill" d={PAGE} />
        <path className="mi-lines" d={LINES} />
      </g>

      {/* spine */}
      <path className="mi-spine" d="M32 16 L32 51" />
    </svg>
  )
}

/* ---------- Prayer Altar: beveled cross on stepped base, radiating power ---------- */
const CROSS =
  'M26.4 5 L37.6 5 L35.6 10 L35.6 17.9 L45 17.9 L50 15.9 L50 27.1 L45 25.1 L35.6 25.1 L35.6 47 L37.6 52 L26.4 52 L28.4 47 L28.4 25.1 L19 25.1 L14 27.1 L14 15.9 L19 17.9 L28.4 17.9 L28.4 10 Z'

export function CrossIcon() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg className="mi mi--cross" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="mi-cross-glow">
          <stop offset="0" stopColor="#fff7c9" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffdf7a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffdf7a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mi-cross-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3217f" />
          <stop offset="0.5" stopColor="#a8146d" />
          <stop offset="1" stopColor="#750e4c" />
        </linearGradient>
        <linearGradient id="mi-cross-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe48a" />
          <stop offset="0.5" stopColor="#f2b631" />
          <stop offset="1" stopColor="#b9801a" />
        </linearGradient>
        <linearGradient id="mi-cross-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="mi-cross-gem" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.45" stopColor="#ffd966" />
          <stop offset="1" stopColor="#c9851a" />
        </radialGradient>
      </defs>

      <circle className="mi-halo" cx="32" cy="22" r="30" fill="url(#mi-cross-glow)" />
      <circle className="mi-ring" cx="32" cy="22" r="12" />
      <circle className="mi-ring mi-ring--2" cx="32" cy="22" r="12" />

      <g className="mi-rays">
        {rays.map((a) => (
          <line key={a} x1="32" y1="1.5" x2="32" y2="-3.5" transform={`rotate(${a} 32 22)`} />
        ))}
      </g>

      {/* stepped base */}
      <g className="mi-steps">
        <rect x="21" y="52" width="22" height="3.6" rx="0.8" />
        <rect x="16" y="55.6" width="32" height="3.6" rx="0.8" />
        <rect x="11" y="59.2" width="42" height="3.6" rx="0.8" />
      </g>

      <g className="mi-crossbody">
        <path className="mi-cross-base" d={CROSS} />
        <path className="mi-cross-goldfill" d={CROSS} />
        {/* bevel highlight + wood grain */}
        <path className="mi-bevel" d="M29.3 11 L29.3 46 M19 18.9 L28.2 18.9 M36.7 18.9 L48 18.9" />
        <path className="mi-grain" d="M30.6 12 L30.6 45 M33.4 12 L33.4 45 M20 20.2 L44 20.2 M20 22.8 L44 22.8" />
        <circle className="mi-gem" cx="32" cy="21.5" r="2.7" />
      </g>

      <Sparkle x={11} y={9} d={0} />
      <Sparkle x={54} y={11} d={0.4} />
      <Sparkle x={53} y={44} d={0.8} />
    </svg>
  )
}
