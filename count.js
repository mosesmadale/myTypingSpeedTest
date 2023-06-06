const countReq = new XMLHttpRequest();
countReq.onreadystatechange = () => {
    if (countReq.status === 200 && countReq.readyState === 4) {}
}

countReq.open('POST', '../../count.php');
let fd = new FormData();
fd.append('page', 'typing');
countReq.send(fd);