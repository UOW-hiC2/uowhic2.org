function buttonClick(loc) {
    // console.log(loc)
    var el0 = document.getElementById("fix-"+loc);
    el0.classList.toggle('ann-none');

    var el1 = document.getElementById("ann-"+loc);
    el1.classList.toggle('ann');

    window.location.hash = "/";
};
