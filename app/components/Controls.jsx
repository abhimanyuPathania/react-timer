var React = require('react');

var Controls = React.createClass({

	propTypes: {
		countdownStatus: React.PropTypes.string.isRequired,
		onStatusChange: React.PropTypes.func.isRequired
	},

	onStatusChange: function(newStatus) {

		// this function returns a function which simply calls
		// onStatusChange passed down via props with correct status
		// closures scoping takes care of newStatus to available to the returned function
		return () => {
			this.props.onStatusChange(newStatus);
		}
	},

	render: function() {
		var {countdownStatus} = this.props;
		var renderStartStopButton = () => {
			if (countdownStatus === 'started'){
				return (
					<button className="button secondary" onClick={this.onStatusChange('paused')}>
						Pause
					</button>
				);
			} else {
				return (
					<button className="button primary" onClick={this.onStatusChange('started')}>
						Start
					</button>
				);
			}
		};

		return (
			<div className="controls">
				{renderStartStopButton()}
				<button className="button alert hollow" onClick={this.onStatusChange('stopped')}>
					Clear
				</button>
			</div>
		);		
	}
});

	

module.exports = Controls;