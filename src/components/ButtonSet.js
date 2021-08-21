/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Box, Button as ThemeButton, Label, Slider, Text,
} from 'theme-ui';

const Button = ({
  label, command, description, variant, runCommand, cancelCommand,
}) => (
  <ThemeButton
    key={label}
    title={description}
    type="button"
    onMouseDown={() => runCommand(command)}
    onTouchStart={() => runCommand(command)}
    onMouseUp={() => runCommand(cancelCommand)}
    onTouchEnd={() => runCommand(cancelCommand)}
    mr={2}
    mb={2}
    variant={variant}
    sx={{
      userSelect: 'none',
      borderRadius: 5,
      '&:active': {
        opacity: 0.7,
        boxShadow: '0 0 5px white',
      },
    }}
  >
    {label}
  </ThemeButton>
);

function ButtonSet({
  defaultSpeed, buttons, sendMessage, sendJsonMessage,
}) {
  const [speed, setSpeed] = useState(defaultSpeed);

  function runCommand(command) {
    if (typeof command === 'string') {
      sendMessage(command);
    }
    if (typeof command === 'object') {
      sendJsonMessage(command);
    }
  }

  return (
    <Box>
      {buttons.map(({
        name, set, disabled,
      }) => {
        // Do not render disabled controls (see apiButtons.js)
        if (disabled) { return null; }

        return (
          <Box mb={3} key={name}>
            <Text mb={2} sx={{ display: 'block' }}>{name}</Text>
            {set?.map(({
              type, min, max, ...button
            }) => (
              type === 'range' ? (
                <Label key={button.command}>
                  <Text>
                    {
                      // eslint-disable-next-line prefer-template
                      button.label + ' ' + speed + '%'
                    }
                  </Text>
                  <Slider
                    defaultValue={defaultSpeed}
                    min={min}
                    max={max}
                    onChange={(e) => {
                      // TODO: add error handling here
                      // eslint-disable-next-line prefer-template
                      sendMessage(button.command + ' ' + e.target.value);
                      setSpeed(e.target.value);
                    }}
                  />
                </Label>
              ) : (
                <Button
                  key={button.command}
                  runCommand={runCommand}
                  variant="go"
                  {...button}
                />
              )
            ))}
          </Box>
        );
      })}
    </Box>
  );
}

export default ButtonSet;
