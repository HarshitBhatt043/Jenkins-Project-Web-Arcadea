var Keyboard=(document.addEventListener("keydown",(function(e){13==e.keyCode?mediator.publish("controls_key_enter"):32==e.keyCode?mediator.publish("controls_key_space"):37==e.keyCode?mediator.publish("controls_key_left"):38==e.keyCode?mediator.publish("controls_key_up"):39==e.keyCode?mediator.publish("controls_key_right"):40==e.keyCode?mediator.publish("controls_key_down"):82==e.keyCode&&mediator.publish("controls_key_r")})),{});mediator.installTo(Keyboard);