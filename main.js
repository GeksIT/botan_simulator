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

    UI={};
    Player={};
    Player.knowledge=0;
    Player.totalKnowledge=0;
    Player.knowledgeToSpend=0;
    Player.speedOfStuding=0;
    Player.speedLimit=150;
    Player.Upgrades={};
    Player.hitPower=1;
    Player.decreaseSpeed=1;
      
   
    //создание холста
    UI.stage = new createjs.Stage("canvas");

    //создание кнопки удара
    //обработка клика
     var hitFunction=function(){
        //увеличение скорости ботания и обновление содержимого дивов
        var x=Player.speedOfStuding+Player.hitPower;
        if(x<=Player.speedLimit){
           Player.speedOfStuding=x;
        }else if(x<=Player.speedLimit+Player.hitPower){
           Player.speedOfStuding=Player.speedLimit;
        }
        UI.speedCounter.text="Speed of studing: "+Player.speedOfStuding;
        UI.stage.update();
        
    }

    //создание кнопки удара
    UI.hitButton = new createjs.Shape();
    UI.hitButton.graphics.beginFill("DeepSkyBlue").drawRect(200,100,400,300);
    UI.hitButton.addEventListener("click", hitFunction);
    UI.stage.addChild(UI.hitButton);
    

    //создание счетчика знаний
    UI.totalKnowledgeCounter=new createjs.Text("Your total knowledge: "+Player.totalKnowledge,"40px Arial","black");
    UI.totalKnowledgeCounter.x=200;
    UI.totalKnowledgeCounter.y=450;
    UI.stage.addChild(UI.totalKnowledgeCounter);

    //создание счетчика знаний, которых можно тратить
    UI.knowledgeToSpendCounter=new createjs.Text("Your knowledge to spend: "+Player.knowledgeToSpend,"40px Arial","black");
    UI.knowledgeToSpendCounter.x=200;
    UI.knowledgeToSpendCounter.y=500;
    UI.stage.addChild(UI.knowledgeToSpendCounter);
    
    //создание счетчика скорости ботания
    UI.speedCounter=new createjs.Text("Speed of studing: "+Player.speedOfStuding,"40px Arial","black");
    UI.speedCounter.x=200;
    UI.speedCounter.y=550;
    UI.stage.addChild(UI.speedCounter);

    //обновление картинки
    UI.stage.update();

    //тикер - каждые 0,6 сек 
    setInterval(function(){
        //  увеличение знаний
        Player.totalKnowledge+=Player.speedOfStuding;
        Player.knowledgeToSpend+=Player.speedOfStuding;
        //  уменьшение скорости
        if(Player.speedOfStuding>=1)
            Player.speedOfStuding-=Player.decreaseSpeed;
        //обновление дивов
        UI.speedCounter.text="Speed of studing: "+Player.speedOfStuding;
        UI.totalKnowledgeCounter.text="Your total knowledge: "+Player.totalKnowledge;
        UI.knowledgeToSpendCounter.text="Your knowledge to spend: "+Player.knowledgeToSpend;
        UI.stage.update();
    },500);
    

// работаем в jsfiddle.net
//не забыть подключить последнюю версию jquery в менюшке слева
