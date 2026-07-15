import Mark from "./Mark";

const tools = [
  { name: "Meta", side: "left", y: 15 },
  { name: "OpenAI", side: "left", y: 38.33 },
  { name: "Anthropic", side: "left", y: 61.67 },
  { name: "n8n", side: "left", y: 85 },
  { name: "Make", side: "right", y: 15 },
  { name: "Google Sheets", side: "right", y: 38.33 },
  { name: "Notion", side: "right", y: 61.67 },
  { name: "Python", side: "right", y: 85 },
] as const;

type ToolName = (typeof tools)[number]["name"];

function BrandIcon({ name }: { name: ToolName }) {
  if (name === "Meta") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#0866ff" aria-hidden>
        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973.14.604.35 1.15.636 1.621.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.942-1.664.183.3 2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843C23.4 18.225 24 16.756 24 14.41c0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303Zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.9 44.9 0 0 0-1.255-1.98l.211-.327c1.12-1.667 2.118-2.602 3.358-2.602Zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285Z" />
      </svg>
    );
  }

  if (name === "OpenAI") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#111111" aria-hidden>
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.182a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .511 4.91 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073Zm-9.022 12.608a4.476 4.476 0 0 1-2.877-1.04l.142-.081 4.778-2.758a.795.795 0 0 0 .393-.682v-6.737l2.02 1.169a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494Zm-9.661-4.125a4.471 4.471 0 0 1-.535-3.014l.142.085 4.783 2.758a.771.771 0 0 0 .781 0l5.843-3.368v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.499 4.499 0 0 1-6.141-1.646ZM2.341 7.896a4.485 4.485 0 0 1 2.365-1.973V11.6a.766.766 0 0 0 .388.677l5.814 3.354-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.787a4.504 4.504 0 0 1-1.646-6.117Zm16.596 3.856-5.833-3.388L15.12 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.407-.667Zm2.011-3.023-.142-.086-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.499 4.499 0 0 1 6.681 4.66ZM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.056V6.074a4.499 4.499 0 0 1 7.376-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.682Zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" />
      </svg>
    );
  }

  if (name === "Anthropic") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#181818" aria-hidden>
        <path d="M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.37-3.553h7.005l1.369 3.553h3.744L10.536 3.541Zm-.371 10.223 2.291-5.945 2.292 5.945Z" />
      </svg>
    );
  }

  if (name === "n8n") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#ea4b71" aria-hidden>
        <path d="M21.474 5.684a2.53 2.53 0 0 0-2.447 1.895h-2.896a2.526 2.526 0 0 0-2.492 2.111l-.103.623a1.263 1.263 0 0 1-1.246 1.055h-1.001a2.527 2.527 0 0 0-4.894 0H4.973A2.527 2.527 0 1 0 4.973 12.632h1.422a2.527 2.527 0 0 0 4.894 0h1a1.263 1.263 0 0 1 1.247 1.055l.103.623a2.526 2.526 0 0 0 2.492 2.111h.37a2.527 2.527 0 1 0 0-1.263h-.37a1.263 1.263 0 0 1-1.245-1.055l-.104-.623A2.52 2.52 0 0 0 13.961 12a2.52 2.52 0 0 0 .821-1.479l.104-.623a1.263 1.263 0 0 1 1.245-1.056h2.896a2.527 2.527 0 1 0 2.447-3.158Zm0 1.263a1.263 1.263 0 1 1 0 2.527 1.263 1.263 0 0 1 0-2.527ZM2.526 10.737a1.263 1.263 0 1 1 0 2.526 1.263 1.263 0 0 1 0-2.526Zm6.316 0a1.263 1.263 0 1 1 0 2.526 1.263 1.263 0 0 1 0-2.526Zm10.105 3.79a1.263 1.263 0 1 1 0 2.526 1.263 1.263 0 0 1 0-2.526Z" />
      </svg>
    );
  }

  if (name === "Make") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
        <defs>
          <linearGradient id="make-brand" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#f024f6" />
            <stop offset="1" stopColor="#8200fa" />
          </linearGradient>
        </defs>
        <path
          fill="url(#make-brand)"
          d="M13.38 3.498a.578.578 0 0 0-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012Zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062Zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z"
        />
      </svg>
    );
  }

  if (name === "Google Sheets") {
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden>
        <path fill="#34a853" d="M37 45H11a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h18l12 12v26a4 4 0 0 1-4 4Z" />
        <path fill="#a8dab5" d="M29 3v9a4 4 0 0 0 4 4h8Z" />
        <path fill="#188038" d="M29 3v10a3 3 0 0 0 3 3h9Z" />
        <path
          fill="#fff"
          d="M14 21v16h20V21Zm8 13h-5v-4h5Zm0-7h-5v-3h5Zm9 7h-6v-4h6Zm0-7h-6v-3h6Z"
        />
      </svg>
    );
  }

  if (name === "Notion") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#111111" aria-hidden>
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466Zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933Zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933ZM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 112 112" className="h-9 w-9" aria-hidden>
      <defs>
        <linearGradient id="python-blue" x1="23" y1="13" x2="86" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5a9fd4" />
          <stop offset="1" stopColor="#306998" />
        </linearGradient>
        <linearGradient id="python-yellow" x1="86" y1="101" x2="31" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffd43b" />
          <stop offset="1" stopColor="#ffe873" />
        </linearGradient>
      </defs>
      <path
        fill="url(#python-blue)"
        d="M54.92.001c-4.585.021-8.962.412-12.814 1.094C30.76 3.099 28.7 7.295 28.7 15.032V25.25h26.813v3.407H18.638c-7.792 0-14.616 4.684-16.75 13.594-2.462 10.213-2.571 16.586 0 27.25 1.906 7.938 6.458 13.594 14.25 13.594h9.219v-12.25c0-8.85 7.657-16.656 16.75-16.656h26.78c7.455 0 13.407-6.138 13.407-13.625V15.032c0-7.266-6.13-12.725-13.407-13.937C64.282.328 59.502-.02 54.92.001ZM40.419 8.22c2.77 0 5.031 2.299 5.031 5.125 0 2.816-2.262 5.094-5.031 5.094-2.78 0-5.031-2.278-5.031-5.094 0-2.826 2.252-5.125 5.031-5.125Z"
      />
      <path
        fill="url(#python-yellow)"
        d="M85.638 28.657v11.906c0 9.231-7.826 17-16.75 17H42.106c-7.336 0-13.406 6.279-13.406 13.625V96.72c0 7.266 6.319 11.54 13.406 13.625 8.488 2.496 16.627 2.947 26.782 0 6.75-1.954 13.406-5.888 13.406-13.625V86.501H55.513v-3.406H95.7c7.792 0 10.696-5.436 13.406-13.594 2.8-8.399 2.68-16.476 0-27.25-1.926-7.757-5.604-13.594-13.406-13.594Zm-15.063 64.656c2.78 0 5.031 2.278 5.031 5.094 0 2.826-2.252 5.125-5.031 5.125-2.77 0-5.031-2.299-5.031-5.125 0-2.816 2.262-5.094 5.031-5.094Z"
      />
    </svg>
  );
}

const paths = tools.map((tool) => {
  const y = (tool.y / 100) * 360;
  return tool.side === "left"
    ? `M 120 ${y} C 285 ${y}, 340 180, 500 180`
    : `M 500 180 C 660 180, 715 ${y}, 880 ${y}`;
});

/**
 * A compact integration map: the tools are static and readable while the
 * travelling brass strokes show information moving through the Avernek layer.
 */
export default function IntegrationNetwork() {
  return (
    <div
      className="relative mx-auto h-[22.5rem] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-line bg-[radial-gradient(circle_at_center,rgba(139,65,251,0.14),transparent_38%),linear-gradient(180deg,#1c1d22,#15161a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_70px_-42px_rgba(0,0,0,0.9)]"
      aria-label="Avernek integration network: Meta, OpenAI, Anthropic, n8n, Make, Google Sheets, Notion, and Python"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,242,238,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(243,242,238,0.035) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <svg
        viewBox="0 0 1000 360"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="integration-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6d28d9" />
            <stop offset="0.5" stopColor="#c4a1ff" />
            <stop offset="1" stopColor="#8b41fb" />
          </linearGradient>
          <filter id="integration-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, index) => (
          <g key={path}>
            <path d={path} fill="none" stroke="rgba(243,242,238,0.10)" strokeWidth="1.25" />
            <path
              d={path}
              pathLength="1"
              fill="none"
              stroke="url(#integration-beam)"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="url(#integration-glow)"
              className="integration-beam"
              style={{ animationDelay: `${index * -0.42}s` }}
            />
          </g>
        ))}
      </svg>

      {tools.map((tool) => (
        <div
          key={tool.name}
          className={`absolute z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#f7f6f2] shadow-[0_12px_32px_-16px_rgba(0,0,0,0.95)] transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14 ${
            tool.side === "left"
              ? "left-[12%] -translate-x-1/2"
              : "right-[12%] translate-x-1/2"
          }`}
          style={{ top: `${tool.y}%` }}
          title={tool.name}
          role="img"
          aria-label={tool.name}
        >
          <span className="flex items-center justify-center">
            <BrandIcon name={tool.name} />
          </span>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/40 bg-[#17181d] text-brass shadow-[0_0_0_10px_rgba(139,65,251,0.05),0_0_55px_rgba(139,65,251,0.22)] sm:h-24 sm:w-24">
        <Mark className="h-9 w-9 sm:h-11 sm:w-11" />
      </div>
    </div>
  );
}
