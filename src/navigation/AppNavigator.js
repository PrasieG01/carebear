import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingPersonal from '../screens/OnboardingPersonal';
import OnboardingMedHistory from '../screens/OnboardingMedHistory';
import OnboardingHealthConditions from '../screens/OnboardingHealthConditions';
import OnboardingPregnancy from '../screens/OnboardingPregnancy';
import OnboardingFamilyHistory from '../screens/OnboardingFamilyHistory';
import OnboardingSummary from '../screens/OnboardingSummary';
import Home from '../screens/Home';
import CalendarScreen from '../screens/CalendarScreen';
import { getIsOnboarded } from '../utils/storage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isOnboarded, setIsOnboarded] = useState(null);

  useEffect(() => {
    async function check() {
      const val = await getIsOnboarded();
      setIsOnboarded(val);
    }
    check();
  }, []);

  if (isOnboarded === null) return null; // or a loader

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isOnboarded ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Personal" component={OnboardingPersonal} />
          <Stack.Screen name="MedHistory" component={OnboardingMedHistory} />
          <Stack.Screen name="HealthConditions" component={OnboardingHealthConditions} />
          <Stack.Screen name="Pregnancy" component={OnboardingPregnancy} />
          <Stack.Screen name="FamilyHistory" component={OnboardingFamilyHistory} />
          <Stack.Screen name="Summary" component={OnboardingSummary} />
          <Stack.Screen name="Home" component={Home} />
        </>
      )}
    </Stack.Navigator>
  );
}
