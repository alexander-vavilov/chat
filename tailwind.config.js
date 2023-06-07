module.exports = {
	content: ['./src/**/*.{js,jsx}', './public/*.html'],
	darkMode: 'class',
	theme: {
		extend: {
			maxWidth: {
				'1/2': '50%',
				'2/3': '66.666667%',
				'1/5': '20%',
			},
			height: {
				'd-screen': '100dvh',
			},
			minHeight: {
				'd-screen': '100dvh',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
