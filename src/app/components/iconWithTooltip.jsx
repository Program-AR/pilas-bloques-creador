import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export default ({ name, tooltip, iconClass }) => (
  <div style={ {display: "inline-block"} }>
    <OverlayTrigger trigger={['hover']} placement="bottom" delayShow={450} overlay={_buildTooltip(`${name}Tooltip`, tooltip)}>
      <i className={iconClass}></i>
    </OverlayTrigger>
  </div>
)

const _buildTooltip = (id,text) => (
  <Popover id={id} title="">
    {text}
  </Popover>
)