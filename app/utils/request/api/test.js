// ajax测试
import req from '../index.js';

export const fetchUser = data => req('/manage/bd/GetCurBdInfo', { data });
