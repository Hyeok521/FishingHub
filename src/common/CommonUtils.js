// 사용자 로그인 타입에 따른 닉네임 설정
import axios from "axios";


export const getUserNickName = (userInfo) => {
    return userInfo && (userInfo.loginType === 'NORMAL' ? userInfo.userNick : userInfo.userNm);
}

// 서버에서 받은 시간 데이터를 원하는 형태로 가공
export const formatDate = (originalDate) => {
    const date = new Date(originalDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 첨부파일 다운로드
export const downloadAttachFile = (fileId) => {
    axios
        .get(process.env.REACT_APP_SERVER_URL + "/attach", {params: {fileId}, responseType: 'blob'})
        .then((response) => {
            // 파일 이름 추출
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'downloaded-file';
            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }
            // 파일 다운로드
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', decodeURIComponent(filename));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            alert(error.response.data.message)
        });
}