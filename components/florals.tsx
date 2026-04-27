"use client";

/** Watercolor-style floral SVGs in navy blue + white/gray palette. */

export function FloralTopRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="tr-a" cx="50%" cy="45%" r="50%"><stop offset="0%" stopColor="#0D1F3C" stopOpacity="0.2" /><stop offset="100%" stopColor="#0D1F3C" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="tr-b" cx="45%" cy="50%" r="50%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.18" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="tr-c" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7A8A9E" stopOpacity="0.2" /><stop offset="100%" stopColor="#7A8A9E" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="tr-l" cx="30%" cy="50%" r="65%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.15" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
      </defs>
      <ellipse cx="320" cy="40" rx="80" ry="16" transform="rotate(-40 320 40)" fill="url(#tr-l)" />
      <ellipse cx="360" cy="130" rx="65" ry="14" transform="rotate(-60 360 130)" fill="url(#tr-l)" />
      <ellipse cx="250" cy="20" rx="60" ry="12" transform="rotate(-15 250 20)" fill="url(#tr-l)" />
      <ellipse cx="200" cy="80" rx="45" ry="10" transform="rotate(10 200 80)" fill="url(#tr-l)" />
      <circle cx="300" cy="110" r="70" fill="url(#tr-a)" />
      <ellipse cx="290" cy="100" rx="50" ry="45" transform="rotate(-15 290 100)" fill="url(#tr-c)" />
      <circle cx="300" cy="108" r="22" fill="#0D1F3C" fillOpacity="0.08" />
      <circle cx="210" cy="60" r="45" fill="url(#tr-b)" />
      <circle cx="212" cy="58" r="14" fill="#3D5068" fillOpacity="0.1" />
      <circle cx="360" cy="180" r="28" fill="url(#tr-a)" />
      <circle cx="250" cy="170" r="18" fill="url(#tr-c)" />
      <circle cx="340" cy="280" r="22" fill="url(#tr-b)" />
      <circle cx="180" cy="130" r="8" fill="#0D1F3C" fillOpacity="0.08" />
      <circle cx="370" cy="60" r="6" fill="#3D5068" fillOpacity="0.1" />
      <ellipse cx="170" cy="110" rx="40" ry="9" transform="rotate(25 170 110)" fill="url(#tr-l)" />
      <ellipse cx="330" cy="250" rx="35" ry="8" transform="rotate(-30 330 250)" fill="url(#tr-l)" />
    </svg>
  );
}

export function FloralBottomLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="bl-a" cx="50%" cy="55%" r="50%"><stop offset="0%" stopColor="#0D1F3C" stopOpacity="0.18" /><stop offset="100%" stopColor="#0D1F3C" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="bl-b" cx="55%" cy="50%" r="50%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.16" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="bl-c" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7A8A9E" stopOpacity="0.18" /><stop offset="100%" stopColor="#7A8A9E" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="bl-l" cx="60%" cy="50%" r="60%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.14" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
      </defs>
      <ellipse cx="80" cy="400" rx="75" ry="16" transform="rotate(35 80 400)" fill="url(#bl-l)" />
      <ellipse cx="40" cy="320" rx="60" ry="13" transform="rotate(55 40 320)" fill="url(#bl-l)" />
      <ellipse cx="150" cy="430" rx="55" ry="12" transform="rotate(10 150 430)" fill="url(#bl-l)" />
      <circle cx="100" cy="350" r="65" fill="url(#bl-a)" />
      <ellipse cx="110" cy="340" rx="48" ry="42" transform="rotate(15 110 340)" fill="url(#bl-c)" />
      <circle cx="100" cy="348" r="20" fill="#0D1F3C" fillOpacity="0.07" />
      <circle cx="180" cy="390" r="40" fill="url(#bl-b)" />
      <circle cx="50" cy="270" r="35" fill="url(#bl-c)" />
      <circle cx="200" cy="310" r="20" fill="url(#bl-a)" />
      <circle cx="30" cy="410" r="15" fill="url(#bl-b)" />
      <circle cx="140" cy="290" r="7" fill="#0D1F3C" fillOpacity="0.06" />
      <ellipse cx="220" cy="340" rx="38" ry="8" transform="rotate(-25 220 340)" fill="url(#bl-l)" />
    </svg>
  );
}

export function FloralSideLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="sl-a" cx="60%" cy="50%" r="50%"><stop offset="0%" stopColor="#0D1F3C" stopOpacity="0.15" /><stop offset="100%" stopColor="#0D1F3C" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="sl-l" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.12" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
      </defs>
      <ellipse cx="20" cy="100" rx="50" ry="12" transform="rotate(70 20 100)" fill="url(#sl-l)" />
      <circle cx="40" cy="150" r="30" fill="url(#sl-a)" />
      <ellipse cx="10" cy="220" rx="40" ry="10" transform="rotate(80 10 220)" fill="url(#sl-l)" />
      <circle cx="30" cy="280" r="22" fill="url(#sl-a)" />
      <ellipse cx="15" cy="350" rx="45" ry="10" transform="rotate(60 15 350)" fill="url(#sl-l)" />
      <circle cx="45" cy="400" r="25" fill="url(#sl-a)" />
    </svg>
  );
}

export function FloralSideRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="sr-a" cx="40%" cy="50%" r="50%"><stop offset="0%" stopColor="#0D1F3C" stopOpacity="0.15" /><stop offset="100%" stopColor="#0D1F3C" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="sr-l" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.12" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
      </defs>
      <ellipse cx="160" cy="80" rx="50" ry="12" transform="rotate(-70 160 80)" fill="url(#sr-l)" />
      <circle cx="140" cy="130" r="28" fill="url(#sr-a)" />
      <ellipse cx="170" cy="200" rx="40" ry="10" transform="rotate(-80 170 200)" fill="url(#sr-l)" />
      <circle cx="150" cy="260" r="24" fill="url(#sr-a)" />
      <ellipse cx="165" cy="330" rx="45" ry="10" transform="rotate(-60 165 330)" fill="url(#sr-l)" />
      <circle cx="135" cy="380" r="22" fill="url(#sr-a)" />
    </svg>
  );
}

export function FloralSmallAccent({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="sa-a" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0D1F3C" stopOpacity="0.15" /><stop offset="100%" stopColor="#0D1F3C" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="sa-b" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7A8A9E" stopOpacity="0.15" /><stop offset="100%" stopColor="#7A8A9E" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="sa-l" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.12" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
      </defs>
      <ellipse cx="25" cy="85" rx="35" ry="9" transform="rotate(-20 25 85)" fill="url(#sa-l)" />
      <ellipse cx="110" cy="55" rx="32" ry="8" transform="rotate(25 110 55)" fill="url(#sa-l)" />
      <circle cx="70" cy="65" r="35" fill="url(#sa-a)" />
      <ellipse cx="68" cy="62" rx="24" ry="20" transform="rotate(-10 68 62)" fill="url(#sa-b)" />
      <circle cx="70" cy="64" r="12" fill="#0D1F3C" fillOpacity="0.06" />
      <circle cx="40" cy="100" r="14" fill="url(#sa-b)" />
      <circle cx="100" cy="90" r="10" fill="url(#sa-a)" />
    </svg>
  );
}

export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="fd-a" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0D1F3C" stopOpacity="0.15" /><stop offset="100%" stopColor="#0D1F3C" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="fd-b" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7A8A9E" stopOpacity="0.12" /><stop offset="100%" stopColor="#7A8A9E" stopOpacity="0.02" /></radialGradient>
        <radialGradient id="fd-l" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#3D5068" stopOpacity="0.1" /><stop offset="100%" stopColor="#3D5068" stopOpacity="0.02" /></radialGradient>
      </defs>
      <line x1="60" y1="25" x2="340" y2="25" stroke="#D0D6E0" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="200" cy="25" r="16" fill="url(#fd-a)" />
      <circle cx="201" cy="24" r="7" fill="#0D1F3C" fillOpacity="0.08" />
      <circle cx="145" cy="23" r="9" fill="url(#fd-b)" />
      <circle cx="255" cy="23" r="9" fill="url(#fd-b)" />
      <ellipse cx="120" cy="25" rx="25" ry="7" transform="rotate(-8 120 25)" fill="url(#fd-l)" />
      <ellipse cx="280" cy="25" rx="25" ry="7" transform="rotate(8 280 25)" fill="url(#fd-l)" />
    </svg>
  );
}
