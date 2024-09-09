import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface CountdownTimerProps {
  totalMinutes: number; // Total countdown time in minutes
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ totalMinutes }) => {
  // State to hold the remaining time in seconds
  const [remainingTime, setRemainingTime] = useState(totalMinutes * 60); // Convert minutes to seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect for setting up the interval to decrease time
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Decrease remaining time every second
    }, 1000);

    // Cleanup the interval on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Extract minutes and seconds from remaining time
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // Calculate the percentage of the circle to fill based on the remaining time
  const fillPercentage = (remainingTime / (totalMinutes * 60)) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        <View style={styles.timerContainer}>
        <AnimatedCircularProgress
            size={360}
            width={34}
            fill={fillPercentage}
            tintColor="#3498db"  // Color for the filled part of the circle
            backgroundColor="#e0e0e0"  // Color for the background circle
            rotation={0}  // No rotation
            duration={1000}  // Animation duration (1 second)
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    },
    timerContainer: {
        backgroundColor: '#1ecc7b',
        borderRadius:500

    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'red'
    },
});

export default CountdownTimer;
