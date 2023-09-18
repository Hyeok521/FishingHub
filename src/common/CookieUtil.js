/**
 * key에 해당하는 쿠키 값을 꺼내오는 함수
 * @param {*} key 꺼내고 싶은 쿠키의 이름
 * @returns
 */
export const getCookie = (key) => {
  //쿠키는 한번에 모두 불러와지기 때문에 사용할때 ';'나눠서 선택적으로 가져와야한다.
  const cookies = document.cookie.split(`; `).map((el) => el.split('='));
  let cookie;

  for (let i = 0; i < cookies.length; i++) {
    // 해당하는 key를 갖는 쿠키데이터를 찾기위해 반복문을 사용했는데 다른방법도 연구해봐야겠다.
    if (cookies[i][0] === key) {
      cookie = cookies[i][1];
      break;
    }
  }
  return cookie;
};

/**
 * 엑세스 토큰을 쿠키에서 꺼내오는 함수
 * @returns 인증 유무
 */
export const getAuthentication = () => {
  return getCookie('accessToken');
};

/**
 * 토큰과 만료 시간을 받아 쿠키에 저장하는 함수
 * @param {*} accessToken 엑세스 토큰
 * @param {*} tokenExpiresIn 토큰 만료 시간
 */
export const saveCookie = (accessToken, tokenExpiresIn) => {
  const exDate = new Date();
  exDate.setTime(tokenExpiresIn);
  document.cookie = 'accessToken=' + accessToken + ';expires=' + exDate.toUTCString() + ';path=/';
};

/**
 * 쿠키를 삭제하는 함수
 * @param {*} key 삭제하고 싶은 쿠키 이름
 */
export const deleteCookie = (key) => {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
