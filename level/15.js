oS.Init({PName:[oPeashooter,oSunFlower,oCherryBomb,oWallNut,oPotatoMine,oSnowPea,oChomper,oRepeater,oPuffShroom,oSunShroom,oFumeShroom],ZName:[oZombie,oZombie2,oZombie3,oScreenDoorZombie],PicArr:function(){var e=oFumeShroom.prototype,o=e.PicArr;return["images/interface/background2.jpg","images/interface/Tombstones.png","images/interface/Tombstone_mounds.png",o[e.CardGif],o[e.NormalGif]]}(),backgroundImage:"images/interface/background2.jpg",CanSelectCard:1,DKind:0,SunNum:375,LevelName:"2-5 Special Pass: Mass Burial Mound",LvlEName:15,LargeWaveFlag:{10:$("imgFlag1")},LoadAccess:function(e){NewImg("dDave","images/interface/Dave.gif","left:0;top:81px",EDAll),NewEle("DivTeach","div",0,0,EDAll),function(o){var a=arguments.callee,i=$("DivTeach");switch(o){case 0:PlayAudio("crazydaveshort1"),$("dDave").src="images/interface/Dave3.gif",oSym.addTask(1,(function(){$("dDave").src="images/interface/Dave.gif",i.onclick=function(){oSym.addTask(10,a,[1])}}),[]),innerText(i,"Dude, have you ever imagined you being alone in a cemetery one night?(Click to continue)");break;case 1:PlayAudio("crazydavelong"+Math.floor(1+3*Math.random())),i.onclick=null,$("dDave").src="images/interface/Dave3.gif",oSym.addTask(2,(function(){$("dDave").src="images/interface/Dave.gif",i.onclick=function(){oSym.addTask(10,a,[2])}}),[]),innerText(i,"Of course, there have to be zombies in the cemetery.(Click to continue)");break;case 2:PlayAudio("crazydavelong"+Math.floor(1+3*Math.random())),i.onclick=null,$("dDave").src="images/interface/Dave3.gif",oSym.addTask(2,(function(){$("dDave").src="images/interface/Dave.gif",i.onclick=function(){oSym.addTask(10,a,[3])}}),[]),innerText(i,"Don't relax too much, zombies will pop out of tombstones at any time! .(Click to continue)");break;case 3:PlayAudio("crazydavelong"+Math.floor(1+3*Math.random())),i.onclick=null,$("dDave").src="images/interface/Dave3.gif",oSym.addTask(2,(function(){$("dDave").src="images/interface/Dave.gif",i.onclick=function(){oSym.addTask(10,a,[4])}}),[]),innerText(i,"Hmm, we might need some quick plants!(Click to continue)");break;case 4:$("dDave").src="images/interface/Dave2.gif",ClearChild($("DivTeach")),oSym.addTask(5,(function(){ClearChild($("dDave")),e(0)}),[])}}(0)},Monitor:{f:AppearTombstones,ar:[7,9,12]},UserDefinedFlagFunc:function(e){var o=oP.FlagZombies;switch(!0){case o>8:oP.SetTimeoutTomZombie([oZombie]);break;case o>5:oP.SetTimeoutTomZombie([oZombie])}},StartGameMusic:"Ultimate battle"},{AZ:[[oZombie,2,1],[oZombie2,2,1],[oZombie3,1,1],[oScreenDoorZombie,1,1]],FlagNum:10,FlagToSumNum:{a1:[3,5,9],a2:[1,2,3,10]},FlagToMonitor:{9:[ShowLargeWave,0]},FlagToEnd:function(){NewImg("imgSF","images/Card/Plants/HypnoShroom.png","left:827px;top:525px;clip:rect(auto,auto,60px,auto)",EDAll,{onclick:function(){GetNewCard(this,oHypnoShroom,16)}}),NewImg("PointerUD","images/interface/PointerDown.gif","top:490px;left:836px",EDAll)}});