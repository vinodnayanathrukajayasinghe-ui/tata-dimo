// lucide-react v1 dropped brand/logo glyphs, so these are small inline SVGs instead.
type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C16.9 3 12 3 12 3h-.01s-4.9 0-8.2.14c-.46.05-1.46.06-2.36 1C.73 4.86.5 6.5.5 6.5S.25 8.43.25 10.37v1.27c0 1.94.25 3.87.25 3.87s.23 1.64.93 2.36c.9.94 2.08.91 2.6 1.01 1.89.18 8 .14 8 .14s4.9-.01 8.2-.15c.46-.06 1.46-.07 2.36-1.01.71-.72.94-2.36.94-2.36s.25-1.93.25-3.87v-1.27c0-1.94-.25-3.87-.25-3.87ZM9.6 14.97V8.93l6 3.02-6 3.02Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
