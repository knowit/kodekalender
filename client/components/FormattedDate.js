import format from 'date-fns/format';

const PATTERN = 'DD.MM.YYYY - hh:mm';

const FormattedDate = ({ value }) => <time>{format(value, PATTERN)}</time>;

export default FormattedDate;
