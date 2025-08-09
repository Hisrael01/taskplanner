/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // sm: '370px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      keyframes: {
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        inputHighlight: {
          from: {
            background:' #a88a4a',
          },
          to: {
            width: '0',
            background: 'transparent',
          },
        },
      },
      borderColor: {
        'neutral': '#d2bfbf',
      },
    },
  },
  corePlugins: {
    backdropSepia: false,
  },
  plugins: [],
});
