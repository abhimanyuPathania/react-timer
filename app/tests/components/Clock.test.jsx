var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');

// 'jQuery' as defined in externals property in webpack config
var $ = require('jQuery');

var TestUtils = require('react-addons-test-utils');

var Clock = require('Clock');

describe('Clock', function () {

	it('should exist', function (){
		expect(Clock).toExist();
	})

	// test to check the actual rendered output of a components
	describe('render', function () {
		it('should render clock to output', function () {
			var clockComp = TestUtils.renderIntoDocument(<Clock totalSeconds={62} />);

			// find the clockComp(root) in the the DOM
			var $el = $(ReactDOM.findDOMNode(clockComp));

			// create jQuery object out of it and use find to locate the span and 
			// extract the text it displays
			var actualText = $el.find('.clock-text').text();

			expect(actualText).toBe('01:02');
		});
	});

	describe('formatSeconds', function() {
		it('should format seconds', function (){

			// we need to render the react components in order to access it methods
			var clock = TestUtils.renderIntoDocument(<Clock />);

			var seconds = 615;
			var expected = '10:15';
			var actual = clock.formatSeconds(seconds);
			expect(actual).toBe(expected);
		});

		it('should format seconds when min/sec < 10', function (){

			// we need to render the react components in order to access it methods
			var clock = TestUtils.renderIntoDocument(<Clock />);

			var seconds = 61;
			var expected = '01:01';
			var actual = clock.formatSeconds(seconds);
			expect(actual).toBe(expected);
		});
	});

});