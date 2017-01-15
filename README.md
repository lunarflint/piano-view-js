# piano view js

- a brainless partial port of my android piano view
- uses html5 canvas
- dependency free native javascript
- tested on IE11 and chrome

## Quick start
- see `demo.html`
- also see my original android library

## License
- Apache License, Version 2.0

## Features
- zoomable (while key width = 100px when scale = 1, see `PianoView.setScale(var scale)`)
- scrollable (see `PianoView.setPosition(var position)`)
- view easily extend-able to draw additional info
- simulated midi velocity by y-axis value of touch pointers

## TODO List
- multitouch
- detect mouse movement for scrolling
