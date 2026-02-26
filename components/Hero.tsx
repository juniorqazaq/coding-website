import React from 'react';
import { Link } from 'react-router-dom';

/* ══════════════════════════════════════════════════
   REAL LANGUAGE SVG ICONS
══════════════════════════════════════════════════ */
const PythonSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <path d="M24 4C18.5 4 15 6.5 15 10v4h9v2H12C7.5 16 4 19 4 24s3.5 8 8 8h3v-5c0-4.5 3.5-7 8-7h10c4 0 6-2 6-6V10c0-4-3-6-8-6H24z" fill="#3776ab" />
        <circle cx="19" cy="11" r="2" fill="#fff" />
        <path d="M24 44C29.5 44 33 41.5 33 38v-4h-9v-2h12c4.5 0 8-3 8-8s-3.5-8-8-8h-3v5c0 4.5-3.5 7-8 7H15c-4 0-6 2-6 6v6c0 4 3 6 8 6h7z" fill="#ffd343" />
        <circle cx="29" cy="37" r="2" fill="#fff" />
    </svg>
);
const ReactSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <circle cx="24" cy="24" r="4" fill="#61dafb" />
        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#61dafb" strokeWidth="1.8" fill="none" />
        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#61dafb" strokeWidth="1.8" fill="none" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#61dafb" strokeWidth="1.8" fill="none" transform="rotate(120 24 24)" />
    </svg>
);
const TSSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <rect width="48" height="48" rx="5" fill="#3178c6" />
        <path d="M20 22H12V19h21v3h-8v17h-5V22z" fill="#fff" />
        <path d="M31 35.5c0 1 .8 1.7 2 1.7 1 0 1.7-.5 1.7-1.4 0-.9-.6-1.4-2-1.9-2-.7-3.2-1.6-3.2-3.4 0-2 1.6-3.3 4-3.3 2.6 0 4.1 1.4 4.1 3.3h-2.6c0-1-.7-1.6-1.6-1.6-.9 0-1.4.5-1.4 1.2 0 .8.6 1.2 2 1.7 2.1.7 3.2 1.7 3.2 3.6 0 2.1-1.6 3.4-4.2 3.4-2.7 0-4.4-1.4-4.4-3.7H31z" fill="#fff" />
    </svg>
);
const JSSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <rect width="48" height="48" rx="4" fill="#f7df1e" />
        <path d="M15 36l3.5-2.1c.7 1.3 1.3 2.4 2.8 2.4 1.4 0 2.3-.5 2.3-2.6V21h4.3v12.8c0 4.3-2.5 6.2-6.2 6.2-3.3 0-5.2-1.7-6.2-3.8zm14-1l3.5-2c.9 1.6 2 2.7 4.1 2.7 1.7 0 2.8-.85 2.8-2 0-1.4-1.1-1.9-3-2.7l-1-.4c-3-1.3-5-2.9-5-6.3 0-3.1 2.4-5.5 6.1-5.5 2.6 0 4.5 1 5.8 3.2l-3.2 2c-.7-1.3-1.5-1.8-2.6-1.8-1.2 0-2 .75-2 1.8 0 1.3.8 1.8 2.6 2.6l1 .4c3.5 1.5 5.5 3 5.5 6.5 0 3.7-2.9 5.8-6.8 5.8-3.8 0-6.3-1.8-7.5-4.3z" fill="#333" />
    </svg>
);
const NodeSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <path d="M24 3L4 14.5v19L24 45l20-11.5v-19L24 3z" fill="#3d8739" />
        <path d="M24 11l10 5.8v11.4L24 34l-10-5.8V16.8L24 11z" fill="#5ab142" />
        <text x="24" y="27" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="900" fontFamily="monospace">NODE</text>
    </svg>
);
const CSSSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <path d="M6 4l3.5 39L24 47l14.5-4L42 4H6z" fill="#264de4" />
        <path d="M24 43.5l11.7-3.2L38.6 7H24v36.5z" fill="#2965f1" />
        <path d="M24 21h-5.8l-.4-4.5H24V12H13.6l.3 3.5 5.8 5.5H24V21zm0 3h-7.3l.6 6.5 6.7 1.8V28l-3.7-1-.3-3H24z" fill="#fff" />
        <path d="M24 21v5h4.3l-.4 4.5-3.9 1v4.5l7-1.9.7-8.1H24z" fill="#ebebeb" />
    </svg>
);
const HTMLSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <path d="M6 4l3.5 39L24 47l14.5-4L42 4H6z" fill="#e34f26" />
        <path d="M24 43.5l11.7-3.2L38.6 7H24v36.5z" fill="#ef652a" />
        <path d="M24 21h-5.4l-.3-3.8H24V13H13.5l.3 2.7.3 5.3h9.9V21zm0 11.4l-.1.1-4-1.1-.3-2.8H15l.5 6L24 37v-4.6z" fill="#fff" />
        <path d="M24 17.2v3.8h5l-.5 5.5-4.5 1.2v3.8l8.2-2.3 1.1-12z" fill="#ebebeb" />
    </svg>
);
const GoSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <rect width="48" height="48" rx="6" fill="#00ACD7" />
        <text x="24" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" fontFamily="monospace">Go</text>
    </svg>
);
const RustSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <rect width="48" height="48" rx="6" fill="#ce412b" />
        <text x="24" y="31" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" fontFamily="monospace">Rust</text>
    </svg>
);
const DockerSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <rect width="48" height="48" rx="6" fill="#0db7ed" />
        <path d="M8 24h5v5H8v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zM14 18h5v5h-5v-5zm6 0h5v5h-5v-5zm6 0h5v5h-5v-5zm6 2c.5-3 2-4 3.5-4 3 0 4.5 2 4.5 5H38z" fill="#fff" />
        <ellipse cx="13" cy="16" rx="2" ry="2" fill="#fff" />
    </svg>
);
const GitSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <rect width="48" height="48" rx="6" fill="#F05032" />
        <path d="M44 22.6L25.4 4a2.57 2.57 0 0 0-3.63 0l-3.62 3.62 4.6 4.6a3.04 3.04 0 0 1 3.84 3.87l4.43 4.43a3.04 3.04 0 1 1-1.82 1.82L25 17.66v10.28a3.04 3.04 0 1 1-2.5.07V17.4a3.04 3.04 0 0 1-1.65-3.99l-4.53-4.53L4 21.37a2.57 2.57 0 0 0 0 3.63l18.6 18.6a2.57 2.57 0 0 0 3.63 0L44 26.23a2.57 2.57 0 0 0 0-3.63z" fill="#fff" />
    </svg>
);
const SwiftSVG = () => (
    <svg viewBox="0 0 48 48" width="30" height="30">
        <rect width="48" height="48" rx="10" fill="#F05138" />
        <path d="M8 35c8-4 12-10 12-20 0 0 7 7 7 15 0 0 4-3 6-8 0 6-4 14-12 18H8z" fill="#fff" />
    </svg>
);

/* ══════════════════════════════════════════════════
   REAL PARTNER LOGOS (SVG)
══════════════════════════════════════════════════ */
const GoogleLogo = () => (
    <svg viewBox="0 0 120 40" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.4 20.6c0 5.5-4.3 9.5-9.5 9.5s-9.5-4-9.5-9.5 4.3-9.5 9.5-9.5 9.5 4 9.5 9.5zm-4.2 0c0-3.4-2.5-5.8-5.3-5.8s-5.3 2.3-5.3 5.8 2.5 5.8 5.3 5.8 5.3-2.4 5.3-5.8z" fill="#EA4335" />
        <path d="M68.4 20.6c0 5.5-4.3 9.5-9.5 9.5s-9.5-4-9.5-9.5 4.3-9.5 9.5-9.5 9.5 4 9.5 9.5zm-4.2 0c0-3.4-2.5-5.8-5.3-5.8s-5.3 2.3-5.3 5.8 2.5 5.8 5.3 5.8 5.3-2.4 5.3-5.8z" fill="#FBBC05" />
        <path d="M86.6 11.7v17c0 7-4.1 9.8-9 9.8-4.6 0-7.3-3.1-8.4-5.6l3.7-1.5c.6 1.5 2.2 3.3 4.6 3.3 3 0 4.9-1.9 4.9-5.4v-1.3h-.1c-.9 1.1-2.6 2-4.8 2-4.5 0-8.7-4-8.7-9.1 0-5.2 4.2-9.2 8.7-9.2 2.2 0 3.9.9 4.8 2h.1v-1.4h3.9l.3-.6zm-3.6 9c0-3.2-2.1-5.6-4.9-5.6-2.7 0-5 2.3-5 5.6 0 3.2 2.3 5.5 5 5.5 2.7 0 4.9-2.3 4.9-5.5z" fill="#4285F4" />
        <path d="M92 2v27.7h-4V2h4z" fill="#34A853" />
        <path d="M107.6 24.1l3.2 2.1c-1 1.5-3.5 4-7.8 4-5.3 0-9.3-4.1-9.3-9.5 0-5.7 4-9.5 8.8-9.5 4.9 0 7.3 3.9 8.1 6l.4 1.1-12.5 5.2c1 1.9 2.5 2.9 4.6 2.9 2.2 0 3.7-1.1 4.5-2.3zm-9.8-3.4 8.4-3.5c-.5-1.2-1.9-2-3.5-2-2.1 0-5 1.8-4.9 5.5z" fill="#EA4335" />
        <path d="M14.4 17.8v-4h13.4c.1.7.2 1.5.2 2.3 0 2.9-.8 6.5-3.3 9s-5.8 3.9-10.3 3.9C6.8 29 1 23.4 1 15.7S6.8 2.4 14.4 2.4c4.6 0 7.8 1.8 10.3 4.1l-2.9 2.9c-1.8-1.6-4.1-2.9-7.4-2.9-6 0-10.7 4.9-10.7 10.9s4.7 10.9 10.7 10.9c3.9 0 6.1-1.6 7.5-3 1.2-1.2 1.9-2.9 2.2-5.2l-9.7-.3z" fill="#4285F4" />
    </svg>
);
const MetaLogo = () => (
    <svg viewBox="0 0 200 44" height="28" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="mg1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0064E0" />
                <stop offset="100%" stopColor="#0082FB" />
            </linearGradient>
        </defs>
        <path d="M6 22c0-8 3.5-16 9-16 3 0 5.5 1.5 8 5l2.5 4L28 10c2.5-3.5 5-4 7-4 6 0 9 9 9 16 0 5-1.5 8-4 8-2 0-3.5-1.5-6-5l-3-4.5-3 4.5c-2.5 3.5-4 5-6 5-2.5 0-4-3-4-3" stroke="url(#mg1)" strokeWidth="7" fill="none" strokeLinecap="round" />
        <text x="58" y="31" fill="#fff" fontSize="22" fontWeight="800" fontFamily="'Unbounded',sans-serif" letterSpacing="-1">meta</text>
    </svg>
);
const AmazonLogo = () => (
    <svg viewBox="0 0 120 40" height="28" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" fill="#fff" fontSize="28" fontWeight="900" fontFamily="Arial,sans-serif">amazon</text>
        <path d="M5 32 Q30 40 55 35" stroke="#FF9900" strokeWidth="2.5" fill="none" />
        <path d="M55 35l-4-2 1.5 3.5L55 35z" fill="#FF9900" />
    </svg>
);
const CourseraLogo = () => (
    <svg viewBox="0 0 140 40" height="28" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="16" fill="#0056D2" />
        <text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900" fontFamily="Arial">C</text>
        <text x="45" y="27" fill="#fff" fontSize="18" fontWeight="700" fontFamily="Arial">Coursera</text>
    </svg>
);
const KaspiLogo = () => (
    <svg viewBox="0 0 120 40" height="28" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="40" rx="6" fill="#E94560" />
        <text x="60" y="27" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" fontFamily="Arial">kaspi.kz</text>
    </svg>
);
const GitHubLogo = () => (
    <svg viewBox="0 0 24 24" height="26" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .5C5.37.5.5 5.37.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a11 11 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.37 18.62.5 12 .5z" />
    </svg>
);

/* ══════════════════════════════════════════════════
   FLOATING BADGE COMPONENT
══════════════════════════════════════════════════ */
interface BProps { icon: React.ReactNode; label: string; s: React.CSSProperties; d?: number; }
const FB: React.FC<BProps> = ({ icon, label, s, d = 0 }) => (
    <div className="t-float-badge" style={{ ...s, animationDelay: `${d}s` }}>
        <div className="t-float-icon">{icon}</div>
        <span className="t-float-label">{label}</span>
    </div>
);

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
const Hero: React.FC = () => (
    <section className="t-hero-v2">
        {/* ── 12 floating badges ── */}
        <FB icon={<PythonSVG />} label="Python" s={{ top: '14%', left: '4%' }} d={0} />
        <FB icon={<HTMLSVG />} label="HTML 5" s={{ top: '28%', left: '1%' }} d={0.5} />
        <FB icon={<CSSSVG />} label="CSS 3" s={{ bottom: '32%', left: '4%' }} d={1.0} />
        <FB icon={<GoSVG />} label="Go" s={{ bottom: '16%', left: '18%' }} d={1.5} />
        <FB icon={<JSSVG />} label="JavaScript" s={{ top: '10%', left: '20%' }} d={0.3} />
        <FB icon={<ReactSVG />} label="React" s={{ top: '10%', right: '20%' }} d={0.7} />
        <FB icon={<TSSVG />} label="TypeScript" s={{ top: '14%', right: '4%' }} d={0.2} />
        <FB icon={<NodeSVG />} label="Node.js" s={{ top: '30%', right: '1%' }} d={0.9} />
        <FB icon={<DockerSVG />} label="Docker" s={{ bottom: '32%', right: '4%' }} d={1.3} />
        <FB icon={<GitSVG />} label="Git" s={{ bottom: '16%', right: '18%' }} d={0.6} />
        <FB icon={<RustSVG />} label="Rust" s={{ bottom: '48%', left: '1%' }} d={1.1} />
        <FB icon={<SwiftSVG />} label="Swift" s={{ bottom: '48%', right: '1%' }} d={0.4} />

        {/* ── Center content ── */}
        <div className="t-hero-v2-center">
            <div className="t-hero-v2-badge">
                <span className="t-badge-dot" />
                Платформа №1 в Казахстане
            </div>

            <h1 className="t-hero-v2-title">
                Научись <span className="t-hl-violet">кодить</span>
                <br />свои мечты и
                <br />создай <span className="t-hl-box">будущее</span>
            </h1>

            <p className="t-hero-v2-sub">
                От первой строки кода до системной архитектуры.<br />
                AI-ментор, облачная IDE и реальные проекты.
            </p>

            <div className="t-hero-v2-cta">
                <Link to="/register" className="t-btn-primary">Начать бесплатно</Link>
                <Link to="/courses" className="t-btn-ghost">Смотреть курсы</Link>
            </div>

            <div className="t-hero-v2-stats">
                <div className="t-hvs"><span className="t-hvs-n">12 000+</span><span className="t-hvs-l">Студентов</span></div>
                <div className="t-hvs-sep" />
                <div className="t-hvs"><span className="t-hvs-n">150+</span><span className="t-hvs-l">Уроков</span></div>
                <div className="t-hvs-sep" />
                <div className="t-hvs"><span className="t-hvs-n">98%</span><span className="t-hvs-l">Трудоустройство</span></div>
            </div>
        </div>

        {/* ── Partners strip with real logos ── */}
        <div className="t-partners-strip">
            <div className="t-partners-label">Наши партнёры</div>
            <div className="t-partners-row">
                <GoogleLogo />
                <MetaLogo />
                <AmazonLogo />
                <CourseraLogo />
                <KaspiLogo />
                <GitHubLogo />
            </div>
        </div>
    </section>
);

export default Hero;
