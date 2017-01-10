var React = require('react');

var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({

	getInitialState: function () {
		return {
			count: 0,
			timerStatus: 'stopped'
		};
	},


	componentDidUpdate: function (prevProps, prevState) {
		// if timerStatus state has changed
		if (this.state.timerStatus !== prevState.timerStatus) {
			switch(this.state.timerStatus) {
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
			var newCount = this.state.count + 1;

			this.setState({
				count: newCount
			});
		}, 1000)
	},


	handleStatusChange: function(newStatus){
		// if (newStatus === 'stopped') {
		// 	newStatus = 'paused'
		// }

		this.setState({
			timerStatus: newStatus
		});
	},

	render: function() {
		var {count, timerStatus} = this.state;

		return (
			<div>
				<h1 className="page-title">Timer</h1>
				<Clock totalSeconds = {count}/>
				<Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
			</div>
		);
	}
});

module.exports = Timer;