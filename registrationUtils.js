// util.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveRegistrationProgress = async (screenName, data) => {
    try {
      const key = `registration_progress_${screenName}`;
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log(`Progress saved for screen: ${screenName}`);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

// utils.js

export const getRegistrationProgress = async (screenName) => {
    try {
      const key = `registration_progress_${screenName}`;
      const data = await AsyncStorage.getItem(key);
      return data != null ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving progress:', error);
      return null;
    }
  };
