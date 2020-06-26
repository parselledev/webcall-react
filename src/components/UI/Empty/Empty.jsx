import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSadTear} from '@fortawesome/free-solid-svg-icons'
import './Empty.sass';

const Empty = ({text}) => (
  <div className="c-empty">
    <FontAwesomeIcon className="c-empty__icon" icon={faSadTear}/>
    <p className="c-empty__title">
      Nothing found<br/>
      {text}
    </p>
  </div>
)

export default Empty;