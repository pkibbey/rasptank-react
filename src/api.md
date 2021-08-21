* API


** Info
*** get_info
- send this to recieve information about the robot

{"status": "ok", "title": "get_info", "data": ["64.8", "25.4", "6.1"]}
**** Data Values
1. CPU temp
2. CPU usage
3. RAM usage

** Movement
*** left
- turns the robot left

*** right
- turns the robot right

*** TS
- this stops the robot from moving turning

*** forward
- robot goes forward

*** backward
- robot goes backward

*** DS
- this stops the robot from moving forward or backward

*** "wsB 89"
- this sets the move speed to 89%

*** "wsB 5"
- this sets the move speed to 5%

<!-- Anything under 25% does not seem to produce enough power to move anything -->


** Claw
*** grab
- grabs the claw

*** loose
- loosens the claw

*** stop
- stops the claw

*** lookleft
- turns the claw counter-clockwise

*** lookright
- turns the claw clockwise

*** LRstop
- stops the claw turning


** Camera
*** up
- tilts the camera up

*** down
- tilts the camera down

*** UDstop
- stops the camera from tilting


** Arm
*** armup
- moves the arm up

*** armdown
- moves the arm down

*** Armstop
- stops the arm from moving


** Hand
*** handup
- moves the hand up

*** handown
- moves the hand down

*** HAstop
- stops the hand from moving


** Controls

*** "CVFLL1 N"
- where N is a number between 0 and 480
- not sure what this does yet "L1"

*** "CVFLL2 N"
- where N is a number between 0 and 480
- not sure what this does yet

*** "CVFLSP N"
- where N is a number between 0 and 480
- not sure what this does yet

*** "CVFLColorSet N"
- where N is a number between 0 and 255
- this seems to be a hex value of some kind 

*** "CVFL"
- starts whatever this is

*** "stopCV"
- stops whatever this is


** Other Controls

*** {"title":"findColorSet","data":[150,255,255]}
- send this object to set the color of this feature

*** findColor
- this starts the find color feature?

*** "motionGet"
- starts the motion get feature?

*** stopCV
- this stops the findcolor and motionGet features

*** "automatic"
- starts the automatic feature
- be warned, this will send the robot off into a mad dash

*** "automaticOff"
- stops the automatic feature

*** "police"
- starts the police lights flashing feature

*** "policeOff"
- stops the police lights flashing feature

*** "trackLine"
- starts the line tracking feature
- be warned, this will send the robot off into a mad dash

*** "trackLineOff"
- stops the line tracking feature
