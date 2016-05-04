var bulletObj = function(){//bulletObj池声明
    
    this.x = [];
    this.y = [];
    this.color = [];
    this.angle = [];
    this.bool = [];
    
}

bulletObj.prototype.num = 100;//池容量

bulletObj.prototype.radius = cellLength / 5;//子弹半径

bulletObj.prototype.speed = cellLength / 2;//子弹速率

bulletObj.prototype.init = function(){//成员函数--初始化
    
    for(var i = 0 ; i < this.num ; i ++){
        
        this.x[i] = 0;
        this.y[i] = 0;
        this.color[i] = "#000";
        this.angle[i] = 0;
        this.bool[i] = false;
        
    }
    
}

bulletObj.prototype.draw = function(){//成员函数--绘制
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if(this.bool[i]){
            
            this.x[i] = this.x[i] + this.speed * Math.cos(this.angle[i]);
            this.y[i] = this.y[i] + this.speed * Math.sin(this.angle[i]);
            
            ctx.save();
            ctx.fillStyle = this.color[i];
            ctx.beginPath();
            ctx.arc(this.x[i] + this.speed * Math.cos(this.angle[i]),this.y[i] + this.speed * Math.sin(this.angle[i]),this.radius,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            
        }
        
    }
    
}

bulletObj.prototype.fire = function(x,y,color,angle){//成员函数--生成bulletObj实例
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if(!this.bool[i]){
            
            this.x[i] = x;
            this.y[i] = y;
            this.color[i] = color;
            this.angle[i] = angle;
            this.bool[i] = true;
            return;
            
        }
        
    }
    
}

bulletObj.prototype.dead = function(i){//成员函数--对象销毁
    
    this.bool[i] = false;
    
}