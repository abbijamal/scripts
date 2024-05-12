import { joinURL, withBase, withQuery } from 'ufo'
import type { HotjarInput } from './runtime/registry/hotjar'
import type { IntercomInput } from './runtime/registry/intercom'
import type { SegmentInput } from './runtime/registry/segment'
import type { NpmInput } from './runtime/registry/npm'
import type { PlausibleAnalyticsInput } from './runtime/registry/plausible-analytics'
import type { GoogleAnalyticsInput } from './runtime/registry/google-analytics'
import type { RegistryScripts } from './runtime/types'

// avoid nuxt/kit dependency here so we can use in docs

export function GoogleAnalyticsScriptResolver(options?: GoogleAnalyticsInput) {
  return withQuery('https://www.googletagmanager.com/gtag/js', {
    id: options?.id,
  })
}

export function PlausibleAnalyticsScriptResolver(options: PlausibleAnalyticsInput) {
  const extensions = Array.isArray(options?.extension) ? options.extension.join('.') : [options?.extension]
  return options?.extension ? `https://plausible.io/js/script.${extensions}.js` : 'https://plausible.io/js/script.js'
}

export function CloudflareWebAnalyticsScriptResolver() {
  return 'https://static.cloudflareinsights.com/beacon.min.js'
}

export function SegmentScriptResolver(options: SegmentInput) {
  return joinURL('https://cdn.segment.com/analytics.js/v1', options?.writeKey || '', 'analytics.min.js')
}

export function MetaPixelScriptResolver() {
  return 'https://connect.facebook.net/en_US/fbevents.js'
}

export const registry: (resolve?: (s: string) => string) => RegistryScripts = (resolve?: (s: string) => string) => {
  resolve = resolve || ((s: string) => s)
  return [
    // analytics
    {
      label: 'Google Analytics',
      category: 'analytics',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="28.85" height="32" viewBox="0 0 256 284"><path fill="#F9AB00" d="M256.003 247.933a35.224 35.224 0 0 1-39.376 35.161c-18.044-2.67-31.266-18.371-30.826-36.606V36.845C185.365 18.591 198.62 2.881 216.687.24a35.221 35.221 0 0 1 39.316 35.16z"/><path fill="#E37400" d="M35.101 213.193c19.386 0 35.101 15.716 35.101 35.101c0 19.386-15.715 35.101-35.101 35.101S0 267.68 0 248.295c0-19.386 15.715-35.102 35.101-35.102m92.358-106.387c-19.477 1.068-34.59 17.406-34.137 36.908v94.285c0 25.588 11.259 41.122 27.755 44.433a35.161 35.161 0 0 0 42.146-34.56V142.089a35.222 35.222 0 0 0-35.764-35.282"/></svg>`,
      scriptBundling: GoogleAnalyticsScriptResolver,
      import: {
        name: 'useScriptGoogleAnalytics',
        from: resolve('./runtime/registry/google-analytics'),
      },
    },
    {
      label: 'Plausible Analytics',
      category: 'analytics',
      scriptBundling: PlausibleAnalyticsScriptResolver,
      logo: `<svg height="32" id="Layer_2" viewBox="0 0 46 60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="New_Gradient_Swatch_1" x1="14.841" y1="22.544" x2="27.473" y2="44.649" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#909cf7"/><stop offset="1" stop-color="#4b38d8"/></linearGradient><linearGradient id="New_Gradient_Swatch_1-2" x1="7.984" y1="-1.358" x2="21.001" y2="21.422" xlink:href="#New_Gradient_Swatch_1"/><style>.cls-3{stroke-width:0;fill:#1f2961}</style></defs><g id="Plausible_-_Branding"><g id="Gradient_Logo_-_Purple_Gradient_on_White"><g id="Symbol_-_Purple_Gradient"><path d="M45.246 22.603C44.155 33.059 35.013 40.83 24.5 40.83h-4.047v9.57a9.6 9.6 0 0 1-9.6 9.6H3.36A3.36 3.36 0 0 1 0 56.64V36.938l5.038-7.07a3.362 3.362 0 0 1 4.037-1.149l2.866 1.2a3.353 3.353 0 0 0 4.025-1.145l6.717-9.417a3.34 3.34 0 0 1 4.014-1.14l5.52 2.32a3.347 3.347 0 0 0 4.022-1.142l6.46-9.063c2.025 3.56 3.014 7.789 2.547 12.27Z" style="stroke-width:0;fill:url(#New_Gradient_Swatch_1)"/><path d="M3.292 28.873c.823-1.155 2.021-2.044 3.414-2.312a5.41 5.41 0 0 1 3.147.316l2.865 1.2a1.357 1.357 0 0 0 1.62-.464l6.594-9.245c.823-1.154 2.02-2.041 3.412-2.309a5.368 5.368 0 0 1 3.128.314l5.52 2.32a1.35 1.35 0 0 0 1.619-.46l6.919-9.707C37.827 3.364 31.78 0 24.945 0H3.36A3.36 3.36 0 0 0 0 3.36v30.132l3.292-4.62Z" style="fill:url(#New_Gradient_Swatch_1-2);stroke-width:0"/></g></g></g></svg>`,
      import: {
        name: 'useScriptPlausibleAnalytics',
        from: resolve('./runtime/registry/plausible-analytics'),
      },
    },
    {
      label: 'Cloudflare Web Analytics',
      scriptBundling: CloudflareWebAnalyticsScriptResolver,
      category: 'analytics',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="70.02" height="32" viewBox="0 0 256 117"><path fill="#FBAD41" d="M205.52 50.813c-.858 0-1.705.03-2.551.058c-.137.007-.272.04-.398.094a1.424 1.424 0 0 0-.92.994l-3.628 12.672c-1.565 5.449-.983 10.48 1.646 14.174c2.41 3.416 6.42 5.421 11.289 5.655l19.679 1.194c.585.03 1.092.312 1.4.776a1.92 1.92 0 0 1 .2 1.692a2.496 2.496 0 0 1-2.134 1.662l-20.448 1.193c-11.11.515-23.062 9.58-27.255 20.633l-1.474 3.9a1.092 1.092 0 0 0 .967 1.49h70.425a1.872 1.872 0 0 0 1.81-1.365A51.172 51.172 0 0 0 256 101.828c0-28.16-22.582-50.984-50.449-50.984"/><path fill="#F6821F" d="m174.782 115.362l1.303-4.583c1.568-5.449.987-10.48-1.639-14.173c-2.418-3.417-6.424-5.422-11.296-5.656l-92.312-1.193a1.822 1.822 0 0 1-1.459-.776a1.919 1.919 0 0 1-.203-1.693a2.496 2.496 0 0 1 2.154-1.662l93.173-1.193c11.063-.511 23.015-9.58 27.208-20.633l5.313-14.04c.214-.596.27-1.238.156-1.86C191.126 20.51 166.91 0 137.96 0C111.269 0 88.626 17.403 80.5 41.596a26.996 26.996 0 0 0-19.156-5.359C48.549 37.524 38.25 47.946 36.979 60.88a27.905 27.905 0 0 0 .702 9.642C16.773 71.145 0 88.454 0 109.726c0 1.923.137 3.818.413 5.667c.115.897.879 1.57 1.783 1.568h170.48a2.223 2.223 0 0 0 2.106-1.63"/></svg>`,
      import: {
        name: 'useScriptCloudflareWebAnalytics',
        from: resolve('./runtime/registry/cloudflare-web-analytics'),
      },
    },
    {
      label: 'Fathom Analytics',
      scriptBundling: false, // breaks script
      category: 'analytics',
      logo: `<svg width="32" height="32" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><circle cx="512" cy="512" r="512" style="fill:#9187ff"/><path d="M558.62 256c-36.31.16-78.78 10-129.45 28.4-170.71 62.15-206.9 139.74-144.79 310.45s139.73 206.89 310.45 144.76S801.74 599.88 739.6 429.16c-43.69-120-95-173.55-181-173.17zm59.1 140.16h26.73a5.33 5.33 0 0 1 5.16 6.72l-59.26 220.48a5.34 5.34 0 0 1-5.15 4h-26.75a5.33 5.33 0 0 1-5.16-6.72l3.6-13.4 2.63-9.75 53-197.38a5.33 5.33 0 0 1 5.14-3.94zM421.79 413.4h10.75a5.33 5.33 0 0 1 5.33 5.33v18a5.33 5.33 0 0 1-5.33 5.33h-9.13a36.76 36.76 0 0 0-5.51.24 4.7 4.7 0 0 0-2.56 1 4.19 4.19 0 0 0-1 1.66 18.91 18.91 0 0 0-.92 6.72v13.67h19.16a5.33 5.33 0 0 1 5.33 5.33v18a5.34 5.34 0 0 1-5.33 5.33h-19.21v108.71a5.34 5.34 0 0 1-5.34 5.34H387a5.33 5.33 0 0 1-5.33-5.34V448.48a36.74 36.74 0 0 1 3.6-16.64 29.76 29.76 0 0 1 9.73-11.16c7.9-5.48 17.62-7.27 26.82-7.31zm82.14 50c16.37 0 30.27 4.65 40.17 13.27s15.47 21.21 15.42 35.59v35.91l-16.11 59.92h-10.24a5.33 5.33 0 0 1-5.33-5.34v-4a39.13 39.13 0 0 1-4.76 3.56c-7.14 4.55-16.85 7.51-29.65 7.51a62.65 62.65 0 0 1-28.52-6.18 40.49 40.49 0 0 1-18.84-19.35 46.81 46.81 0 0 1-4-19.54 40.72 40.72 0 0 1 5.23-21.12 36.78 36.78 0 0 1 13.78-13.18c11.09-6.25 24.75-8.45 38.14-10.24 7.3-1 13.14-1.61 17.64-2.2a42 42 0 0 0 9.2-1.88 3.16 3.16 0 0 0 1.39-.86l.24-.48a6.77 6.77 0 0 0 .16-1.84v-.73a17.24 17.24 0 0 0-5.85-13.6c-3.8-3.31-9.77-5.55-18.07-5.57s-14.64 2.26-19 5.59a17.51 17.51 0 0 0-7.21 12.54 5.33 5.33 0 0 1-5.31 4.86h-22.25a5.33 5.33 0 0 1-5.33-5.57 45.64 45.64 0 0 1 17.6-34c10.47-8.34 24.85-13.12 41.49-13.12zm23.92 80.71c-1.92.48-4 1-6.31 1.45-6.47 1.28-14.29 2.41-21.87 3.48a61 61 0 0 0-14.76 3.65c-4.18 1.75-7.1 4-8.68 6.57a12.12 12.12 0 0 0-1.71 6.54v.2a12.93 12.93 0 0 0 1.32 5.87 11.81 11.81 0 0 0 3.76 4.22c3.41 2.45 9.13 4.14 16.85 4.14 11.95 0 19.52-3.5 24.32-8.32s7-11.56 7.08-19.11v-8.65zm0 0" style="fill:#fff"/></svg>`,
      import: {
        name: 'useScriptFathomAnalytics',
        from: resolve('./runtime/registry/fathom-analytics'),
      },
    },
    {
      label: 'Matomo Analytics',
      scriptBundling: false, // breaks script
      category: 'analytics',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="56.5" height="32" viewBox="0 0 256 145"><defs><path id="logosMatomoIcon0" d="m105.426 70.887l.035-.021l-.663-1.01c-.1-.153-.2-.313-.303-.46L58.935 0L0 43.91l43.078 66.305c.185.281.36.566.55.847l.229.35l.025-.016c6.676 9.471 17.678 15.673 30.144 15.673c20.373 0 36.889-16.513 36.889-36.89c0-7.083-2.029-13.675-5.489-19.292"/><path id="logosMatomoIcon1" fill="#000" d="M64.549 19.33c0-20.374-16.517-36.89-36.89-36.89S-9.23-1.044-9.23 19.33a36.686 36.686 0 0 0 6.08 20.263c-.003 0-.003 0-.003-.003l-.019.003L-31.179 0h-.04c-6.499-10.524-18.101-17.56-31.376-17.56c-13.275 0-24.877 7.036-31.376 17.56h-.037l-44.61 69.525c6.633-9.8 17.848-16.235 30.57-16.235c13.39 0 25.077 7.158 31.54 17.832h.047l29.15 40.921h.047c6.718 9.1 17.486 15.026 29.663 15.026c12.181 0 22.95-5.927 29.666-15.026h.05l.297-.46a36.949 36.949 0 0 0 2.116-3.312l43.675-68.256v.003A36.747 36.747 0 0 0 64.55 19.33M2.372 46.141c.213.204.435.397.654.594c-.22-.197-.438-.39-.654-.594m3.28 2.745c.243.181.48.369.728.544c-.247-.175-.485-.363-.729-.544m8.096 4.598c.306.128.628.228.94.347c-.312-.12-.634-.22-.94-.347m8.28 2.263c.428.065.853.143 1.287.197c-.434-.054-.856-.132-1.287-.197m9.93.203c.438-.05.869-.135 1.303-.197c-.434.062-.862.147-1.303.197m8.368-2.01c.393-.144.797-.275 1.184-.434c-.387.159-.788.29-1.185.434m8.368-4.326c.313-.216.61-.456.916-.684c-.307.228-.603.465-.916.684m6.258-5.526c.259-.285.528-.563.778-.857c-.25.294-.519.572-.778.857"/><path id="logosMatomoIcon2" fill="#95C748" d="m250.511 88.448l.035-.022l-.663-1.01c-.1-.153-.2-.312-.303-.46L204.02 17.56l-58.935 43.91l43.078 66.305c.185.281.36.566.55.847l.229.35l.025-.016c6.676 9.471 17.678 15.673 30.144 15.673c20.373 0 36.889-16.513 36.889-36.89c0-7.083-2.029-13.675-5.489-19.291"/><filter id="logosMatomoIcon3" width="106.9%" height="109.7%" x="-3.4%" y="-3.5%" filterUnits="objectBoundingBox"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"/><feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/></filter></defs><use href="#logosMatomoIcon2"/><path fill="#35BFC0" d="M73.779 107.74c0-20.374-16.516-36.89-36.89-36.89C16.516 70.85 0 87.366 0 107.74c0 20.376 16.516 36.892 36.89 36.892c20.373 0 36.889-16.52 36.889-36.893"/><path fill="#3253A0" d="M172.744 0c20.373 0 36.89 16.516 36.89 36.89a36.747 36.747 0 0 1-6.346 20.688v-.003l-43.675 68.256a36.949 36.949 0 0 1-2.116 3.313l-.297.46h-.05c-6.717 9.098-17.485 15.025-29.666 15.025c-12.177 0-22.945-5.927-29.663-15.026h-.046l-29.15-40.921h-.047C62.114 78.008 50.427 70.85 37.036 70.85c-12.721 0-23.936 6.436-30.569 16.235l44.61-69.525h.037C57.613 7.036 69.215 0 82.49 0c13.275 0 24.877 7.036 31.376 17.56h.04l28.006 39.593l.02-.003c0 .003 0 .003.002.003a36.684 36.684 0 0 1-6.08-20.264C135.855 16.516 152.372 0 172.745 0"/><use href="#logosMatomoIcon2"/><g transform="translate(145.085 17.56)"><mask id="logosMatomoIcon4" fill="#fff"><use href="#logosMatomoIcon0"/></mask><g mask="url(#logosMatomoIcon4)"><use filter="url(#logosMatomoIcon3)" href="#logosMatomoIcon1"/></g></g><path fill="#F38334" d="M209.487 36.89c0-20.374-16.516-36.89-36.89-36.89c-20.373 0-36.89 16.516-36.89 36.89c0 20.373 16.517 36.889 36.89 36.889c20.374 0 36.89-16.516 36.89-36.89"/><path fill="#3152A0" d="M172.597 73.782c-12.887 0-24.214-6.617-30.81-16.629h-.021L113.759 17.56h-.04C107.22 7.04 95.618.003 82.343.003C69.068.003 57.466 7.04 50.967 17.56h-.037L6.323 87.085c6.63-9.796 17.848-16.232 30.566-16.232c13.39 0 25.08 7.155 31.545 17.829h.047l29.15 40.921h.044c6.72 9.096 17.488 15.029 29.665 15.029c12.178 0 22.946-5.93 29.663-15.029h.05l.297-.462a37.588 37.588 0 0 0 2.12-3.307l43.672-68.256c-6.636 9.774-17.839 16.204-30.545 16.204"/></svg>`,
      import: {
        name: 'useScriptMatomoAnalytics',
        from: resolve('./runtime/registry/matomo-analytics'),
      },
    },
    // tracking
    {
      label: 'Google Tag Manager',
      category: 'tracking',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#8AB4F8" d="m150.262 245.516l-44.437-43.331l95.433-97.454l46.007 45.091z"/><path fill="#4285F4" d="M150.45 53.938L106.176 8.731L9.36 104.629c-12.48 12.48-12.48 32.713 0 45.207l95.36 95.986l45.09-42.182l-72.654-76.407z"/><path fill="#8AB4F8" d="m246.625 105.37l-96-96c-12.494-12.494-32.756-12.494-45.25 0c-12.495 12.495-12.495 32.757 0 45.252l96 96c12.494 12.494 32.756 12.494 45.25 0c12.495-12.495 12.495-32.757 0-45.251"/><circle cx="127.265" cy="224.731" r="31.273" fill="#246FDB"/></svg>`,
      import: {
        name: 'useScriptGoogleTagManager',
        from: resolve('./runtime/registry/google-tag-manager'),
      },
    },
    {
      label: 'Segment',
      scriptBundling: SegmentScriptResolver,
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="30.92" height="32" viewBox="0 0 256 265"><path fill="#4FB58B" d="m233.56 141.927l.17.013l17.892 1.87a4.927 4.927 0 0 1 3.225 1.707l.133.163l-.17.085a4.93 4.93 0 0 1 1.02 3.74a133.272 133.272 0 0 1-41.604 81.083a128.86 128.86 0 0 1-87.629 34.38a127.488 127.488 0 0 1-46.156-8.57l-.802-.312a4.716 4.716 0 0 1-2.686-2.533l-.077-.187a4.891 4.891 0 0 1-.083-3.66l7.062-17.23a4.846 4.846 0 0 1 6.118-2.799l.163.06c36.097 13.939 76.98 6.089 105.349-20.227a104.455 104.455 0 0 0 32.891-63.32a4.93 4.93 0 0 1 5.013-4.27zm-190.08 64.31l.251-.002l.253.002c8.12.093 14.658 6.659 14.746 14.749v.253c0 .084 0 .168-.002.252c-.141 8.284-6.97 14.886-15.254 14.745c-8.284-.141-14.885-6.97-14.745-15.254c.139-8.115 6.695-14.615 14.75-14.745M4.93 147.082h146.316a4.973 4.973 0 0 1 4.928 4.844l.002.171v18.316a4.974 4.974 0 0 1-4.76 5.01l-.17.005H4.93A4.975 4.975 0 0 1 0 170.584v-18.659a4.975 4.975 0 0 1 4.755-4.838zM169.56 7.311a4.974 4.974 0 0 1 2.848 2.635a5.096 5.096 0 0 1 0 3.867l-6.375 16.999a4.845 4.845 0 0 1-6.162 2.974A101.228 101.228 0 0 0 62.13 51.252a105.267 105.267 0 0 0-34.507 54.99a4.93 4.93 0 0 1-4.76 3.698h-1.105L4.25 105.733a4.886 4.886 0 0 1-3.103-2.295h-.085A4.929 4.929 0 0 1 .51 99.57a133.393 133.393 0 0 1 44.41-70.204C79.739.7 127.019-7.666 169.56 7.311m-64.807 73.434H251.07a4.972 4.972 0 0 1 4.922 4.67l.008.174v18.317a4.973 4.973 0 0 1-4.76 5.01l-.17.005H104.754a4.972 4.972 0 0 1-4.886-4.842l-.002-.173V85.759a4.972 4.972 0 0 1 4.715-5.008zm101.572-55.883l.252-.002l.253.002c8.12.093 14.658 6.659 14.746 14.748v.253c0 .085 0 .17-.002.253c-.14 8.284-6.97 14.885-15.254 14.744c-8.284-.14-14.885-6.97-14.744-15.253c.138-8.116 6.694-14.616 14.749-14.745"/></svg>`,
      category: 'tracking',
      import: {
        name: 'useScriptSegment',
        from: resolve('./runtime/registry/segment'),
      },
    },
    {
      label: 'Meta Pixel',
      scriptBundling: MetaPixelScriptResolver,
      category: 'tracking',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"/></svg>`,
      import: {
        name: 'useScriptMetaPixel',
        from: resolve('./runtime/registry/meta-pixel'),
      },
    },
    {
      label: 'X Pixel',
      src: 'https://static.ads-twitter.com/uwt.js',
      category: 'tracking',
      logo: {
        dark: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128" fill="white" stroke="white"><path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"/></svg>`,
        light: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128" fill="black" stroke="black"><path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"/></svg>`,
      },
      import: {
        name: 'useScriptXPixel',
        from: resolve('./runtime/registry/x-pixel'),
      },
    },
    // marketing
    {
      label: 'Intercom',
      scriptBundling(options?: IntercomInput) {
        return joinURL(`https://widget.intercom.io/widget`, options?.app_id || '')
      },
      logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.968 8.972" width="64" height="64"><path d="M7.853 0h-6.73C.496 0-.002.498-.002 1.117v6.73a1.12 1.12 0 0 0 1.126 1.126h6.73c.618 0 1.117-.498 1.117-1.117v-6.73A1.119 1.119 0 0 0 7.853 0zM5.68 1.645c0-.17.13-.3.3-.3s.3.13.3.3v3.998c0 .17-.13.3-.3.3s-.3-.13-.3-.3zm-1.495-.15c0-.17.13-.3.3-.3s.3.13.3.3v4.336c0 .17-.13.3-.3.3s-.3-.13-.3-.3zm-1.495.15c0-.17.13-.3.3-.3s.3.13.3.3v3.998c0 .17-.13.3-.3.3s-.3-.13-.3-.3zm-1.495.598c0-.17.13-.3.3-.3s.3.13.3.3v2.692c0 .17-.13.3-.3.3s-.3-.13-.3-.3zm6.48 4.566c-.05.04-1.156.967-3.2.967s-3.14-.927-3.2-.967a.29.29 0 0 1-.03-.419.29.29 0 0 1 .419-.03c.02 0 1.007.817 2.8.817 1.814 0 2.79-.817 2.79-.827.13-.1.32-.1.42.03a.3.3 0 0 1-.02.429zm.1-1.874c0 .17-.13.3-.3.3s-.3-.13-.3-.3V2.243c0-.17.13-.3.3-.3s.3.13.3.3z" fill="#1f8ded"/></svg>`,
      category: 'marketing',
      import: {
        name: 'useScriptIntercom',
        from: resolve('./runtime/registry/intercom'),
      },
    },
    {
      label: 'Hotjar',
      scriptBundling(options?: HotjarInput) {
        return withQuery(`https://static.hotjar.com/c/hotjar-${options?.id || ''}.js`, {
          sv: options?.sv || '6',
        })
      },
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="28.45" height="32" viewBox="0 0 256 288"><path fill="#FF3C00" d="M256 100.585c0 53.068-23.654 81.018-49.308 99.403l-4.984 3.443l-5 3.23l-4.979 3.04l-4.925 2.877l-18.623 10.45c-.97.554-1.925 1.106-2.867 1.656l-5.484 3.303c-19.473 12.156-31.858 25.278-32.898 54.98l-.071 4.155H71.752c0-51.355 22.158-79.19 46.838-97.595l4.964-3.56a192.48 192.48 0 0 1 2.496-1.693l5-3.229l4.978-3.04l9.759-5.616l13.787-7.712l5.652-3.305c21.022-12.65 34.51-25.579 35.597-56.632l.071-4.155zM184.252.145c0 51.35-22.153 79.185-46.833 97.591l-4.964 3.56c-.831.574-1.664 1.138-2.497 1.693l-5 3.23l-4.979 3.04l-9.76 5.616l-13.788 7.713l-5.652 3.305c-.914.55-1.814 1.1-2.7 1.653l-5.131 3.351c-16.5 11.328-26.82 24.627-27.766 51.63l-.072 4.155H0c0-54.78 25.206-82.793 51.797-101.152l4.997-3.333l4.994-3.133l4.957-2.956L87.82 64.236l5.652-3.306c21.023-12.65 34.51-25.58 35.597-56.631l.072-4.155z"/></svg>`,
      category: 'marketing',
      import: {
        name: 'useScriptHotjar',
        from: resolve('./runtime/registry/hotjar'),
      },
    },
    // payments
    {
      label: 'Stripe',
      scriptBundling: false,
      category: 'payments',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="76.57" height="32" viewBox="0 0 512 214"><path fill="#635BFF" d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"/></svg>`,
      import: {
        name: 'useScriptStripe',
        from: resolve('./runtime/registry/stripe'),
      },
    },
    {
      label: 'Lemon Squeezy',
      src: false, // should not be bundled
      category: 'payments',
      logo: `<svg width="21" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m6.929 17.186 7.511 3.472a3.846 3.846 0 0 1 1.943 1.983c.898 2.099-.33 4.246-2.255 5.018-1.926.772-3.979.275-4.912-1.908l-3.27-7.664c-.253-.595.384-1.178.983-.901ZM7.38 14.938l7.753-2.931c2.577-.974 5.392.869 5.354 3.547l-.003.105c-.055 2.608-2.792 4.36-5.312 3.438l-7.786-2.85a.694.694 0 0 1-.007-1.31ZM6.945 13.922l7.622-3.238C17.1 9.607 17.743 6.377 15.76 4.51a9.026 9.026 0 0 0-.078-.073c-1.945-1.805-5.16-1.17-6.267 1.208l-3.42 7.347c-.274.585.343 1.189.951.93ZM4.983 12.643l2.772-7.599a3.678 3.678 0 0 0-.076-2.732C6.78.214 4.344-.464 2.42.31.493 1.083-.595 2.84.34 5.023l3.29 7.656c.255.593 1.132.57 1.352-.036Z" fill="#FFC233"/></svg>`,
      import: {
        name: 'useScriptLemonSqueezy',
        from: resolve('./runtime/registry/lemon-squeezy'),
      },
    },
    // content
    {
      label: 'Vimeo Player',
      category: 'content',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="36.74" height="32" viewBox="0 0 256 223"><path fill="#32B8E8" d="M255.876 51.662c-1.139 24.968-18.545 59.157-52.209 102.55c-34.806 45.327-64.254 67.989-88.343 67.989c-14.918 0-27.551-13.799-37.863-41.406c-6.892-25.306-13.775-50.61-20.664-75.915c-7.663-27.592-15.878-41.406-24.661-41.406c-1.915 0-8.617 4.038-20.091 12.081L0 60.008a3257.325 3257.325 0 0 0 37.36-33.38C54.21 12.038 66.86 4.366 75.29 3.59c19.925-1.917 32.187 11.728 36.79 40.938c4.974 31.514 8.415 51.116 10.35 58.788c5.742 26.145 12.06 39.201 18.965 39.201c5.358 0 13.407-8.478 24.138-25.436c10.722-16.963 16.464-29.868 17.24-38.733c1.525-14.638-4.22-21.975-17.24-21.975c-6.128 0-12.447 1.413-18.946 4.206c12.58-41.29 36.618-61.343 72.1-60.199c26.304.773 38.705 17.867 37.19 51.282"/></svg>`,
      import: {
        name: 'useScriptVimeoPlayer',
        from: resolve('./runtime/registry/vimeo-player'),
      },
    },
    {
      label: 'YouTube Player',
      category: 'content',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="45.52" height="32" viewBox="0 0 256 180"><path fill="red" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"/><path fill="#FFF" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"/></svg>`,
      import: {
        name: 'useScriptYouTubePlayer',
        from: resolve('./runtime/registry/youtube-player'),
      },
    },
    {
      label: 'Google Maps',
      category: 'content',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="22.33" height="32" viewBox="0 0 256 367"><path fill="#34A853" d="M70.585 271.865a370.712 370.712 0 0 1 28.911 42.642c7.374 13.982 10.448 23.463 15.837 40.31c3.305 9.308 6.292 12.086 12.714 12.086c6.998 0 10.173-4.726 12.626-12.035c5.094-15.91 9.091-28.052 15.397-39.525c12.374-22.15 27.75-41.833 42.858-60.75c4.09-5.354 30.534-36.545 42.439-61.156c0 0 14.632-27.035 14.632-64.792c0-35.318-14.43-59.813-14.43-59.813l-41.545 11.126l-25.23 66.451l-6.242 9.163l-1.248 1.66l-1.66 2.078l-2.914 3.319l-4.164 4.163l-22.467 18.304l-56.17 32.432z"/><path fill="#FBBC04" d="M12.612 188.892c13.709 31.313 40.145 58.839 58.031 82.995l95.001-112.534s-13.384 17.504-37.662 17.504c-27.043 0-48.89-21.595-48.89-48.825c0-18.673 11.234-31.501 11.234-31.501l-64.489 17.28z"/><path fill="#4285F4" d="M166.705 5.787c31.552 10.173 58.558 31.53 74.893 63.023l-75.925 90.478s11.234-13.06 11.234-31.617c0-27.864-23.463-48.68-48.81-48.68c-23.969 0-37.735 17.475-37.735 17.475v-57z"/><path fill="#1A73E8" d="M30.015 45.765C48.86 23.218 82.02 0 127.736 0c22.18 0 38.89 5.823 38.89 5.823L90.29 96.516H36.205z"/><path fill="#EA4335" d="M12.612 188.892S0 164.194 0 128.414c0-33.817 13.146-63.377 30.015-82.649l60.318 50.759z"/></svg>`,
      import: {
        name: 'useScriptGoogleMaps',
        from: resolve('./runtime/registry/google-maps'),
      },
    },
    // other
    {
      label: 'NPM',
      scriptBundling(options?: NpmInput) {
        return withBase(options?.file || '', `https://unpkg.com/${options?.packageName || ''}@${options?.version || 'latest'}`)
      },
      logo: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#C12127" d="M0 256V0h256v256z"/><path fill="#FFF" d="M48 48h160v160h-32V80h-48v128H48z"/></svg>`,
      category: 'utility',
      import: {
        name: 'useScriptNpm',
        // key is based on package name
        from: resolve('./runtime/registry/npm'),
      },
    },
  ]
}
