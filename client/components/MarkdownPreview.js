import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import Terminal from './Terminal';

function createMarkup(markup) {
  return { __html: markup };
}

export default class MarkdownPreview extends React.Component {
  state = {
    markup: marked(this.props.markdown),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.markdown !== this.props.markdown) {
      this.setState({ markup: marked(nextProps.markdown) });
    }
  }

  render() {
    const { markdown, ...props } = this.props;
    return (
      <Terminal {...props}>
        <div dangerouslySetInnerHTML={createMarkup(this.state.markup)} />
      </Terminal>
    );
  }
}

MarkdownPreview.propTypes = {
  markdown: PropTypes.string.isRequired,
};
