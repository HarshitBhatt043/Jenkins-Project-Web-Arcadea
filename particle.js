function Particle(t,i,r,a,h,s,e,d){this.x=t||0,this.y=i||0,this.color=r||"#fff",this.target=a,this.dir=h||0,this.r=s||2,this.speed=e||8,this.arcSpeed=d||.4}Particle.prototype.draw=function(t){t.lineWidth=2,t.beginPath(),t.strokeStyle=this.color.rgb(),t.arc(this.x,this.y,3*this.r,0,2*Math.PI,!1),t.stroke()},Particle.prototype.physics=function(){var t=this,i=directionTowards(t.target,t),r=t.dir,a=i,h=this.arcSpeed,s=1;Math.abs(r-a)>Math.PI&&(s=-1),r>a?t.dir-=s*Math.min(h,Math.abs(r-a)):r<a&&(t.dir+=s*Math.min(h,Math.abs(r-a))),t.dir>Math.PI&&(t.dir=t.dir-2*Math.PI),t.dir<-Math.PI&&(t.dir=t.dir+2*Math.PI);var e=t.dir,d=distance(t.target,t);return t.x+=Math.cos(e)*this.speed+(2*Math.random()-1)+Math.cos(e)*(1/(d+1)),t.y+=Math.sin(e)*this.speed+(2*Math.random()-1)+Math.sin(e)*(1/(d+1)),t.r=Math.log(d)/4,t.r=t.r<0?0:t.r,d};