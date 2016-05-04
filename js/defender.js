var defenderObj = function(){//defenderObj类声明
    
    this.x = [];
    this.y = [];
    this.field = [];
    this.bool = [];
    this.num = 4;
    
}

defenderObj.prototype.radius = cellLength/2;//守卫者半径

defenderObj.prototype.init = function(){//成员函数--初始化
    
    var i = 0;
    
    while(1){
        
        var x = Math.floor( Math.random() * Math.floor(canWidth/cellLength) )* cellLength + cellLength/2;
        var y = Math.floor( Math.random() * Math.floor(canHeight/cellLength) )* cellLength + cellLength/2;
        var field = Math.round(Math.random() * 2 + 2)* cellLength;
        var distance = Math.sqrt( Math.pow(hero.x - x,2) + Math.pow(hero.y - y,2) );
        
        var result = true;
        
        if(map[(y - cellLength/2)/cellLength][(x - cellLength/2)/cellLength] == "#" &&
        distance > hero.radius + field){
            
            for(var j = 0 ; j < i ; j ++){
                
                if(Math.abs(this.x[j] - x) <= field + this.field[j] &&
                Math.abs(this.y[j] - y) <= field + this.field[j]){
                    
                    result = false;
                    
                }
                
            }
            
            if(result){
                
                this.x[i] = x;
                this.y[i] = y;
                this.field[i] = field;
                this.bool[i] = true;
                i ++;
                
            }
            
        }
        
        if(i >= this.num){
            
            break;
            
        }
        
    }
    
}

defenderObj.prototype.draw = function(){//成员函数--绘制
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if(this.bool[i]){
            
            ctx.save();
            ctx.fillStyle = "#F05F48";
            ctx.strokeStyle = "#F05F48";
            ctx.beginPath();
            ctx.arc(this.x[i],this.y[i],this.radius,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x[i],this.y[i],this.field[i],0,Math.PI*2);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
            
        }
        
    }
    
}

defenderObj.prototype.buildMap = function(){//成员函数--修改虚拟地图
    
    for(var i = 0 ; i < this.num ; i ++){
        
        var x = (this.x[i] - cellLength/2)/cellLength;
        var y = (this.y[i] - cellLength/2)/cellLength;
        
        if(y < Math.ceil(canHeight/cellLength)){
            
            map[y][x] = "!";
            
        }
        
    }
    
}

defenderObj.prototype.dead = function(i){//成员函数--对象销毁
    
    var xIndex = (this.x[i] - cellLength/2)/cellLength;
    var yIndex = (this.y[i] - cellLength/2)/cellLength;
    
    this.bool[i] = false;
    map[yIndex][xIndex] = "#";
    
}

defenderObj.prototype.reset = function(){
    
    var array = [];
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if((this.y[i] - cellLength) >= 0){
            
            var node = {};
            
            node.x = this.x[i];
            node.y = this.y[i] - cellLength;
            node.field = this.field[i];
            node.bool = this.bool[i];
            
            array.push(node);
            
        }
        
    }
    
    while(array.length < this.num){
        
        var x = Math.floor( Math.random() * Math.floor(canWidth/cellLength) )* cellLength + cellLength/2;
        var y = Math.floor( Math.random() * Math.floor(canHeight/cellLength) )* cellLength + cellLength/2;
        var field = Math.round(Math.random() * 2 + 2)* cellLength;
        var distance = Math.sqrt( Math.pow(hero.x - x,2) + Math.pow(hero.y - y,2) );
        
        var result = true;
        
        if(map[(y - cellLength/2)/cellLength][(x - cellLength/2)/cellLength] == "#" &&
        distance > hero.radius + field){
            
            for(var i = 0 ; i < array.length ; i ++){
                
                if(Math.abs(array[i].x - x) <= field + array[i].field &&
                Math.abs(array[i].y - y) <= field + array[i].field){
                    
                    result = false;
                    
                }
                
            }
            
            if(result){
                
                var node = {};
                
                node.x = x;
                node.y = y - cellLength;
                node.field = field;
                node.bool = true;
                
                array.push(node);
                
            }
            
        }
        
    }
    
    for(var i = 0 ; i < this.num ; i ++){
        
        this.x[i] = array[i].x;
        this.y[i] = array[i].y;
        this.field[i] = array[i].field;
        this.bool[i] = array[i].bool;
        
    }
    
}