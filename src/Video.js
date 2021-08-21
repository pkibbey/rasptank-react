/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useRef } from 'react';
import { Box } from 'theme-ui';
import timeoutPromise from './utils/timeout-promise';

// Import environment variables to configure video server connection
const {
  REACT_APP_DOMAIN: DOMAIN,
} = process.env;

const TIMEOUT_WAIT = 1000; // seconds between fetching new video still
const REFRESH_TIMEOUT = 500;
const CANVAS_HEIGHT = 480;
const CANVAS_WIDTH = 640;

function Video() {
  const canvasRef = useRef();

  useEffect(() => {
    let timer;
    const image = new Image();
    image.crossOrigin = 'Anonymous';

    // TODO: instead of setting an interval, this should use promises.
    // and use a setTimeout once the promises are resolved,
    // and also put a timeout on the fetching, because if it's slow,
    // we want to skip it and get the next frame
    const fetchCameraImage = () => {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        return new Promise((resolve, reject) => {
          image.onload = () => {
            if (canvasRef.current) {
              context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
            resolve();
          };

          image.error = () => {
            // Stop loading the image
            window.stop();
            reject();
          };

          image.src = `http://${DOMAIN}:5000/video_feed?rand=${Math.random()}`;
        });
      }
      // Return a rejceted promise if canvas is not available
      return new Promise((resolve, reject) => reject());
    };

    // Cancel the image loading, if it fails to resolve within the timeout
    const fetchImage = () => timeoutPromise(
      TIMEOUT_WAIT, fetchCameraImage(),
    ).then(() => setTimeout(fetchImage, REFRESH_TIMEOUT)).catch((e) => {
      window.stop();
      setTimeout(fetchImage, REFRESH_TIMEOUT);
    });

    fetchImage();

    return () => {
      // TODO: cancel timers here
      canvasRef.current = false;
    };
  }, []);

  return (
    <Box p={3}>
      <canvas ref={canvasRef} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />
    </Box>
  );
}

export default Video;
