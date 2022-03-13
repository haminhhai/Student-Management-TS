import { SMS_TOKEN } from 'constants/index';

export const getToken: () => void = () => localStorage.getItem(SMS_TOKEN);