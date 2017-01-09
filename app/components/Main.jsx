var React = require('react');

var Nav = require('Nav');


var Main = (props) => {
	
	return (
		<div>
			<div >
				<div>
					<Nav></Nav>
					<p>Rendered from main</p>
					{props.children}
				</div>
			</div>		
		</div>
	);
}

module.exports = Main;