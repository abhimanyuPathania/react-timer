var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');

// 'jQuery' as defined in externals property in webpack config
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Controls', () => {
	it('should exist', () => {
		expect(Controls).toExist();
	});

	describe('render', () => {
		it('should render Pause button when started', () => {
			var controlsComp = TestUtils.renderIntoDocument(<Controls countdownStatus='started'/>);
			// find the controlsComp(root) in the the DOM
			var $el = $(ReactDOM.findDOMNode(controlsComp));

			// search for button whose text is 'Pause'
			// the ':contains' filter of jquery matches the text of the element
			var $pauseButton = $el.find('button:contains(Pause)');

			expect($pauseButton.length).toBe(1);
		});

		it('should render Start button when paused', () => {
			var controlsComp = TestUtils.renderIntoDocument(<Controls countdownStatus='paused'/>);
			// find the controlsComp(root) in the the DOM
			var $el = $(ReactDOM.findDOMNode(controlsComp));

			// search for button whose text is 'Pause'
			// the ':contains' filter of jquery matches the text of the element
			var $pauseButton = $el.find('button:contains(Start)');

			expect($pauseButton.length).toBe(1);
		});
	});
});