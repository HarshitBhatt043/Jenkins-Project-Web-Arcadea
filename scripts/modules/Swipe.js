var Swipe={domReady:function(){$("#swipeArea").swipe({swipe:function(e,i,o,d,a,r){"left"==i?mediator.publish("swipe_left_board"):"right"==i?mediator.publish("swipe_right_board"):"up"==i?mediator.publish("swipe_up_board"):"down"==i&&mediator.publish("swipe_down_board")},threshold:0,allowPageScroll:"none"})}};mediator.installTo(Swipe),Swipe.subscribe("loader_dom_ready",Swipe.domReady);