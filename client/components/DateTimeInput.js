import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';
import Head from 'next/head';
import Input from './Input';

const FORMAT_PATTERN = 'd.m.y - H:i';

export default class DateTimeInput extends React.Component {
  componentDidMount() {
    const options = this.getOptions(this.props);
    this.flatpickr = new Flatpickr(this.node, options);
    this.setValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setValue(nextProps);

    const options = this.getOptions(nextProps);
    this.flatpickr.set(options);
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  // Flatpickr passes an array, even for single value inputs
  onChange = (selectedDates, dateStr) => {
    const value = selectedDates[0] || null;
    // Handles an issue where we got in an eternal loop if value was null
    // because the setting of options in componentWillReceiveProps would trigger
    // onChange
    if (value !== this.props.value) {
      this.props.onChange(value, dateStr);
    }
  };

  // Add our own onChange handler as a hook
  getOptions(props) {
    //const { options } = props;
    const options = {
      time_24hr: true,
      enableTime: true,
      dateFormat: FORMAT_PATTERN,
    };
    // The hook handlers apparently needs be set as an array...?
    options.onChange = [this.onChange];
    return options;
  }

  setValue(props) {
    if ('value' in props) {
      // The second parameter here makes sure we don't trigger the onChange
      this.flatpickr.setDate(props.value, false);
    }
  }

  render() {
    // Important we don't pass value and onChange here. Handled in lifecycle methods
    const { className, options, value, onChange, ...props } = this.props;
    // Cheekily add the CSS needed to render Flatpickr
    // Have to update the css link everytime we upgrade Flatpickr though :/
    return [
      <Head key="css">
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.1.2/flatpickr.min.css"
        />
      </Head>,
      <Input
        key="input"
        className={className ? `input ${className}` : 'input'}
        {...props}
        innerRef={node => {
          this.node = node;
        }}
      />,
    ];
  }
}

DateTimeInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
