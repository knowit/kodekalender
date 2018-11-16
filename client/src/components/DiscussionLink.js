import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default ({ url }) => (
  <div css={{ marginTop: '3rem', textAlign: 'center' }}>
    <a href={url} css={{ fontSize: '1.2rem' }}>
      Diskusjonstråd <FaExternalLinkAlt />
    </a>
    <small css={{ display: 'block', marginTop: '0.5rem' }}>
      Diskuter oppgaven, løsninger og kjøretid
    </small>
  </div>
);
