
function IsNum(ev,obj){

    var k = window.event ? ev.keyCode : ev.which;
    if(((k >= "48") && (k <= "57")) || k == "8" || k== "0" || k == "46" || k == "37" || k == "39") {
        var obj = $(obj);
        var indexOf = obj.val().indexOf(".");
        var length = obj.val().length;
        if (obj) {
            if (indexOf < 0) {

            } else {
                if (k != "46") {
                    if ((length - indexOf) < "5") {

                    } else {
                        window.event.returnValue = false;
                    }
                } else {
                    window.event.returnValue = false;
                }
            }
        }
    }else{
            if(window.event){
                window.event.returnValue = false;
            }else{
                ev.preventDefault();
            }
        }
}