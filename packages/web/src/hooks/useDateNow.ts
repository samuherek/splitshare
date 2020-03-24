import React from 'react';
import { useDateUtils } from '../libs/date-utils';

function useDateNow() {
  const utils = useDateUtils();
  const now = React.useRef(utils.date());

  return now.current!;
}

export default useDateNow;
