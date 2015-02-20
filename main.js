  /*
     диздок
     
     симулятор ботана
     
     сидит студент
     огранниченное время до экзамена-двое календарных суток
     мы должны заставить студента учиться
     
     основной способ- пиздюли (подзатыльники)
      
     у студента есть два основных параметра- скорость учебы в секунду и количество уже полученных знаний
     
     пиздюль единовременно увеличивает скорость учебы, но она сама падает с течением времени
     
     кроме того у скорости учебы есть верхняя граница 
     
     с помощью апгрейдов ее можно увеличить
     
     кроме того есть апгрейды дающие автопиздюли
     
     кроме того есть кофе 
     
     полученные знания увеличивают два стата- общий объем знаний (нужен для хорошего финала) и объем знаний который можно потратить
     
    
    
    */
    
    /*
    function Box(color) // Constructor
    {
        this.color = color;
    }
    
    Box.prototype.getColor = function()
    {
        return this.color;
    }
    
    var blueBox = new Box("blue");
    alert(blueBox.getColor()); // will alert blue
    */
    
    function Upgrade(name,level,price,parameter,value){
     this.name=name;
     this.level=level;//уровень апгрейда
     this.getPrice=price;//метод-возвращает цену в знаниях (на вход принимает следующий уровень)
     this.parameter=parameter;//тот параметр,который увеличивает апгрейд
     this.getValue=value;//метод- то, на сколько увеличивает
     this.currentPrice=getPrice(1);
     this.currentValue=getValue(1);
     
    }
    
    //присваивание стартовых переменнных
    Game={};
    Game.Player={};
    Game.Player.knowledge=0;
    Game.Player.totalKnowledge=0;
    Game.Player.speedOfStuding=0;
    Game.Player.speedLimit=150;
    Game.Player.Upgrades={};
    Game.Player.hitPower=4;
    Game.Player.decreaseSpeed=1;
    
    // в див speed пишем 0 (текущую скорость учебы)
    $("#speed").text(0);
    
    //обработка клика
    $("#hitButton").click(function(){
        //увеличение скорости ботания и обновление содержимого дивов
        var x=Game.Player.speedOfStuding+Game.Player.hitPower;
        if(x<=Game.Player.speedLimit){
           Game.Player.speedOfStuding=x;
           $("#speed").text(  Game.Player.speedOfStuding );
        }else if(x<=Game.Player.speedLimit+Game.Player.hitPower){
            Game.Player.speedOfStuding=Game.Player.speedLimit;
           $("#speed").text( Game.Player.speedOfStuding );
        }

        
    });

    //тикер - каждые 0,6 сек 
    setInterval(function(){
        //  увеличение знаний
        Game.Player.totalKnowledge+=Game.Player.speedOfStuding;
        //  уменьшение скорости
        if(Game.Player.speedOfStuding>=1)
            Game.Player.speedOfStuding-=Game.Player.decreaseSpeed;
        //обновление дивов
        $("#speed").text(Game.Player.speedOfStuding);
        $("#knowledge").text(Game.Player.totalKnowledge);
    },600);
