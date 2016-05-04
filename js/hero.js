var heroObj = function(){//hero类声明
    
    this.x;
    this.y;
    
}

heroObj.prototype.radius = cellLength/2;

heroObj.prototype.init = function(){//成员函数--初始化
    
    this.x = Math.floor( Math.random() * Math.floor(canWidth/cellLength) )* cellLength + cellLength/2;
    this.y = Math.floor( Math.random() * Math.floor(canHeight/120) )* cellLength + cellLength/2;
    
}

heroObj.prototype.draw = function(){//成员函数--绘制
    
    ctx.save();
    ctx.fillStyle = "#44B811";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
}

heroObj.prototype.move = function(x,y){//成员函数--更新坐标值
    
    this.x = x * cellLength + cellLength/2;
    this.y = y * cellLength + cellLength/2;
    
}

heroObj.prototype.reset = function(){
    
    this.y -= cellLength;
    
}