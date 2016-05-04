
var open = [];//定义open列表，储存待检查节点的坐标，fgh值

var close = [];//定义close列表，储存已检查过的节点

var path = [];//定义路径队列，储存最终生成的路径

var nowX;//记录特工当前坐标
var nowY;//记录特工当前坐标
var timer;//定时器

function openIn(node){//定义open入队函数
    
    open.push(node);
    
}

function openOut(node){//定义open出队函数
    
    for(var i = 0 ; i < open.length ; i ++){
        
        if(open[i].xIndex == node.xIndex && open[i].yIndex == node.yIndex){
            
            open.splice(i,1);
            break;
            
        }
        
    }
    
}

function closeIn(node){//定义close入队函数
    
    close.push(node);
    
}

function pathIn(node){//定义path入队函数
    
    path.push(node);
    
}

function pathOut(node){//定义path出队函数
    
    for(var i = 0 ; i < path.length ; i ++){
        
        if(path[i].xIndex == node.xIndex && path[i].yIndex == node.yIndex){
            
            path.splice(i,1);
            break;
            
        }
        
    }
    
}

function createNode(x,y,targetX,targetY){//定义节点包装函数
    
    var node = {};
    
    node.xIndex = x;
    node.yIndex = y;
    node.G = Math.abs(nowX - x) + Math.abs(nowY - y);
    node.H = Math.abs(targetX - x) + Math.abs(targetY - y);
    node.F = node.G + node.H;
    
    return node;
    
}

function getNode(){//定义在open队列中取H值最小的节点的函数
    
    var index = 0;
    var min = 1000;
    
    for(var i = 0 ; i < open.length ; i ++){
        
        if(open[i].H <= min){
            
            min = open[i].H;
            index = i;
            
        }
        
    }
    
    return open[index];
    
}

function isInClose(x,y){//定义检查节点是否在close队列中的函数
    
    for(var i = 0 ; i < close.length ; i ++){
        
        if(close[i].xIndex == x && close[i].yIndex == y){
            
            return true;
            
        }
        
    }
    
    return false;
    
}

function inspect(x,y){//定义检查节点是否可以进入open队列的函数
    
    if(x >= 0 && x < Math.ceil(canWidth/cellLength) && y >= 0 && y < Math.ceil(canHeight/cellLength) && map[y][x] == "#" && !isInClose(x,y)){
        
        return true;
        
    }else{
        
        return false;
        
    }
    
}

function selectNode(node,targetX,targetY){//定义搜索下一节点的函数
    
    var bool = false;
    
    if(inspect(node.xIndex - 1,node.yIndex)){
        
        openIn(createNode(node.xIndex - 1,node.yIndex,targetX,targetY));
        bool = true;
        
    }
    
    if(inspect(node.xIndex + 1,node.yIndex)){
        
        openIn(createNode(node.xIndex + 1,node.yIndex,targetX,targetY));
        bool = true;
        
    }
    
    if(inspect(node.xIndex,node.yIndex - 1)){
        
        openIn(createNode(node.xIndex,node.yIndex - 1,targetX,targetY));
        bool = true;
        
    }
    
    if(inspect(node.xIndex,node.yIndex + 1)){
        
        openIn(createNode(node.xIndex,node.yIndex + 1,targetX,targetY));
        bool = true;
        
    }
    
    if(!bool){
        
        pathOut(node);
        
    }
    
}

function bornPath(targetX,targetY){//定义执行函数，生成path路径
    
    nowX = (hero.x - cellLength/2)/cellLength;
    nowY = (hero.y - cellLength/2)/cellLength;
    var node = createNode(nowX,nowY,targetX,targetY);
    
    if(map[targetY][targetX] == "*"){
        
        return false;
        
    }
    
    openIn(node);
    
    while(open){
        
        if(node.xIndex == targetX && node.yIndex == targetY){
            
            pathIn(node);
            return true;
            
        }else{
            
            openOut(node);
            closeIn(node);
            pathIn(node);
            selectNode(node,targetX,targetY);
            node = getNode();
            
        }
        
    }
    
    return false;
    
}

function moveTo(event){//定义移动函数，用定时器控制特工坐标更新
    
    var event = event || window.event;
    
    var x = Math.floor((event.clientX - wrapper.offsetLeft)/cellLength);
    var y = Math.floor((event.clientY - wrapper.offsetTop)/cellLength);
    
    clearInterval(timer);
    open = [];
    close = [];
    path = [];
    
    if(map[y][x] == "!"){
        
        var angle = Math.atan( (y * cellLength + cellLength/2 - hero.y) / (x * cellLength + cellLength/2 - hero.x) );
        
        angle = x * cellLength + cellLength/2 < hero.x ? angle - Math.PI : angle;
        
        bullet.fire(hero.x,hero.y,"#44B811",angle);
        
        return;
        
    }
    
    if(bornPath(x,y)){
        
        var i = 0;
        
        var num = Math.floor( (path[path.length - 1].yIndex * cellLength - Math.round(canHeight / 2) ) / cellLength );
        
        timer = setInterval(function(){
            
            hero.move(path[i].xIndex,path[i].yIndex);
            
            i ++;
            
            if(i >= path.length){
                
                path = [];
                reset(num);
                clearInterval(timer);
                
            }
            
        },deltaTime);
        
    }
    
}