import {Nullable} from '../../../types';

export const getUserAvatar = (src?: Nullable<string>): string => (src ? `https://ya-praktikum.tech/api/v2/resources${src}` : '');
