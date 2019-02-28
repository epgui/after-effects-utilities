# after-effects-utilities
For the moment, this repository only has one useful expression: spring-easing.

## spring-easing
Simply copy-paste the entire expression wherever a property needs to be springy. Leave keyframe interpolation as "linear".

Example: applying the expression to position keyframes

![Applying the expression to position keyframes](spring-easing/expression.png)

Result with `animationSpeed = 1.2` and `springDamping = 1`:

![Default values](spring-easing/default values.png)

Result with `animationSpeed = 1.2` and `springDamping = 3`:

![High damping](spring-easing/high damping.png)

Result with `animationSpeed = 1.2` and `springDamping = 0.3`:

![Low damping](spring-easing/low damping.png)

Result with `animationSpeed = 1.2` and `springDamping = 0.3`:

![Low damping low speed](spring-easing/low damping low speed.png)
