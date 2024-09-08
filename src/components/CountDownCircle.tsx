import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface CountdownTimerProps {
  totalMinutes: number; // Total time in minutes
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ totalMinutes }) => {
  const [remainingTime, setRemainingTime] = useState(totalMinutes * 60); // Convert to seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update timer every second
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup interval on component unmount
    };
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const fillPercentage = (remainingTime / (totalMinutes * 60)) * 100; // Percentage of circle to fill

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <AnimatedCircularProgress
        size={200}
        width={10}
        fill={fillPercentage}
        tintColor="#3498db"
        backgroundColor="#e0e0e0"
        rotation={0}
        duration={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CountdownTimer;
