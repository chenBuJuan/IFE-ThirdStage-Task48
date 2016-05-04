var blockObj = function(){//block类声明
    
    this.x = [];
    this.y = [];
    this.width = [];
    this.height = [];
    this.num = 5;
    
}

blockObj.prototype.init = function(){//成员函数--初始化
    
    var i = 0;
    
    while(1){
        
        var x = Math.floor( Math.random() * Math.floor(canWidth/cellLength) )* cellLength;
        var y = Math.floor( Math.random() * Math.floor(canHeight/cellLength) )* cellLength;
        var width = Math.floor( Math.random() * 3 + 3)* cellLength;
        var height = Math.floor( Math.random() * 3 + 3)* cellLength;
        
        var nx1 = x;
        var nx2 = x + width;
        var ny1 = y;
        var ny2 = y + height;
        
        var result = true;
        
        if(hero.x >= nx1 && hero.x <= nx2 && hero.y >= ny1 && hero.y <= ny2){
            
            result = false;
            
        }
        
        for(var j = 0 ; j < i ; j ++){
            
            var ox1 = this.x[j];
            var ox2 = this.x[j] + this.width[j];
            var oy1 = this.y[j];
            var oy2 = this.y[j] + this.height[j];
            
            if(nx1 <= ox1 && ny1 <= oy1 && ny2 >= oy1 && nx2 >= ox1 ||
            nx1 <= ox1 && ny1 >= oy1 && ny1 <= oy2 && nx2 >= ox1 ||
            nx1 >= ox1 && nx1 <= ox2 && ny1 <= oy1 && ny2 >= oy1 ||
            nx1 >= ox1 && nx1 <= ox2){
                
                result = false;
                
            }
            
        }
        
        if(result){
            
            this.x[i] = x;
            this.y[i] = y;
            this.width[i] = width;
            this.height[i] = height;
            i ++;
            
        }
        
        if(i >= this.num){
            
            break;
            
        }
        
    }
    
}

blockObj.prototype.draw = function(){//成员函数--绘制
    
    ctx.save();
    ctx.fillStyle = "#2E1E1E";
    
    for(var i = 0 ; i < this.num ; i ++){
            
        ctx.fillRect(this.x[i],this.y[i],this.width[i],this.height[i]);
        
    }
    
    ctx.restore();
    
}

blockObj.prototype.buildMap = function(){//成员函数--生成虚拟地图
    
    for(var i = 0 ; i < Math.ceil(canHeight/cellLength) ; i ++){
        
        map[i] = [];
        
        for(var j = 0 ; j < Math.ceil(canWidth/cellLength) ; j ++){
            
            map[i][j] = "#";
            
        }
        
    }
    
    for(var i = 0 ; i < this.num ; i ++){
        
        var jLength = Math.min((this.y[i] + this.height[i])/cellLength,Math.ceil(canHeight/cellLength));
        var kLength = Math.min((this.x[i] + this.width[i])/cellLength,Math.ceil(canWidth/cellLength));
        
        for(var j = this.y[i]/cellLength ; j < jLength ; j++){
            
            for(var k = this.x[i]/cellLength ; k < kLength ; k++){
                
                map[j][k] = "*";
                
            }
            
        }
            
    }
    
}

blockObj.prototype.reset = function(){
    
    var array = [];
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if((this.y[i] - cellLength) < 0 && (this.y[i] + this.height[i] - cellLength) > 0){
            
            var node = {};
            
            node.x = this.x[i];
            node.y = 0;
            node.width = this.width[i];
            node.height = this.height[i] - cellLength;
            
            array.push(node);
            
        }
        
        if((this.y[i] - cellLength) >= 0 && (this.y[i] + this.height[i] - cellLength) >= 0){
            
            var node = {};
            
            node.x = this.x[i];
            node.y = this.y[i] - cellLength;
            node.width = this.width[i];
            node.height = this.height[i];
            
            array.push(node);
            
        }
        
    }
    
    while(array.length < this.num){
        
        var x = Math.floor( Math.random() * Math.floor(canWidth/cellLength) )* cellLength;
        var y = Math.floor( Math.random() * Math.floor(canHeight/cellLength) )* cellLength;
        var width = Math.floor( Math.random() * 5 + 3)* cellLength;
        var height = Math.floor( Math.random() * 5 + 3)* cellLength;
        
        var nx1 = x;
        var nx2 = x + width;
        var ny1 = y;
        var ny2 = y + height;
        
        var result = true;
        
        if(hero.x >= nx1 && hero.x <= nx2 && hero.y >= ny1 && hero.y <= ny2){
            
            result = false;
            
        }
        
        for(var i = 0 ; i < array.length ; i ++){
            
            var ox1 = array[i].x;
            var ox2 = array[i].x + array[i].width;
            var oy1 = array[i].y;
            var oy2 = array[i].y + array[i].height;
            
            if(nx1 <= ox1 && ny1 <= oy1 && ny2 >= oy1 && nx2 >= ox1 ||
            nx1 <= ox1 && ny1 >= oy1 && ny1 <= oy2 && nx2 >= ox1 ||
            nx1 >= ox1 && nx1 <= ox2 && ny1 <= oy1 && ny2 >= oy1 ||
            nx1 >= ox1 && nx1 <= ox2){
                
                result = false;
                
            }
            
        }
        
        for(var i = 0 ; i < defender.num ; i ++){
            
            if(defender.x[i] >= nx1 && defender.x[i] <= nx2 && defender.y[i] >= ny1 && defender.y[i] <= ny2){
                
                result = false;
                
            }
            
        }
        
        if(result){
            
            var node = {};
            
            node.x = x;
            node.y = y - cellLength;
            node.width = width;
            node.height = height;
            
            array.push(node);
            
        }
        
    }
    
    for(var i = 0 ; i < array.length ; i ++){
        
        this.x[i] = array[i].x;
        this.y[i] = array[i].y;
        this.width[i] = array[i].width;
        this.height[i] = array[i].height;
        
    }
    
}