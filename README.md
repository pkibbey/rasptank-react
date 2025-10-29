# rasptank-react: Control Your RaspTank with Ease

## A Modern React App for Seamless Adeept RaspTank Management

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Version](https://img.shields.io/badge/version--0.1.0-blue)]()

## About

rasptank-react is a React application designed to provide an intuitive and modern interface for controlling your Adeept RaspTank.  It replaces the often-cumbersome original control software with a clean, responsive web application that can be accessed from any device on your network.  This project aims to simplify tank management, allowing users of all skill levels to easily monitor and adjust parameters like motor speeds, pump status, temperature readings, and more.  It's built with a focus on user experience and extensibility, making it easy to add new features and integrations in the future.

## Key Features 🚀

*   **Real-time Monitoring:** View live data from your RaspTank sensors, including temperature, water level, and motor status.
*   **Motor Control:** Precisely control the speed and direction of your tank's motors.
*   **Pump Management:** Easily toggle the water pump on and off.
*   **Customizable Presets:** Create and save custom control profiles for different tank scenarios (e.g., cleaning, feeding).
*   **Responsive Design:** Access and control your RaspTank from any device – desktop, tablet, or smartphone.
*   **Data Logging (Future):**  Ability to log sensor data for analysis and historical tracking.

## Getting Started 🛠️

### Prerequisites

*   **Node.js:**  Version 16 or higher is recommended. Download from [https://nodejs.org/](https://nodejs.org/)
*   **npm:**  Comes bundled with Node.js. Verify installation by running `npm -v` in your terminal.
*   **Raspberry Pi:**  You'll need a Raspberry Pi running the Adeept RaspTank firmware.
*   **Adeept RaspTank:**  The physical tank and associated hardware.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/pkibbey/rasptank-react.git
    cd rasptank-react
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the Backend (Important!):**
    *   The frontend relies on a backend server to communicate with the RaspTank.  You'll need to set up a simple Node.js server (e.g., using Express) that can send commands to the RaspTank via serial communication and retrieve sensor data.  A basic example backend is provided in the `/backend` directory, but you may need to adapt it based on your RaspTank configuration and serial port settings.
    *   **Serial Port Configuration:**  Ensure the backend is configured with the correct serial port and baud rate for your RaspTank. This information can be found in the Adeept documentation.
    *   **Environment Variables:**  Set environment variables for your backend (e.g., `SERIAL_PORT`, `BAUD_RATE`) to avoid hardcoding these values in your code.

4.  **Start the Development Server:**
    ```bash
    npm start
    ```

    This will launch a development server, typically on `http://localhost:3000`.

## Usage 🕹️

Once the development server is running, open your web browser and navigate to `http://localhost:3000`. You should see the rasptank-react interface.

**Example 1: Controlling Motor Speed**

The main screen displays sliders for controlling the left and right motor speeds. Dragging these sliders will send commands to your RaspTank, adjusting the motor speeds accordingly.

**Example 2: Toggling the Pump**

Clicking the "Pump Status" button will toggle the water pump on or off.  The UI will update to reflect the current pump state.

**Example 3: Loading a Preset**

Select a preset from the "Presets" dropdown and click "Load". This will apply the settings defined in that preset to your tank.

**Backend Communication (Illustrative):**

The frontend sends requests to the backend API endpoints, such as:

*   `/api/motors`:  To control motor speeds. (e.g., `POST /api/motors?left=50&right=75`)
*   `/api/pump`: To toggle the pump. (e.g., `POST /api/pump?state=on`)
*   `/api/sensors`: To retrieve sensor data. (e.g., `GET /api/sensors`)

## Contributing 🤝

We welcome contributions to rasptank-react!  Here's how you can help:

1.  **Fork the Repository:** Create a fork of this repository on GitHub.
2.  **Create a Branch:**  Create a new branch for your feature or bug fix: `git checkout -b my-new-feature`
3.  **Make Changes:** Implement your changes, following the existing coding style and conventions.
4.  **Test Thoroughly:** Ensure your changes work as expected and don't introduce any regressions.
5.  **Submit a Pull Request:** Create a pull request to the main branch, providing a clear description of your changes.

**Coding Style:** We follow standard JavaScript/React coding conventions.  Please ensure your code is well-formatted and includes appropriate comments.

## License 📜

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for details.

## Support & Issues ℹ️

*   **GitHub Issues:**  Report bugs, suggest features, or ask questions on the [rasptank-react GitHub Issues page](https://github.com/pkibbey/rasptank-react/issues).
*   **Community Support:**  Consider joining online forums or communities dedicated to the Adeept RaspTank for additional support.
