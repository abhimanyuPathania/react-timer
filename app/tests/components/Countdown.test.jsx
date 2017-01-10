var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
// 'jQuery' as defined in externals property in webpack config
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');

describe('Countdown', () => {

	it('should exist', () => {
		expect(Countdown).toExist();
	})

	describe('handleSetCountdown', () => {
		it('should set state to started and countdown', (done) => {

			// mocha does not support asynchronous tests inherently
			// the 'done' argument tells it simply to wait until it is called

			var countdownComp = TestUtils.renderIntoDocument(<Countdown />);

			countdownComp.handleSetCountdown(10);
			expect(countdownComp.state.count).toBe(10);
			expect(countdownComp.state.countdownStatus).toBe('started');

			setTimeout(() => {
				expect(countdownComp.state.count).toBe(9);
				// end the asynch test
				done();
			}, 1001)
		});

		it('should not count below zero', (done) => {

			// mocha does not support asynchronous tests inherently
			// the 'done' argument tells it simply to wait until it is called

			var countdownComp = TestUtils.renderIntoDocument(<Countdown />);

			countdownComp.handleSetCountdown(1);

			setTimeout(() => {
				// count should be zero even after 3 seconds
				expect(countdownComp.state.count).toBe(0);
				// end the asynch test
				done();
			}, 3001)
		});
	});
});