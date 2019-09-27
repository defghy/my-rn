// ajax测试
import req from '../index.js';

export const fetchUser = data => req('/manage/bd/GetCurBdInfo', { data, method: 'get' });
export const fetchTextConfig = data => req('/app/textConfig/getTextConfig', { data });
export const fetchError = data => req('/app/textConfig/bbb?action=hide_phone', { data, method: 'get' });
