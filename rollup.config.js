export default [{
  input: 'src/index.js',
  output: {
    extend: true,
    file: 'dist/proper-tags.umd.js',
    format: 'umd',
    indent: false,
    name: 'properTags'
  },
},
  {
		input: "./src/index.js",
		output: {
			file: "dist/proper-tags.cjs",
			format: "commonjs",
			name: "properTags",
			exports: "auto"
			
		}
	},
  {	
		input: "./src/index.js",
		output: {
			file: "dist/proper-tags.js",
			format: "es"
		}
	}
];