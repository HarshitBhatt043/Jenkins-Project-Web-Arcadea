oS.Init({PName:[oLilyPad,oRepeater,oCherryBomb,oTorchwood,oTangleKlep,oWallNut],ZName:[oSmallZombie,oSmallFlagZombie,oSmallDuckyTubeZombie1,oSmallConeheadZombie,oSmallFootballZombie,oSmallSnorkelZombie],PicArr:["images/interface/background3.jpg","images/interface/trophy.png"],Coord:2,LF:[0,1,1,2,2,1,1],backgroundImage:"images/interface/background3.jpg",CanSelectCard:0,LevelName:"小僵尸大麻烦",LvlEName:30,LargeWaveFlag:{5:$("imgFlag3"),10:$("imgFlag2"),15:$("imgFlag1")},StaticCard:0,UserDefinedFlagFunc:function(o){oP.FlagNum==oP.FlagZombies&&oP.SetTimeoutWaterZombie(6,9,3,[oDuckyTubeZombie1])},StartGameMusic:"Watery Graves",StartGame:function(){StopMusic(),PlayMusic(oS.LoadMusic=oS.StartGameMusic),SetVisible($("tdShovel"),$("dFlagMeter"),$("dTop")),SetHidden($("dSunNum")),oS.InitLawnMower(),PrepareGrowPlants((function(){oP.Monitor({f:function(){!function(){var o=ArCard.length;if(o<10){var e=oS.PName,a=oP.FlagZombies<6?Math.floor(1+10*Math.random())<4?1:Math.floor(Math.random()*e.length):Math.floor(1+10*Math.random())<3?0:Math.floor(Math.random()*e.length),t=e[a],l=t.prototype,i="dCard"+Math.random();ArCard[o]={DID:i,PName:t,PixelTop:600},NewImg(i,l.PicArr[l.CardGif],"top:600px;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto)",$("dCardList"),{onmouseover:function(o){ViewPlantTitle(GetChoseCard(i),o)},onmouseout:function(){SetHidden($("dTitle"))},onclick:function(o){ChosePlant(o,oS.ChoseCard,i)}})}oSym.addTask(600,arguments.callee,[])}(),function(){for(var o,e,a=ArCard.length;a--;)(e=(o=ArCard[a]).PixelTop)>60*a&&($(o.DID).style.top=(o.PixelTop=e-1)+"px");oSym.addTask(5,arguments.callee,[])}()},ar:[]}),oP.AddZombiesFlag(),SetVisible($("dFlagMeterContent"))}))}},{AZ:[[oSmallZombie,3,1],[oSmallDuckyTubeZombie1,1,1,[1,5,10,15]],[oSmallConeheadZombie,4,1],[oSmallFootballZombie,2,1],[oSmallSnorkelZombie,2,5,[5,10,15]]],FlagNum:15,FlagToSumNum:{a1:[3,5,9,10,13,15,19,20,23,25,29],a2:[3,6,12,20,18,24,30,40,36,42,48,60]},FlagToMonitor:{4:[ShowLargeWave,0],9:[ShowLargeWave,0],14:[ShowFinalWave,0]},FlagToEnd:function(){NewImg("imgSF","images/interface/trophy.png","left:667px;top:220px",EDAll,{onclick:function(){SelectModal(0)}}),NewImg("PointerUD","images/interface/PointerDown.gif","top:185px;left:676px",EDAll)}},{GetChoseCard:function(o){for(var e=ArCard.length;e--;)ArCard[e].DID==o&&(oS.ChoseCard=e,e=0);return oS.ChoseCard},ChosePlant:function(o,e){PlayAudio("seedlift"),o=window.event||o;var a=ArCard[oS.ChoseCard],t=o.clientX-EDAlloffsetLeft+EBody.scrollLeft||EElement.scrollLeft,l=o.clientY+EBody.scrollTop||EElement.scrollTop,i=a.PName.prototype;oS.Chose=1,EditImg(NewImg("MovePlant",i.PicArr[i.StaticGif],"left:"+t-.5*(i.beAttackedPointL+i.beAttackedPointR)+"px;top:"+l+20-i.height+"px;z-index:254",EDAll).cloneNode(!1),"MovePlantAlpha","",{visibility:"hidden",filter:"alpha(opacity=40)",opacity:.4,zIndex:30},EDAll),SetAlpha($(a.DID),50,.5),SetHidden($("dTitle")),GroundOnmousemove=GroundOnmousemove1},CancelPlant:function(){ClearChild($("MovePlant"),$("MovePlantAlpha")),oS.Chose=0,SetAlpha($(ArCard[oS.ChoseCard].DID),100,1),oS.ChoseCard="",GroundOnmousemove=function(){}},GrowPlant:function(o,e,a,t,l){var i=oS.ChoseCard,n=ArCard[i],r=n.PName,d=r.prototype,m=n.DID,c=oGd.$LF[t];d.CanGrow(o,t,l)&&(PlayAudio(2!=c?"plant"+Math.floor(1+2*Math.random()):"plant_water"),(new r).Birth(e,a,t,l,o),oSym.addTask(20,SetNone,[SetStyle($("imgGrowSoil"),{left:e-30+"px",top:a-40+"px",zIndex:3*t,visibility:"visible"})]),ClearChild($("MovePlant"),$("MovePlantAlpha")),$("dCardList").removeChild($(m)),null,ArCard.splice(i,1),oS.ChoseCard="",oS.Chose=0,GroundOnmousemove=function(){})},ViewPlantTitle:function(o){}});