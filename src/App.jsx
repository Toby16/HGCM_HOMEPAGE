import { useEffect, useRef, useState } from 'react'
import logo from './assets/hgcm_logo_padded2.png'
import pastor from './assets/pastor.png'
import cross from './assets/cross.png'
import bartholomew from './assets/bartholomew_full.jpg'
import worship from './assets/worship.jpg'
import banner from './assets/worship_banner.jpg'
import wingsVideo from './assets/under_his_wings.mp4'
import wingsPoster from './assets/under_his_wings_poster.jpg'
import { DoveIcon, BibleIcon, CrossIcon } from './MinistryIcons.jsx'
import './App.css'

/* Items with `children` are NOT links: they only open / close their list (hover or click on desktop,
   tap on mobile). Everything else, and every item inside a list, is a normal link. Page paths (/live,
   /leadership, /about, /ministries/..., etc.) are ready for when those pages exist. */
const NAV = [
  { href: '/', label: 'Home' },
  { href: '/live', label: 'Live' }, /*calender and to watch live services on the site instead of youtube*/
  {
    label: 'Ministries', /* services dates and info, homecell infos and details, and maps directions */
    children: [
      { href: '/ministries/house-fellowship', label: 'House Fellowship' },
      { href: '/ministries/men', label: 'Men' },
      { href: '/ministries/women', label: 'Women' },
      { href: '/ministries/world-changers', label: 'World-Changers' },
      { href: '/ministries/disciples', label: 'Disciples' },
      { href: '/ministries/others', label: 'Others' },
    ],
  },
  { href: '/leadership', label: 'Leadership' }, /*about pastor Osemeke, his wife, pastor batholomew, mr peter, only pastors etc*/
  {
    label: 'Workers', /* other workers */
    children: [
      { href: '/workers/choir', label: 'Choir' },
      { href: '/workers/technical', label: 'Technical' },
      { href: '/workers/children', label: 'Children' },
      { href: '/workers/usher', label: 'Usher' },
      { href: '/workers/cleaning', label: 'Cleaning' },
      { href: '/workers/others', label: 'Others' },
    ],
  },
  {
    label: 'Services', /* offerings, tithes, thanksgiving, donations, extras */
    children: [
      { href: '/services/thanksgiving', label: 'Thanksgiving' },
      { href: '/services/tithe', label: 'Tithes' },
      { href: '/services/offering', label: 'Offerings' },
      { href: '/services/donations', label: 'Donations' },
      { href: '/services/extras', label: 'Extras' },
    ],
  },
  { href: '/about', label: 'About HGCM' }, /* about HGCM, mission statement, contacts, socialmedia, etc*/
]


const SERVICES = [
  { label: 'Sunday', title: 'Worship Service & Thanksgiving', when: '9:00 AM - 12:00 PM' },
  { label: 'Tuesday', title: 'Prayer Meeting & Deliverance', when: '6:00 PM - 7:00 PM' },
  { label: 'Wednesday', title: 'Bible Study & Holy Communion', when: '6:00 PM - 8:00 PM' },
]

const MINISTRIES = [
  {
    Icon: DoveIcon,
    title: 'Healing & Deliverance',
    text: 'A safe place to be prayed for, encouraged and restored by the presence of the Holy Spirit.',
  },
  {
    Icon: BibleIcon,
    title: 'Word & Teaching',
    text: 'Real practical teachings of the Scripture that helps you grow and walk in divine purpose.',
  },
  {
    Icon: CrossIcon,
    title: 'Prayer Altar',
    text: 'Join us as we stand in the gap for families, nations and every need laid before God Almighty.',
  },
]

const LEADERS = [
  {
    photo: pastor,
    curtain: true,
    alt: 'Lead Pastor Osemeke Nwaose',
    role: 'Lead Pastor & G.O.',
    name: 'Osemeke Nwaose',
    text: 'The General Overseer of Holy Ghost Comforting Ministry, leading the family in the love and presence of the Holy Spirit.',
  },
  {
    photo: bartholomew,
    alt: 'Senior Pastor Bartholomew Awuru',
    w: 1536,
    h: 1024,
    role: 'Senior Pastor',
    name: 'Bartholomew Awuru',
    text: 'An anointed senior pastor in HGCM followed by grace to serve the Lord and the HGCM family with faithfulness and fire.',
  },
]

const SOCIALS = [
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/pstosemeke/', external: true },
  { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@holyghostcomfortingministry', external: true },
  { key: 'mail', label: 'Email: info@hgcm.org', href: 'mailto:info@hgcm.org', external: false },
]

/* Remembers the visitor's choice; first visit follows their device (light / dark). */
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('hgcm-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch (e) { /* storage blocked – ignore */ }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/* "Under His Wings" looping video (silent, autoplay). Paused for people who prefer reduced motion. */
function WingsVideo() {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true // React does not always write the muted attribute, and autoplay needs it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      return
    }
    const p = v.play()
    if (p && p.catch) p.catch(() => {}) // if a browser still blocks it, the poster image stays
  }, [])

  return (
    <video
      ref={ref}
      className="wings__video"
      src={wingsVideo}
      poster={wingsPoster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}

/* On touch screens there is no hover, so the icon animates while its card is on screen. */
function MinistryCard({ m }) {
  const ref = useRef(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: none)').matches || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Icon = m.Icon
  return (
    <article className={`card${live ? ' is-live' : ''}`} ref={ref}>
      <div className="card__icon">
        <Icon />
      </div>
      <h3>{m.title}</h3>
      <p>{m.text}</p>
    </article>
  )
}

function App() {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState(null) // which dropdown is expanded in the mobile menu
  const close = () => { setOpen(false); setSub(null) }

  // desktop: a mouse resting on a dropdown word opens it, leaving closes it (touch uses taps only)
  const canHover = (e) => e.pointerType === 'mouse' && window.matchMedia('(min-width: 861px)').matches
  const hoverOpen = (e, label) => { if (canHover(e)) setSub(label) }
  const hoverClose = (e, label) => { if (canHover(e)) setSub((cur) => (cur === label ? null : cur)) }

  // an open list also closes when you click / tap elsewhere, or press Escape
  useEffect(() => {
    if (!sub) return
    const onDown = (e) => { if (!e.target.closest('.nav__item--has-menu')) setSub(null) }
    const onKey = (e) => { if (e.key === 'Escape') setSub(null) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [sub])
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('hgcm-theme', theme) } catch (e) { /* ignore */ }
  }, [theme])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container header__inner">
          <a href="#home" className="brand" onClick={close}>
            <img src={logo} alt="HGCM logo" className="brand__logo" />
            <span className="brand__text">
              <span className="brand__sub">Holy Ghost</span>
              <span className="brand__sub">Comforting Ministry</span>
            </span>
          </a>

          <nav className={`nav ${open ? 'is-open' : ''}`}>
            {NAV.map((n) =>
              n.children ? (
                <div
                  key={n.label}
                  className={`nav__item nav__item--has-menu${sub === n.label ? ' is-open' : ''}`}
                  onPointerEnter={(e) => hoverOpen(e, n.label)}
                  onPointerLeave={(e) => hoverClose(e, n.label)}
                >
                  <button
                    type="button"
                    className="nav__link nav__link--parent"
                    aria-haspopup="true"
                    aria-expanded={sub === n.label}
                    onClick={() => setSub(sub === n.label ? null : n.label)}
                  >
                    {n.label}
                  </button>
                  <div className="nav__menu">
                    <ul className="nav__list">
                      {n.children.map((c) => (
                        <li key={c.href}>
                          <a href={c.href} onClick={close}>
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div key={n.label} className="nav__item">
                  <a href={n.href} className="nav__link" onClick={close}>
                    {n.label}
                  </a>
                </div>
              )
            )}
          </nav>

          <div className="header__tools">
            <button
              type="button"
              className="theme-btn"
              aria-label={`Switch to ${nextTheme} mode`}
              title={`Switch to ${nextTheme} mode`}
              onClick={() => setTheme(nextTheme)}
            >
              <span className="theme-btn__icon" aria-hidden="true" />
            </button>
            <button
              className="menu-btn"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="hero">
          <div className="container hero__grid">
            <div>
              <span className="eyebrow">Welcome to HGCM</span>
              <h1>
                Where the Holy Ghost brings <em>comfort</em>, hope and healing.
              </h1>
              <p className="hero__lead">
                We are a Spirit-led family that practices <b>Love</b> and expresses <b>Joy</b> through our Lord and personal savior, <b>Jesus Christ</b>.</p>
	      <p className="hero__lead2">
	  	Come as you are to find rest for your soul, and you will encounter the presence of <b>God</b> through the <b>Holy Spirit</b>.
              </p>
              <div className="hero__cta">
                <a href="#live" className="btn btn--primary">
                  Join Us This Sunday
                </a>
              </div>
              <blockquote className="hero__verse">
                “I will pray the Father, and he shall give you another Comforter.”
                <span>John 14:16</span>
              </blockquote>
            </div>

            <div className="hero__art">
              <figure className="hero__frame">
                <img
                  src={worship}
                  alt="A member of HGCM worshipping with raised hands"
                  className="hero__photo"
                />
                <figcaption className="hero__caption">
                  <strong>Come as you are</strong>
                  <span>Worship with us</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Service times */}
        <section id="services" className="times">
          <div className="container">
            <div className="times__card">
              {SERVICES.map((s) => (
                <div className="time" key={s.title}>
                  <div className="time__label">{s.label}</div>
                  <div className="time__title">{s.title}</div>
                  <div className="time__when">{s.when}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ministries */}
        <section id="ministries" className="section">
          <div className="container">
            <div className="section__head">
              <span className="eyebrow">What we do</span>
              <h2>A place to belong, believe and be restored</h2>
              <p>Everything we do comes directly from the Comforter, the Holy Spirit.</p>
            </div>
            <div className="cards">
              {MINISTRIES.map((m) => (
                <MinistryCard m={m} key={m.title} />
              ))}
            </div>
          </div>
        </section>

        {/* Under His Wings – looping video */}
        <section className="strip" aria-label="Under His wings">
          <div className="container">
            <figure className="wings">
              <WingsVideo />
              <figcaption className="wings__text">
                <span className="wings__eyebrow">Psalm 91:4</span>
                <span className="wings__title">Under His Wings.<br />Peace in His Presence.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="section">
          <div className="container">
            <div className="section__head">
              <span className="eyebrow">HGCM leadership</span>
              <h2>Shepherds who serve with love</h2>
              <p>Meet the spirit-filled messengers, whom God has placed over this ministry.</p>
            </div>
            <div className="leaders">
              {LEADERS.map((l) => (
                <article className="leader" key={l.name}>
                  <img src={l.photo} alt={l.alt} width={l.w} height={l.h} className={`leader__photo${l.curtain ? ' leader__photo--curtain' : ''}`} />
                  <div className="leader__body">
                    <span className="leader__role">{l.role}</span>
                    <h3>{l.name}</h3>
                    <p>{l.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Worship banner */}
        <section className="strip" aria-label="Worship at HGCM">
          <div className="container">
            <figure className="banner">
              <img src={banner} alt="Members of HGCM in worship and prayer" className="banner__img" />
              <figcaption className="banner__text">
                <span className="banner__eyebrow">Worship with us</span>
                <span className="banner__title">Hearts lifted.<br />Lives restored.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <div className="container about">
            <div className="about__panel">
              <img src={cross} alt="Cross" className="about__cross" />
              <q>My help cometh from the Lord, which made heaven and earth.</q>
	  <br />
	  <i><small><b>Psalm 121:2 (NIV)</b></small></i>
            </div>
            <div className="about__text">
              <span className="eyebrow">About us</span>
              <h2>Rooted in the Spirit, built on love</h2>
	      <p>
	  	<b>Headquarters: </b>1C Omawunmi Street, Boundary Estate, by NNPC Filling Station, Majek 2nd Gate, Lekki-Epe Expressway, Lagos, Nigeria.
	      </p>
	      <p><b>Bringing The World To The Light By Spreading And Sharing God's True Word Under The Guidance Of The Holy Ghost ✝</b>
	      </p>
              <p>
                HGCM exists to point people to the Holy Spirit, the Comforter, who heals the broken-hearted and strengthens the weary.
              </p>
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section id="contact" className="cta">
          <div className="container">
            <h2>You are always welcome here</h2>
            <p>
              Have a prayer request or want to know more? Reach out and we will be
              glad to hear from you.
            </p>
            <a href="mailto:info@hgcm.org" className="btn btn--light">
              Send a Prayer Request
            </a>
	    <a href="#enquiry" className="btn btn--light">
	      Make an Enquiry
	   </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span className="footer__copy">© {new Date().getFullYear()} Holy Ghost Comforting Ministry</span>
          <div className="socials">
            {SOCIALS.map((s) => (
              <a
                key={s.key}
                href={s.href}
                className={`social social--${s.key}`}
                aria-label={s.label}
                title={s.label}
                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="social__icon" aria-hidden="true" />
              </a>
            ))}
          </div>
          <span className="footer__tag">Comforting hearts. Restoring lives.</span>
        </div>
      </footer>
    </>
  )
}

export default App
