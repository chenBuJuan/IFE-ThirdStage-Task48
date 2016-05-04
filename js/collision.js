function heroDefenderCollision(){//检测特工与守卫者视野是否碰撞
    
    for(var i = 0 ; i < defender.num ; i ++){
        
        if(defender.bool[i]){
            
            var distance = Math.sqrt( Math.pow(hero.x - defender.x[i],2) + Math.pow(hero.y - defender.y[i],2) );
            
            if( distance < hero.radius + defender.field[i] ){
                
                var angle = Math.atan( (hero.y - defender.y[i]) / (hero.x - defender.x[i]) );
                
                angle = hero.x < defender.x[i] ? angle - Math.PI : angle;
                
                bullet.fire(defender.x[i],defender.y[i],"#F05F48",angle);
                
            }
            
        }
        
    }
    
}

function bulletBlockCollision(){//检测子弹与障碍物是否碰撞
    
    for(var i = 0 ; i < bullet.num ; i ++){
        
        if(bullet.bool[i]){
            
            for(var j = 0 ; j < block.num ; j ++){
                
                if(bullet.x[i] >= block.x[j] && bullet.x[i] <= block.x[j] + block.width[j] &&
                bullet.y[i] >= block.y[j] && bullet.y[i] <= block.y[j] + block.height[j]){
                    
                    bullet.dead(i);
                    
                }
                    
            }
            
        }
        
    }
    
}

function bulletDefenderCollision(){//检测子弹与守卫者是否碰撞
    
    for(var i = 0 ; i < bullet.num ; i ++){
        
        if(bullet.bool[i] && bullet.color[i] == "#44B811"){
            
            for(var j = 0 ; j < defender.num ; j ++){
                
                if(defender.bool[j]){
                    
                    var distance = Math.sqrt( Math.pow(bullet.x[i] - defender.x[j],2) + Math.pow(bullet.y[i] - defender.y[j],2) );
                    
                    if(distance < defender.radius + bullet.radius){
                        
                        bullet.dead(i);
                        defender.dead(j);
                        Score += 100;
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
}

function bulletCanvasCollision(){//检测子弹是否超出画布
    
    for(var i = 0 ; i < bullet.num ; i ++){
        
        if(bullet.bool[i]){
            
            if(bullet.x[i] < 0 || bullet.x[i] > canWidth || bullet.y[i] < 0 || bullet.y[i] > canHeight){
                
                bullet.dead(i);
                
            }
            
        }
        
    }
    
}

function bulletHeroCollision(){//检测子弹与特工是否碰撞
    
    for(var i = 0 ; i < bullet.num ; i ++){
        
        if(bullet.bool[i]){
            
            var distance = Math.sqrt( Math.pow(bullet.x[i] - hero.x,2) + Math.pow(bullet.y[i] - hero.y,2) );
            
            if(distance < hero.radius + bullet.radius && bullet.color[i] == "#F05F48"){
                
                bullet.dead(i);
                GAME = false;
                
            }
            
        }
        
    }
    
}

function collision(){//调用函数
    
    heroDefenderCollision();
    bulletBlockCollision();
    bulletCanvasCollision();
    bulletDefenderCollision();
    bulletHeroCollision();
    
}