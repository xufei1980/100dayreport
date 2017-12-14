/**
 * Created by think on 2017/12/15.
 */
FastClick.attach(document.body);
!function () {
    var liLele=document.getElementById('lele'),
        leleR=document.getElementById('leleR'),
        lilelemama=document.getElementById('lelemama'),
        lelemamaR=document.getElementById('lelemamaR'),
        lilelebaba=document.getElementById('lelebaba'),
        lelebabaR=document.getElementById('lelebabaR'),
         beginR=document.getElementById('beginR');

    liLele.addEventListener('click',function () {
        leleR.style.display='block';
        lelemamaR.style.display='none';
        lelebabaR.style.display='none';
        beginR.style.display='none';
        leleR.style.webkitAnimation='bounceInUp 3s linear 0s  both';
        leleR.style.animation='bounceInUp 3s linear 0s  both';
    });
    lilelemama.addEventListener('click',function () {
        leleR.style.display='none';
        lelemamaR.style.display='block';
        lelebabaR.style.display='none';
        beginR.style.display='none';
        lelemamaR.style.webkitAnimation='bounceInDown 3s linear 0s  both';
        lelemamaR.style.animation='bounceInDown 3s linear 0s  both';
    });
    lilelebaba.addEventListener('click',function () {
        leleR.style.display='none';
        lelemamaR.style.display='none';
        lelebabaR.style.display='block';
        beginR.style.display='none';
        lelebabaR.style.webkitAnimation='fadeInLeft 3s linear 0s  both';
        lelebabaR.style.animation='fadeInLeft 3s linear 0s  both';
    });
}();