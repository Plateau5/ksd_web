function mouse_hover(obj,icon){
    obj.hover(function(){
        obj.css('color','#0B9C94');
        obj.css('background','url(/static/img/question/' + icon + '_icon_hover.png) left center no-repeat');
    },function(){
        obj.css('color','#1DC6BC');
        obj.css('background','url(/static/img/question/' + icon + '_icon.png) left center no-repeat');
    });
}