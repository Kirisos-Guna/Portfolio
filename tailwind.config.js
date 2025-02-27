/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-grotesk)', 'monospace'],
      },
      fontSize: {
        'xs': 'var(--fs-xs)',
        'sm': 'var(--fs-sm)',
        'base': 'var(--fs-base)',
        'lg': 'var(--fs-lg)',
        'xl': 'var(--fs-xl)',
        '2xl': 'var(--fs-2xl)',
        '3xl': 'var(--fs-3xl)',
        '4xl': 'var(--fs-4xl)',
        '5xl': 'var(--fs-5xl)',
      },
      lineHeight: {
        'tight': 'var(--lh-tight)',
        'normal': 'var(--lh-normal)',
        'loose': 'var(--lh-loose)',
      },
      letterSpacing: {
        'tight': 'var(--ls-tight)',
        'normal': 'var(--ls-normal)',
        'wide': 'var(--ls-wide)',
        'wider': 'var(--ls-wider)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "background-secondary": "var(--background-secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-purple": "var(--accent-purple)",
        "accent-blue": "var(--accent-blue)",
        "accent-pink": "var(--accent-pink)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}; 