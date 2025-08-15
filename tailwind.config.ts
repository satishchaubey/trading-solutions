// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.75rem', '1rem'],      // 12px
        'sm': ['0.875rem', '1.25rem'],   // 14px
      },
    },
  },
  plugins: [],
}

export default config