var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
// 'jQuery' as defined in externals property in webpack config
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var CountdownForm = require('CountdownForm');

describe('CountdownForm', () => {

	it('should exist', () => {
		expect(CountdownForm).toExist();
	});

	it('should call onSetCountdown if valid seconds entered', () => {
		var spy = expect.createSpy();

		// use spy in place of function being recieved from the parent(Countdown) component
		var countdownFormComp = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);

		// find the clockComp(root) in the the DOM
		var $el = $(ReactDOM.findDOMNode(countdownFormComp));

		// simulate the value in the input field
		countdownFormComp.refs.seconds.value = '109';

		// simulate submit be passing the form element that gets submitted
		TestUtils.Simulate.submit($el.find('form')[0])

		// now check if the spy has been called
		// it should be called with the number 109
		expect(spy).toHaveBeenCalledWith(109);
	});

	it('should not call onSetCountdown if invalid seconds entered', () => {
		var spy = expect.createSpy();

		// use spy in place of function being recieved from the parent(Countdown) component
		var countdownFormComp = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);

		// find the clockComp(root) in the the DOM
		var $el = $(ReactDOM.findDOMNode(countdownFormComp));

		// simulate the value in the input field
		countdownFormComp.refs.seconds.value = '109as';

		// simulate submit be passing the form element that gets submitted
		TestUtils.Simulate.submit($el.find('form')[0])

		// now check if the spy has been called
		// it should be called with the number 109
		expect(spy).toNotHaveBeenCalled();
	});
});
