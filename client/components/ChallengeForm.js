import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import Yup from 'yup';

import Box from './Box';
import Flex from './Flex';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import Label from './Label';
import DateTimeInput from './DateTimeInput';
import MarkdownPreview from './MarkdownPreview';

const FormGroup = ({ children, ...props }) => (
  <Box mb={20} {...props}>
    {children}
  </Box>
);
const Error = ({ children }) => <p>{children}</p>;

class Form extends React.Component {
  state = {
    showPreview: false,
  };

  render() {
    const {
      values,
      handleChange,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      errors,
      touched,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={values.title}
            required
          />
          {touched.title && errors.title && <Error>{errors.title}</Error>}
        </FormGroup>

        <FormGroup>
          <span style={{ float: 'right' }}>
            <a
              role="button"
              onClick={() => this.setState({ showPreview: false })}
            >
              Write
            </a>{' '}
            <a
              role="button"
              onClick={() => this.setState({ showPreview: true })}
            >
              Preview
            </a>
          </span>
          <Label>Text</Label>
          {this.state.showPreview ? (
            <MarkdownPreview markdown={values.markdown} />
          ) : (
            <Textarea
              name="markdown"
              onChange={handleChange}
              value={values.markdown}
              placeholder="Markdown"
              required
            />
          )}
          {touched.markdown &&
            errors.markdown && <Error>{errors.markdown}</Error>}
        </FormGroup>

        <Flex justify="space-between">
          <FormGroup w={0.45}>
            <Label>Active from</Label>
            <DateTimeInput
              value={values.activeFrom}
              onChange={date => setFieldValue('activeFrom', date)}
              placeholder="Active from"
              required
            />
            {touched.activeFrom &&
              errors.activeFrom && <Error>{errors.activeFrom}</Error>}
          </FormGroup>

          <FormGroup w={0.45}>
            <Label>Active to</Label>
            <DateTimeInput
              value={values.activeTo}
              onChange={date => setFieldValue('activeTo', date)}
              placeholder="Active to"
              required
            />
            {touched.activeTo &&
              errors.activeTo && <Error>{errors.activeTo}</Error>}
          </FormGroup>
        </Flex>

        <FormGroup>
          <Label>Answer</Label>
          <Input
            type="text"
            name="answer"
            placeholder="Answer"
            onChange={handleChange}
            value={values.answer}
            required
          />
          {touched.answer && errors.answer && <Error>{errors.answer}</Error>}
        </FormGroup>

        <FormGroup>
          <label>
            <input
              type="checkbox"
              name="published"
              checked={values.published}
              onChange={handleChange}
            />
            Published
          </label>
        </FormGroup>
        <FormGroup>
          <Label>Gist URL</Label>
          <Input
            type="text"
            name="discussionUrl"
            placeholder="Gist URL"
            onChange={handleChange}
            value={values.discussionUrl}
            required
          />
          {touched.discussionUrl &&
            errors.discussionUrl && <Error>{errors.discussionUrl}</Error>}
        </FormGroup>
        <FormGroup>
          <Label>Admin notes</Label>
          <Textarea
            name="notes"
            onChange={handleChange}
            value={values.notes}
            placeholder="Admin notes. Not visible for normal users"
          />
          {touched.notes && errors.notes && <Error>{errors.notes}</Error>}
        </FormGroup>

        {errors._error && <div>{errors._error}</div>}

        <Box textAlign="right">
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </Box>
      </form>
    );
  }
}

const ChallengeForm = withFormik({
  mapPropsToValues: props => {
    const challenge = props.challenge || {};
    return {
      title: challenge.title || '',
      answer: challenge.answer || '',
      markdown: challenge.markdown || '',
      notes: challenge.notes || '',
      activeFrom: challenge.activeFrom,
      activeTo: challenge.activeTo,
      id: challenge.id,
      published: challenge.published || false,
      discussionUrl: challenge.discussionUrl || '',
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    markdown: Yup.string().required(),
    answer: Yup.string().required(),
    published: Yup.boolean().required(),
    notes: Yup.string(),
    // Required when advent calendar
    activeFrom: Yup.date().required(),
    activeTo: Yup.date().required(),
    discussionUrl: Yup.string()
      .url()
      .required('En Gist lenke er påkrevd'),
  }),
  handleSubmit: async (
    values,
    { props, setSubmitting, setErrors, resetForm },
  ) => {
    try {
      await props.saveChallenge(values);
      props.challenge == null && resetForm();
    } catch (err) {
      setErrors({ _error: err.message });
    } finally {
      setSubmitting(false);
    }
  },
})(Form);

ChallengeForm.propTypes = {
  challenge: PropTypes.object,
  saveChallenge: PropTypes.func.isRequired,
};

export default ChallengeForm;
