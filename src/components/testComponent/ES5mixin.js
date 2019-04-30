import React from 'react';

var SetIntervalMixin = {
  componentDidMount: function () {
    this.intervals = []
  },
  setInterval: function () {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function () {
    this.intervals.forEach(clearInterval);
  }
};

var Demo1 = React.createClass({
  mixins: [SetIntervalMixin],
  getDefaultProps: function () {
  },
  getInitialState: function () {
  },
  render: function () {
    return (<div>Demo1</div>)
  }
});

var Demo2 = React.createClass({
  mixins: [SetIntervalMixin],
  getDefaultProps: function () {
  },
  getInitialState: function () {
  },
  render: function () {
    return (<div>Demo2</div>)
  }
});
