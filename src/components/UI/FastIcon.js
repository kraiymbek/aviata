import React from 'react';

import { SvgIcon } from '@material-ui/core';

import '../../../public/sprite.svg';

export default function FastIcon({
  iconName,
  text,
  ...rest
}) {
  return (
    <SvgIcon {...rest}>
      <use xlinkHref={`/sprite.svg#${iconName}`} />
    </SvgIcon>
  );
}
