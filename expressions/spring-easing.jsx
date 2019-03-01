// The latest version of this script can be found at:
// https://github.com/epgui/after-effects-utilities

// Default spring properties:
animationSpeed = 1.2
springDamping = 1

// Nothing to compute unless there's more than one key
if (numKeys > 1) {
  for (i = 1; i < numKeys; i++) {
    if (key(1).time >= time) {
      value
    } else if (key(i).time > time || key(i+1) <= time) {
      // Otherwise a previously computed value will be overridden
      break
    } else {
      // Get a basic reference for start and end time and values in the current
      // segment
      time1 = key(i).time
      time2 = key(i+1).time
      value1 = valueAtTime(time1)
      value2 = valueAtTime(time2)

      // Make sure we don't override the overshoot with a constant!
      // Calculate overshoot using the previous keyframe segment.
      if (value1[0] == value2[0] &&
          value1[1] == value2[1]) {
        overshoot = true
        time1 = key(i-1).time
        time2 = key(i).time
        value1 = valueAtTime(time1)
        value2 = value
      } else {
        overshoot = false
      }

      // The period of oscillation is half the time between keys
      period = (time2 - time1) / (2 * animationSpeed)
      frequency = 1 / period
      phaseOffset = 0

      // The Quality Factor [Q] is a dimensionless quantity used to measure
      // the amount of damping for a harmonic oscillator and is defined by:
      //   Q = 2 * pi * [average energy stored] / [energy lost per cycle]
      // I don't know why, but a [Q] of 0.35 seems to result in aesthetically
      // pleasing UI motion.
      qFactor = 0.35 / springDamping
      gamma = frequency / qFactor

      // Here we define [dt] as the x-axis with origin at time1
      dt = time - time1

      if (dt > 2/0.35 * Math.PI * period * qFactor) {
        value
      } else {

        // Without a correction factor, the spring system behaves as if the spring
        // attractor jumps instantly from value1 to value2. A more natural or
        // expected behaviour would see the attractor moving from value1 to value2
        // linearly. We can correct for this in order to "ease in" to the spring
        // motion.
        dtCorrected = dt * ( dt/(time2-time1) )

        // Now for the physics. For more detailed information see:
        // http://people.physics.tamu.edu/agnolet/Teaching/Phys_221/MathematicaWebPages/4_DampedHarmonicOscillator.pdf
        //
        // The total energy [E_tot] of a harmonic oscillator is the sum of the
        // kinetic energy [E_k] and the spring potential energy [U]:
        //   E_tot = E_k + U
        //
        // Our system is initially at rest because the value of the spring
        // attractor is the same as the value of the property we wish to
        // animate. When the value of the attractor is keyframed, the total
        // energy of the system becomes proportional to the total amplitude of
        // value change.
        amplitude = value1 - value2

        // The kinetic energy component is given by:
        //   E_k = (1/2) * m * v^2
        // where [m] is the mass of an object and [v] is its speed.
        //
        // The spring potential energy is given by:
        //   U = (1/2) * k * x^2
        // where [k] is the spring constant and [x] is the distance from
        // equilibrium, or the "amount of stretching".
        //
        // Because our system begins at rest, the initial kinetic energy
        // component is 0 at the very instant the attractor value is changed.
        // Thus we have for initial conditions:
        //   E_tot = U
        // and as the spring force acts upon the object, its velocity increases
        // so that:
        //   -d/dt U = d/dt E_k
        // we can solve this for position over time in an undamped harmonic
        // system
        forceComponent = amplitude *
          Math.cos((frequency * dtCorrected) - phaseOffset)

        // The energy of an undamped harmonic oscillator [E_tot] is constant.
        // This is different than for a damped system, where the energy of the
        // system falls to (E_tot * e^-1) at time [1/gamma]. This energy
        // dissipation is caused by the damping component.
        //
        // The damping component is a velocity dependant friction. This is
        // expected behaviour for physical phenomena such as air drag, viscous
        // drag and even magnetic drag. The frictional force [F] points in the
        // opposite direction to the velocity [v] and is given by:
        //   F = -b * v
        //
        // Solving the damping equation for effect on position over time, we
        // get:
        dampingComponent = Math.exp(-(dtCorrected * gamma) / 2)

        // The displacement as a function of time is then:
        displacement = (dampingComponent * forceComponent) - (amplitude)
        currentPosition = value1 + displacement
        currentPosition
      }
    }
  }
} else {
  value
}
