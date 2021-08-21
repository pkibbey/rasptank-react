/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Box, Spinner, Text } from 'theme-ui';
import apiButtons from './apiButtons';
import ButtonSet from './ButtonSet';
import Video from './Video';

// Import environment variables
const {
  REACT_APP_DOMAIN: DOMAIN,
  REACT_APP_PORT: PORT,
  REACT_APP_ENABLE_VIDEO: ENABLE_VIDEO,
} = process.env;

const DEFAULT_SPEED = 25; // percentage (0 to 100)
const INFO_UPDATE_SPEED = 10000; // fetch info every 10 seconds

function UsageData({ data }) {
  return (
    <Box mb={4} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <Text>{`CPU temp: ${data[0]}°C`}</Text>
      <Text>{`CPU usage: ${data[1]}%`}</Text>
      <Text>{`RAM usage: ${data[2]}Mb (/ 8Mb)`}</Text>
    </Box>
  );
}

function App() {
  // Setup websocket
  const {
    sendMessage,
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(`ws://${DOMAIN}:${PORT}`);

  const [usageData, setUsageData] = useState({});

  // TODO: see if I can open the router to prioritize websocket traffic

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  // Send login message on startup
  useEffect(() => {
    // This will authorize the connection and start to recieve messages
    sendMessage('admin:123456');
  }, []);

  useEffect(() => {
    let timer;
    // When the player is connected...
    if (readyState === ReadyState.OPEN) {
      // Set the movement speed to 25% initially
      sendMessage(`wsB ${DEFAULT_SPEED}`);

      // Fetch the usage data
      clearInterval(timer);
      timer = setInterval(() => sendMessage('get_info'), INFO_UPDATE_SPEED);
    }
    return () => clearInterval(timer);
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage?.data) {
      setUsageData(lastJsonMessage.data);
    }
  }, [lastJsonMessage]);

  // If we are not not connected, load the waiting graphic
  if (readyState !== ReadyState.OPEN && readyState !== ReadyState.CLOSING) {
    return (
      <Box
        p={3}
        sx={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box mb={3}>{`Websocket ${connectionStatus}`}</Box>
      <UsageData data={usageData} />
      <ButtonSet
        buttons={apiButtons}
        sendMessage={sendMessage}
        sendJsonMessage={sendJsonMessage}
        defaultSpeed={DEFAULT_SPEED}
      />
      {ENABLE_VIDEO === 'true' && <Video />}
    </Box>
  );
}

export default App;
