function changeWidth(e){beforeImg.style.width=e+"px"}var toggle=document.querySelector(".page-header__toggle"),nav=document.querySelector(".page-header__nav");toggle&&nav&&(toggle.classList.remove("page-header__toggle--nojs"),nav.classList.add("page-header__nav--close"),toggle.addEventListener("click",function(){toggle.classList.toggle("page-header__toggle--open"),nav.classList.toggle("page-header__nav--close")}));var comparison=document.querySelector(".comparison"),beforeImg=document.querySelector(".comparison__wrap-before"),btnBefore=document.querySelector(".comparison__btn--before"),btnAfter=document.querySelector(".comparison__btn--after"),flag=document.querySelector(".comparison__flag"),scale=document.querySelector(".comparison__scale"),thumb=document.querySelector(".comparison__thumb"),scaleCoords=scale.getBoundingClientRect();comparison&&(comparison.addEventListener("click",function(e){var t=e.target;t===btnBefore&&(beforeImg.style.width="100%",thumb.style.left=scale.offsetWidth-thumb.offsetWidth/2+"px",flag.classList.remove("comparison__flag--after")),t===btnAfter&&(beforeImg.style.width="0",thumb.style.left=-thumb.offsetWidth/2+"px",flag.classList.add("comparison__flag--after"))}),thumb.addEventListener("mousedown",function(e){function t(e){var t,n=e.clientX-r-a.x;n<-thumb.offsetWidth/2&&(n=-thumb.offsetWidth/2),n>scale.offsetWidth-thumb.offsetWidth/2&&(n=scale.offsetWidth-thumb.offsetWidth/2),thumb.style.left=n+"px",t=a.x-o.x+n+thumb.offsetWidth/2,changeWidth(t)}var o=beforeImg.getBoundingClientRect(),n=thumb.getBoundingClientRect(),a=scale.getBoundingClientRect(),r=e.clientX-n.x;document.addEventListener("mousemove",t),document.addEventListener("mouseup",function(e){document.removeEventListener("mousemove",t),thumb.onmouseup=null})}),thumb.ondragstart=function(){return!1});
