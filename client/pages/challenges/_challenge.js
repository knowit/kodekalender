import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { graphql, compose } from 'react-apollo';
import styled from 'react-emotion';
import FaFrownO from 'react-icons/lib/fa/frown-o';
import FaCheck from 'react-icons/lib/fa/check';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import gql from 'graphql-tag';
import isAfter from 'date-fns/is_after';
import Link from 'next/link';

import theme from '../../style/theme';
import Layout from '../../components/Layout';
import Flex from '../../components/Flex';
import defaultPage from '../../hocs/defaultPage';
import Button from '../../components/Button';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Box from '../../components/Box';
import Terminal from '../../components/Terminal';
import Container from '../../components/Container';
import Avatar from '../../components/Avatar';
import Error from '../_error';

const P = styled('p')`
  color: ${theme.colors.dark};
  font-size: 18px;
`;

const DiscussionSection = styled('section')`
  margin-top: 60px;
  padding: 40px 0;
  background: ${theme.colors.midnightBlue};
  color: ${theme.colors.grayLight};
  text-align: center;
  p {
    line-height: 2;
    margin-top: 1.5rem;
    color: inherit;
    margin-bottom: 40px;
  }
  h3 {
    font-size: 32px;
    line-height: 1.6;
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
    font-weight: normal;
  }
  a {
    border: 1px solid ${theme.colors.grayLight};
    color: ${theme.colors.grayLight};
    border-radius: 50px;
    font-size: 18px;
    padding: 5px 35px;
    text-transform: uppercase;
  }
`;

/**
 *
 *  Displayed if the user isn' logged in
 */
const AnonMessage = ({ isExpired }) => {
  if (isExpired) {
    return (
      <Box textAlign="center" mt={40}>
        <P>
          Det er for sent å svare på denne oppgaven, men hvis du{' '}
          <Link href="/auth/sign-in" prefetch>
            <a>logger inn</a>
          </Link>{' '}
          kan du se både fasit og diskusjonstråd.
        </P>
      </Box>
    );
  }
  return (
    <Box textAlign="center" mt={40}>
      <P>
        Du må{' '}
        <Link href="/auth/sign-in" prefetch>
          <a>logge inn</a>
        </Link>{' '}
        for å prøve deg på denne oppgaven!
      </P>
    </Box>
  );
};

class AnswerForm extends React.Component {
  state = {
    answer: '',
    isSubmitting: false,
  };

  static propTypes = {
    isAnonymous: PropTypes.bool.isRequired,
    onCheckAnswer: PropTypes.func.isRequired,
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    await this.props.onCheckAnswer(this.state.answer);
    this.setState({ isSubmitting: false });
  };

  render() {
    return (
      <form>
        <Label>Din besvarelse</Label>
        <Input
          aria-label="Answer"
          type="text"
          value={this.state.answer}
          style={{ marginBottom: '15px' }}
          placeholder="Svar"
          required
          onChange={event =>
            this.setState({
              answer: event.target.value,
            })
          }
        />
        <Box textAlign="center">
          <Button
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.props.isAnonymous || this.state.isSubmitting}
          >
            Avgi svar
          </Button>
        </Box>
      </form>
    );
  }
}

class Challenge extends React.Component {
  state = {
    wasCorrect: false,
    // We aslo get this when we answer correctly
    discussionUrl: null,
    wasWrong: false,
    revealAnswer: false,
    //discussionUrl: null,
  };

  handleCheckAnswer = async answer => {
    try {
      this.setState({ isSubmitting: true, wasWrong: false });
      const res = await this.props.checkAnswer(
        this.props.router.query.id,
        answer,
      );
      if (res.data.checkAnswer.correct === true) {
        this.setState({
          wasCorrect: true,
          discussionUrl: res.data.checkAnswer.discussionUrl,
        });
      } else {
        this.setState({ wasWrong: true });
      }
    } catch (err) {
      this.setState({ wasWrong: true });
    }
  };

  renderAnswerMessage = () => {
    if (!this.state.wasCorrect && !this.state.wasWrong) {
      return null;
    }

    return (
      <Flex my={20} justify="center" align="center">
        <P>{this.state.wasCorrect ? 'You did it!' : 'Nope...'}</P>
        <Avatar
          style={{
            background: this.state.wasCorrect
              ? theme.colors.success
              : theme.colors.danger,
            color: theme.colors.white,
            marginLeft: '10px',
          }}
        >
          {this.state.wasCorrect ? (
            <FaCheck size={30} />
          ) : (
            <FaFrownO size={30} />
          )}
        </Avatar>
      </Flex>
    );
  };

  render() {
    const {
      loggedInUser,
      checkAnswer,
      data: { loading, error, challenge },
      answerData,
    } = this.props;

    const { getAnswer } = answerData || {};

    // Error page if no challenge or error
    if (loading == false && error != null && challenge == null) {
      return <Error statusCode={404} />;
    }

    if (this.props.answerData && this.props.answerData.error != null) {
      return <Error />;
    }

    const now = new Date();

    // If we are before the activeFrom, render error
    if (
      challenge != null &&
      challenge.activeFrom &&
      new Date(challenge.activeFrom) > now
    ) {
      return <Error />;
    }

    const isAnonymous = !loggedInUser;
    const isExpired = challenge && new Date(challenge.activeTo) < now;
    const isSolved = challenge && challenge._solutionsMeta.count > 0;

    return (
      <Layout loggedInUser={loggedInUser}>
        {challenge && (
          <Head>
            <title>Kodekalender: {challenge.title}</title>
          </Head>
        )}
        <Container>
          {challenge && <h1>{challenge.title}</h1>}
          <Box my={50}>
            <Terminal>
              {challenge ? (
                <div dangerouslySetInnerHTML={{ __html: challenge.markup }} />
              ) : (
                'Loading...'
              )}
            </Terminal>
          </Box>

          {/* Render the answer form if applicable */}
          {challenge &&
            !(isExpired || isSolved || this.state.wasCorrect) && (
              <AnswerForm
                isAnonymous={isAnonymous}
                onCheckAnswer={this.handleCheckAnswer}
              />
            )}

          {/* If our answer was wrong */}
          {this.state.wasWrong && (
            <Box textAlign="center" my={40}>
              <Avatar
                style={{
                  background: theme.colors.danger,
                  color: theme.colors.white,
                }}
              >
                <FaFrownO size={30} />
              </Avatar>
              <P>Svaret er feil. Prøv igjen!</P>
            </Box>
          )}

          {/* if we just solved solved it */}
          {this.state.wasCorrect && (
            <Box textAlign="center" my={40}>
              <Avatar
                style={{
                  background: theme.colors.success,
                  color: theme.colors.white,
                }}
              >
                <FaCheck size={30} />
              </Avatar>
              <Box>
                <P>Bra jobba!</P>
                <P>Kanskje du vil dele løsningen din med andre?</P>
              </Box>
            </Box>
          )}

          {/* If we're logged in, unsolved and we've expired... */}
          {!isAnonymous &&
            !isSolved &&
            isExpired && (
              <Box textAlign="center" my={40}>
                <P>Denne oppgaven er ikke lenger aktiv.</P>
              </Box>
            )}

          {/* if we've already solved it */}
          {isSolved && (
            <Box textAlign="center" my={40}>
              <Avatar
                style={{
                  background: theme.colors.success,
                  color: theme.colors.white,
                }}
              >
                <FaCheck size={30} />
              </Avatar>
              <Box>
                <P>Denne har du allerede løst!</P>
              </Box>
            </Box>
          )}

          {/* Render Reveal answer button if applicable */}
          {(isSolved || isExpired) && (
            <Box textAlign="center">
              {this.state.revealAnswer ? (
                <P>
                  Svaret er...{' '}
                  <span css={`font-family: ${theme.fontFamilyCode};`}>
                    {getAnswer.answer}
                  </span>
                </P>
              ) : (
                <Button
                  disabled={isAnonymous}
                  onClick={() => this.setState({ revealAnswer: true })}
                >
                  Se løsning
                </Button>
              )}
            </Box>
          )}

          {/* Render login message to anon users */}
          {isAnonymous && <AnonMessage isExpired={isExpired} />}
        </Container>

        {/* If we're logged in, or we've solved the challegne, or it has expired, then we should be able to render here */}
        {(this.state.discussionUrl ||
          (getAnswer && getAnswer.discussionUrl)) && (
          <DiscussionSection>
            <Container>
              <h3>Diskusjon</h3>
              <P>
                Diskuter løsninger, algoritmer og kjøretider for denne oppgaven
                her.
              </P>
              <a href={this.state.discussionUrl || getAnswer.discussionUrl}>
                gist <FaExternalLink />
              </a>
            </Container>
          </DiscussionSection>
        )}
      </Layout>
    );
  }
}

Challenge.propTypes = {
  loggedInUser: PropTypes.shape({
    userId: PropTypes.string,
  }),
};

const getChallenge = gql`
  query getChallenge($challengeId: ID!, $userId: ID) {
    challenge: Challenge(id: $challengeId) {
      id
      title
      markup
      activeFrom
      activeTo
      _solutionsMeta(
        first: 1
        filter: { solved: true, user: { id: $userId } }
      ) {
        count
      }
    }
  }
`;

const getAnswer = gql`
  query getAnswer($challengeId: ID!) {
    getAnswer(challengeId: $challengeId) {
      answer
      discussionUrl
    }
  }
`;

const checkAnswer = gql`
  mutation checkAnswer($challengeId: String!, $answer: String!) {
    checkAnswer(challengeId: $challengeId, answer: $answer) {
      correct
      discussionUrl
    }
  }
`;

export default compose(
  defaultPage,
  withRouter,
  graphql(checkAnswer, {
    props: ({ mutate }) => ({
      checkAnswer: (challengeId, answer) =>
        mutate({ variables: { challengeId, answer } }),
    }),
  }),
  graphql(getChallenge, {
    options: ({ router, loggedInUser }) => ({
      variables: {
        challengeId: router.query.id,
        userId: loggedInUser ? loggedInUser.userId : null,
      },
    }),
  }),
  // Automatically get the answer if the right conditions apply.
  // We must be logged in, we've solved it, or it is no longer active
  graphql(getAnswer, {
    name: 'answerData',
    skip: ({ loggedInUser, data: { challenge } }) => {
      // If we're anonymous or we have no challenge, we skip
      if (!loggedInUser || !challenge) {
        return true;
      }

      // If we've solved this challenge, we'll fetch
      if (challenge._solutionsMeta.count > 0) {
        return false;
      }

      // If the challenge is no longer active, we'll fetch!
      if (new Date(challenge.activeTo) < new Date()) {
        return false;
      }

      return true;
    },
    options: ({ router }) => ({
      variables: {
        challengeId: router.query.id,
      },
    }),
  }),
)(Challenge);
