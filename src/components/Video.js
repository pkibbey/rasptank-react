/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, {
  useEffect, useRef, useCallback,
} from 'react';
import { Box } from 'theme-ui';
import { useMeasure } from 'react-use';
import timeoutPromise from '../utils/timeout-promise';

// Import environment variables to configure video server connection
const {
  REACT_APP_DOMAIN: DOMAIN,
} = process.env;

const REFRESH_TIMEOUT = 2000;
const CANVAS_HEIGHT = 393;
const CANVAS_WIDTH = 851;

function Video() {
  const canvasRef = useRef();
  const [measureRef, { width, height }] = useMeasure();
  const image = new Image();
  image.crossOrigin = 'Anonymous';

  const drawCanvas = (context) => {
    if (canvasRef.current) {
      context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  const fetchCameraImage = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      return new Promise((resolve, reject) => {
        image.onload = () => {
          drawCanvas(context);
          resolve();
        };

        image.error = () => {
          window.stop(); // Stop loading the image
          reject();
        };

        image.src = `http://${DOMAIN}:5000/video_feed?rand=${Math.random()}`;
      });
    }
    // Return a rejceted promise if canvas is not available
    return new Promise((resolve, reject) => reject());
  };

  useEffect(() => {
    let timer;

    // Cancel the image loading, if it fails to resolve within the timeout
    const fetchImage = () => {
      fetchCameraImage(image)
        .then(() => {
          clearInterval(timer);
          timer = setTimeout(fetchImage, REFRESH_TIMEOUT);
        })
        .catch((e) => {
          window.stop();
          clearInterval(timer);
          timer = setTimeout(fetchImage, REFRESH_TIMEOUT);
        });
    };

    fetchImage();
  }, []);

  useEffect(() => () => {
    canvasRef.current = false;
  }, []);

  return (
    <Box
      ref={measureRef}
      sx={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
      }}
    >
      <canvas ref={canvasRef} height={height} width={width} />
    </Box>
  );
}

export default Video;
