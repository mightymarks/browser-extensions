import { render } from 'react-dom'

const App: React.FC = () => (
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
				width: 600px;
				height: 450px;
			}
		`}</style>
		hi
	</div>
)

render(<App />, document.getElementById('app'))
