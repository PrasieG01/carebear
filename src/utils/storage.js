import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'carebear_userProfile';
const ONBOARDED_KEY = 'carebear_isOnboarded';

export async function saveUserProfile(partial) {
  try {
    const prev = await getUserProfile() || {};
    const merged = { ...prev, ...partial };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(merged));
    return merged;
  } catch (e) {
    console.warn('saveUserProfile error', e);
    return null;
  }
}

export async function getUserProfile() {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('getUserProfile error', e);
    return null;
  }
}

export async function setIsOnboarded(val = true) {
  try {
    await AsyncStorage.setItem(ONBOARDED_KEY, val ? '1' : '0');
  } catch (e) {
    console.warn('setIsOnboarded error', e);
  }
}

export async function getIsOnboarded() {
  try {
    const v = await AsyncStorage.getItem(ONBOARDED_KEY);
    return v === '1';
  } catch (e) {
    console.warn('getIsOnboarded error', e);
    return false;
  }
}

export async function clearAll() {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(ONBOARDED_KEY);
  } catch (e) {
    console.warn('clearAll', e);
  }
}
