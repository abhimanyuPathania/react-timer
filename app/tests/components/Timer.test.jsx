var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
// 'jQuery' as defined in externals property in webpack config
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
	it('it should exist', () => {
		expect(Timer).toExist();
	});

	it('should start when started', (done) => {
		var timerComp = TestUtils.renderIntoDocument(<Timer/>);
		timerComp.handleStatusChange('started');
		expect(timerComp.state.count).toBe(0);

		setTimeout(() => {
			expect(timerComp.state.timerStatus).toBe('started');
			expect(timerComp.state.count).toBe(1);
			done();
		}, 1001)
	});

	it('should pause timer on paused status', (done) => {
		var timerComp = TestUtils.renderIntoDocument(<Timer/>);
		var dummyState = 10;

		timerComp.setState({count: dummyState});
		timerComp.handleStatusChange('paused');

		setTimeout(() => {
			expect(timerComp.state.timerStatus).toBe('paused');
			expect(timerComp.state.count).toBe(dummyState);
			done();
		}, 2001)
	});

	it('should clear count on stopped status', (done) => {
		var timerComp = TestUtils.renderIntoDocument(<Timer/>);
		var dummyState = 10;

		timerComp.setState({count: dummyState});
		timerComp.handleStatusChange('started');
		timerComp.handleStatusChange('stopped');

		setTimeout(() => {
			expect(timerComp.state.timerStatus).toBe('stopped');
			expect(timerComp.state.count).toBe(0);
			done();
		}, 2001)
	});
});
