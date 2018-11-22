import React from 'react';
import styles from './styles';

const DroppingSnowman = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="286" height="380">
    <g className={styles}>
      <path
        d="M20.302 221.826c-6.899 83.792 106.271 110.246 149.672 47.643 66.067-95.28-140.192-162.068-149.672-47.643z"
        className="snowman_body"
      />
      <path
        d="M62.978 157.992c-5.486 2.424-8.756 6.673-7.191 13.735 1.887 8.643 12.927 16.689 20.227 20.237 18.053 8.676 44.348 8.364 61.527-3.758 29.854-21.115-24.191-30.144-37.011-31.832-7.625-1.018-26.839-3.159-37.552 1.618z"
        className="scarf"
      />
      <path
        d="M88.509 177.525c-18.559 6.252-29.452 33.552-28.112 51.221l.365.353c8.537-1.302 15 3.198 22.443 6.22-.542-15.985.146-31.726 13.332-43.214.143-.106.143-.106 0 0-4.759 8.534-6.463 21.221-6.463 30.845 6.247-2.494 13.292-3.97 19.828-1.826-1.124-12.893-1.924-27.72 8.281-37.698-4.831-2.986-10.494-5.587-16.126-6.641l-13.548.74z"
        className="scarf_knot"
      />
      <path
        d="M145.783 120.573c-2.77-5.274-6.473-9.863-11.039-13.207-2.725-2.003-5.629-3.761-8.606-5.304-53.638-23.395-72.567 27.193-72.604 27.261-2.471 8.272-2.59 17.065.24 25.173a36.644 36.644 0 0 0 5.499 10.204c16.309 21.327 54.842 28.984 77.794 12.79 16.627-11.768 18.374-38.53 8.716-56.917z"
        className="snowman_head"
      />
      <g className="hat">
        <path
          d="M45.071 104.135l6.829 12.61c34.1-33.933 65.013-19.442 65.013-19.442l-1.961-14.935c-24.915.914-49.505 6.957-69.881 21.767z"
          className="hat-ribbon"
        />
        <path
          d="M112.882 63.362s-8.829-9.698-36.575-5.148C37.661 64.555 35.338 85.67 35.338 85.67l9.733 18.465c20.376-14.81 44.966-20.853 69.881-21.766l-2.07-19.007z"
          className="hat-top"
        />
        <path
          d="M53.534 129.075c.036-.068 25.632-34.575 72.603-27.137a65.438 65.438 0 0 1 8.606 5.366c4.566 3.344 8.269 7.964 11.039 13.238 9.431-9.731 8.321-22.45-4.971-27.139-20.632-7.306-44.275-2.84-64.322 4.855-16.056 6.149-33.525 18.058-36.938 35.628C37.229 145.866 42.802 151 53.768 154h.006c-2.829-8-2.711-16.653-.24-24.925z"
          className="hat-bottom"
        />
      </g>
      <path
        d="M104.781 143.55c-1.708 18.2 27.856 10.402 38.028 9.453 7.191-.669 13.764-1.581 20.483-2.495 6.539-.845 6.792-2.953.545-5.095-7.264-2.53-14.02-5.127-22.008-8.219-7.048-2.707-21.612-6.956-29.092-5.059-4.214 1.055-7.301 4.32-7.956 11.415z"
        className="nose"
      />
      <path
        d="M84.079 158.94c-.91.492-2.034.106-2.506-.842-.439-.913.036-1.932.98-2.321.944-.421 2.034 0 2.433.878.436.81 0 1.864-.907 2.285z"
        className="mouth-1"
      />
      <path
        d="M88.292 164.63c-.691.739-2.034.881-2.651-.036-.688-.878-.582-2.07.292-2.633.834-.527 1.961-.457 2.502.212.439.772.549 1.72-.143 2.457z"
        className="mouth-2"
      />
      <path
        d="M94.43 168.426c-.472.88-1.635 1.263-2.579.81-1.017-.353-1.236-1.652-.654-2.462.581-.842 1.562-.984 2.469-.701.874.385 1.199 1.44.764 2.353z"
        className="mouth-3"
      />
      <path
        d="M101.222 170.849c-.256.948-1.309 1.511-2.326 1.266-1.017-.283-1.559-1.231-1.163-2.215.329-.913 1.382-1.475 2.289-1.231.945.213 1.456 1.197 1.2 2.18z"
        className="mouth-4"
      />
      <path
        d="M108.376 172.151c-.109.984-1.053 1.72-2.107 1.578-1.053-.106-1.741-.983-1.525-2.002.18-.913 1.126-1.649 2.07-1.543.981.07 1.672.983 1.562 1.967z"
        className="mouth-5"
      />
      <path
        d="M115.64 172.36c.036 1.019-.761 1.864-1.814 1.935-1.053.103-1.891-.739-1.817-1.793.036-.948.837-1.758 1.817-1.829.944-.071 1.742.703 1.814 1.687z"
        className="mouth-6"
      />
      <path
        d="M122.831 171.412c.256.948-.399 1.967-1.452 2.212-1.017.318-1.964-.418-2.107-1.437-.109-.983.545-1.829 1.452-2.109.908-.248 1.852.385 2.107 1.334z"
        className="mouth-7"
      />
      <path
        d="M129.587 168.953c.508.878.146 2.002-.837 2.494-.907.598-2.034.035-2.393-.913-.329-.948.107-1.864.871-2.388.797-.424 1.887-.071 2.359.807z"
        className="mouth-8"
      />
      <path
        d="M135.252 164.665c.798.669.834 1.864.073 2.671-.761.81-1.888.775-2.542-.103-.545-.739-.545-1.932 0-2.568.619-.666 1.708-.63 2.469 0z"
        className="mouth-9"
      />
      <path
        d="M138.994 158.763c.944.318 1.416 1.408 1.017 2.426-.399 1.019-1.452 1.369-2.323.842-.874-.527-1.346-1.617-1.053-2.426.326-.842 1.379-1.192 2.359-.842z"
        className="mouth-10"
      />
      <path
        d="M94.939 125.986c4.396-2.494.581-8.746-3.775-6.535-4.579 2.318-1.127 9.309 3.775 6.535z"
        className="eye_left"
      />
      <path
        d="M127.663 123.63c4.393-2.456.582-8.746-3.778-6.497-4.576 2.318-1.127 9.274 3.778 6.497z"
        className="eye_right"
      />
      <path
        d="M134.053 227.38c13.039-2.391 12.205-20.626-2.323-18.904-14.963 1.83-11.839 21.502 2.323 18.904z"
        className="button_top"
      />
      <path
        d="M130.022 262.687c11.696 1.157 17.289-16.336 5.267-19.219-11.767-2.809-20.084 17.708-5.267 19.219z"
        className="button_bottom"
      />
    </g>
  </svg>
);

export default DroppingSnowman;
