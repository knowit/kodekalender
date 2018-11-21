import React from 'react';
import { css, cx } from 'react-emotion';

const Heading = ({ className, size, ...props }) => {
  const Component = `h${size}`;
  return (
    <Component
      className={cx(
        styles.base,
        {
          [styles.h1]: size == 1,
          [styles.h2]: size == 2,
          [styles.h3]: size == 3,
          [styles.h4]: size == 4,
          [styles.h5]: size == 5,
          [styles.h6]: size == 6,
        },
        className,
      )}
      {...props}
    />
  );
};

Heading.defaultProps = {
  size: 1,
};

export default Heading;

const styles = {
  base: css`
    margin: 0;
    margin-bottom: 2rem;
    font-weight: 400;
  `,
  h1: css`
    font-size: 3.3125rem;
  `,
  h2: css`
    font-size: 2.25rem;
  `,
  h3: css`
    font-size: 1.5625rem;
  `,
  h4: css`
    font-size: 1.125rem;
  `,
  h5: css`
    font-size: 1.0625rem;
  `,
  h6: css`
    font-size: 0.75rem;
  `,
};
