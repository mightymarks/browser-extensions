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
			}
		`}</style>
	</div>
)

render(<App />, document.getElementById('app'))
