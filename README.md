# after-effects-utilities
For the moment, this repository only has one useful expression: spring-easing.

## spring-easing
Simply copy-paste the entire expression wherever a property needs to be springy. Leave keyframe interpolation as "linear".

Example: applying the expression to position keyframes

![Applying the expression to position keyframes](screenshots/spring-easing/expression.png "Applying the expression to position keyframes")

Result with `animationSpeed = 1.2` and `springDamping = 1`:

![Default values](screenshots/spring-easing/default-values.png "Default values")

Result with `animationSpeed = 1.2` and `springDamping = 3`:

![High damping](screenshots/spring-easing/high-damping.png "High damping")

Result with `animationSpeed = 1.2` and `springDamping = 0.3`:

![Low damping](screenshots/spring-easing/low-damping.png "Low damping")

Result with `animationSpeed = 1.2` and `springDamping = 0.3`:

![Low damping low speed](screenshots/spring-easing/low-damping-low-speed.png "Low damping low speed")
