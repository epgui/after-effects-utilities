// Default spring properties:
animationSpeed = 1.2
springDamping = 1

// The latest version of this script can be found at:
// https://github.com/epgui/after-effects-utilities
if(numKeys>1)for(i=1;i<numKeys;i++)if(key(1).time>=time)value;else{if(key(i).time>time||key(i+1)<=time)break;time1=key(i).time,time2=key(i+1).time,value1=valueAtTime(time1),value2=valueAtTime(time2),value1[0]==value2[0]&&value1[1]==value2[1]?(overshoot=!0,time1=key(i-1).time,time2=key(i).time,value1=valueAtTime(time1),value2=valueAtTime(time2)):overshoot=!1,period=(time2-time1)/(2*animationSpeed),frequency=1/period,phaseOffset=0,qFactor=.35/springDamping,gamma=frequency/qFactor,dt=time-time1,dtCorrected=dt*(overshoot?1:dt/(time2-time1)),dt>2*period/qFactor?value:(amplitude=value1-value2,forceComponent=amplitude*Math.cos(frequency*dtCorrected-phaseOffset),dampingComponent=Math.exp(-dtCorrected*gamma/2),displacement=dampingComponent*forceComponent-amplitude,value1,displacement)}else value;
