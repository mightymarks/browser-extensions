import { render } from 'preact'

const App = () => (
	<div>
		<style jsx global>{`
			* {
				margin: 0;
				padding: 0;
			}
			html {
				box-sizing: border-box;
			}

			*,
			*:before,
			*:after {
				box-sizing: inherit;
			}
		`}</style>
		<style jsx>{`
			div {
				width: 200px;
				height: 200px;
			}
		`}</style>
		hi
	</div>
)

render(<App />, document.getElementById('app'))
