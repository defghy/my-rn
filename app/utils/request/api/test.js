// ajax测试
import req from '../index.js';

export const fetchUser = data => req('/manage/bd/GetCurBdInfo', { data, method: 'get' });
export const fetchTextConfig = data => req('/app/textConfig/getTextConfig', { data });
