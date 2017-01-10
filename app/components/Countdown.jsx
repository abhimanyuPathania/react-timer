var React = require('react');

var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({

	getInitialState: function () {
		return {
			count: 0,
			countdownStatus: 'stopped'
		};
	},

	componentDidUpdate: function (prevProps, prevState) {
		// if coundownStatus state has changed
		if (this.state.countdownStatus !== prevState.countdownStatus) {
			switch(this.state.countdownStatus) {
				case 'started':
					this.startTimer();
					break;

				case 'stopped':
					this.setState({
						count: 0
					});
					// break not used

				case 'paused':
					clearInterval(this.timer);
					this.timer = null;
					break;
			}
		}
	},


	componentWillUnmount: function () {		
		clearInterval(this.timer);
		this.timer = null;
	},

	startTimer: function() {
		this.timer = setInterval(() => {
			// 'this' keyword is preserved due to fat arrow function
			var newCount = this.state.count - 1;

			this.setState({
				count: newCount >= 0 ? newCount : 0
			});

			// this will re-render the input form
			// 'stopped' state via switch case 'paused' statement
			// will clear the interval as well
			if (newCount === 0) {
				this.setState({countdownStatus: 'stopped'})
			}
		}, 1000)
	},

	handleSetCountdown: function(seconds) {
		this.setState({
			count: seconds,
			countdownStatus: 'started'
		});
	},

	handleStatusChange: function(newStatus) {
		this.setState({
			countdownStatus: newStatus
		});
	},

	render: function() {
		var {count} = this.state;

		var renderContolArea = () => {
			var {countdownStatus} = this.state;
			if (countdownStatus !== 'stopped') {
				return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
			} else {
				return <CountdownForm onSetCountdown = {this.handleSetCountdown}/>;
			}
		};

		return (
			<div>
				<h1 className="page-title">Countdown App</h1>
				<Clock totalSeconds = {count} />
				{renderContolArea()}
			</div>
		);
	}
});

module.exports = Countdown;