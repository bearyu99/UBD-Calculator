var today = new Date();
var yyyy = today.getFullYear();
var mm = today.getMonth() + 1;
var dd = today.getDate() - 1;

if (mm < 10) {
    mm = '0' + mm;
}

if (dd < 10) {
    dd = '0' + dd;
}
var temp = yyyy + mm + dd;

function loadDoc() {
    var req = new XMLHttpRequest();
    var url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.xml?key=0d355eff6cca24983b3f43f763a219be&targetDt=' + temp;
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    req.open("GET", url, true);
    req.send();
}

function myFunction(xml) {
    var i, j, ubdcnt;
    var xmlDoc = xml.responseXML;

    var movies = new Array(new Array(9));
    var movie = xmlDoc.getElementsByTagName("movieNm");
    var cnts = new Array(new Array(9));
    var ubdcnts = new Array(new Array(9));
    var ubd = 172000;
    var cnt = xmlDoc.getElementsByTagName("audiAcc");
    for (i = 0; i < movie.length; i++) { //movies 배열에 영화 제목을 삽입
        if (i != 0) { movies; }
        movies[i] = movie[i].firstChild.data;
    }

    for (i = 0; i < cnt.length; i++) { //cnts 배열에 영화 관람객수를 삽입
        if (i != 0) { cnts; }
        cnts[i] = numberWithCommas(cnt[i].firstChild.data);

        ubdcnt = cnt[i].firstChild.data / ubd;
        ubdcnts[i] = ubdcnt.toFixed(3);; //ubdcnt 변수에 저장된 값을 세번째 소수점까지 자름
    }
    for (i = 0; i <= 9; i++) { //mov[i], cnt[i]라는 이름을 가진 아이디(id)에 각각 배열에 있는 내용을 삽입
        document.getElementById('mov' + [i]).innerHTML = movies[i];
        document.getElementById('cnt' + [i]).innerHTML = cnts[i] + " 명";
        document.getElementById('ubd' + [i]).innerHTML = ubdcnts[i] + " UBD";
    }
    function numberWithCommas(x) { //숫자 3자리 단위마다 콤마(,) 찍는 함수
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    document.getElementById('tod').innerText = temp + " 기준";
}

function research() {
    var datein = document.getElementById("datein").value;
    temp = datein;
    alert(temp);
    loadDoc();
}