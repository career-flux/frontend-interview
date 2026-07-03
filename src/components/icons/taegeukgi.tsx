export function TaegeukgiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Taegeukgi Icon</title>

      <path
        d="M 1.5 12 A 10.5 10.5 0 0 1 22.5 12 A 5.25 2.5 0 0 0 12 12 A 5.25 2.5 0 0 1 1.5 12 Z"
        fill="#EC252C"
      />

      <path
        d="M 22.5 12 A 10.5 10.5 0 0 1 1.5 12 A 5.25 2.5 0 0 0 12 12 A 5.25 2.5 0 0 1 22.5 12 Z"
        fill="#2356A5"
      />

      <circle cx="12" cy="12" r="10.5" stroke="#000000" strokeWidth="1.4" />
    </svg>
  );
}
