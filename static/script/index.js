window.onscroll = () =>{
    var scroll =  document.querySelector(".scroll-top");
    let documentElement = document.documentElement.scrollTop;
    let documentBody = document.body.scrollTop;
    let isScrollTop = (documentBody > 40 || documentElement > 40);

    isScrollTop ?  scroll.style.display = "block" : scroll.style.display = "none";

    var scrollbtn = document.querySelector(".scroll-top-btn");

    scrollbtn.onclick = () =>{
        scrollTop();
    }

    function scrollTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}
for(var i = 0; i<a.length; i++){
    a[i].onclick = () =>{
        document.querySelector("#humberger").click();
    } 
}

