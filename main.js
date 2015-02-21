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

function Upgrade(name, price, parameter, value) {
    this.name = name;
    this.level = 0; //уровень апгрейда
    this.getPrice = price; //метод-возвращает цену в знаниях (на вход принимает следующий уровень)
    this.parameter = parameter; //тот параметр,который увеличивает апгрейд
    this.getValue = value; //метод- то, на сколько увеличивает
    this.currentPrice = price(0 + 1);
    this.currentValue = value(0 + 1);

}

function UpgradeButton(name,x,y,color){
    var Button = new createjs.Shape();
    Button.graphics.beginFill(color).drawRect(585+65*x,50+65*y , 60, 60);
    Button.addEventListener("click", function(){activateUpgrade(name);});
    UI.stage.addChild(Button);
    return Button;
}

function getUpgradeByName(name){
    for(var i=0;i<Player.upgrades.length;i++)
        if(Player.upgrades[i].name==name)
            return Player.upgrades[i];
    return -1;
}

function activateUpgrade(name) {
    var Up=getUpgradeByName(name);
    if( Up.currentPrice<=Player["knowledgeToSpend"] ){
        Player[Up.parameter] += Up.currentValue;
        Player["knowledgeToSpend"] -= Up.currentPrice;
        Up.level++;
        Up.currentPrice = Up.getPrice(Up.level + 1);
        Up.currentValue = Up.getValue(Up.level + 1);
        
        UI.speedCounter.text = "Learning rate: " + Player.speedOfStuding * 2 + " per second";
        UI.totalKnowledgeCounter.text = "Total knowledge: " + Player.totalKnowledge;
        UI.knowledgeToSpendCounter.text = "Knowledge to spend: " + Player.knowledgeToSpend;
        UI.stage.update();
    }
}



//присваивание стартовых переменнных

UI = {};
Player = {};
Player.knowledge = 0;
Player.totalKnowledge = 0;
Player.knowledgeToSpend = 0;
Player.speedOfStuding = 0;

Player.speedInfimum = 0;
Player.speedSupremum = 150;

Player.hitPower = 1;
Player.decreaseSpeed = 1;
Player.upgrades = [];
Player.upgrades[0] = new Upgrade("Autopunch", function (level) {return level*level*1000;}, "speedInfimum", function (level) { return level*10;});

Player.upgrades[1] = new Upgrade("Heavy hand", function (level) {return level*level*1000;}, "hitPower", function (level) { return level;});




//создание холста
UI.stage = new createjs.Stage("canvas");

//создание кнопки удара
//обработка клика
var hitFunction = function () {
    //увеличение скорости ботания и обновление содержимого дивов
    var x = Player.speedOfStuding + Player.hitPower;
    if (x <= Player.speedSupremum) {
        Player.speedOfStuding = x;
    } else if (x <= Player.speedSupremum + Player.hitPower) {
        Player.speedOfStuding = Player.speedSupremum;
    }
    UI.speedCounter.text = "Learning rate: " + Player.speedOfStuding * 2 + " per second";
    UI.stage.update();

};

//создание кнопки удара
UI.hitButton = new createjs.Shape();
UI.hitButton.graphics.beginFill("DeepSkyBlue").drawRect(200, 100, 400, 300);
UI.hitButton.addEventListener("click", hitFunction);
UI.stage.addChild(UI.hitButton);


//создание счетчика знаний
UI.totalKnowledgeCounter = new createjs.Text("Total knowledge: " + Player.totalKnowledge, "30px Serif", "black");
UI.totalKnowledgeCounter.x = 20;
UI.totalKnowledgeCounter.y = 550;
UI.stage.addChild(UI.totalKnowledgeCounter);

//создание счетчика знаний, которых можно тратить
UI.knowledgeToSpendCounter = new createjs.Text("Knowledge to spend: " + Player.knowledgeToSpend, "30px Serif", "black");
UI.knowledgeToSpendCounter.x = 20;
UI.knowledgeToSpendCounter.y = 510;
UI.stage.addChild(UI.knowledgeToSpendCounter);

//создание счетчика скорости ботания
UI.speedCounter = new createjs.Text("Learning rate: " + Player.speedOfStuding * 2 + " per second", "30px Serif", "black");
UI.speedCounter.x = 20;
UI.speedCounter.y = 5;
UI.stage.addChild(UI.speedCounter);

UI.upgradeButtons=[];
UI.upgradeButtons[0];
//апгрейд autopunch
UI.upgradeButtons[0] = new UpgradeButton("Autopunch",1,1,"Red");
UI.upgradeButtons[0] = new UpgradeButton("Heavy hand",2,1,"Green");


//обновление картинки
UI.stage.update();

//тикер - каждые 0,6 сек 
setInterval(function () {
    //  увеличение знаний
    Player.totalKnowledge += Player.speedOfStuding;
    Player.knowledgeToSpend += Player.speedOfStuding;
    //  уменьшение скорости
    if (Player.speedOfStuding >= Player.speedInfimum + Player.decreaseSpeed) Player.speedOfStuding -= Player.decreaseSpeed;
    //обновление дивов
    UI.speedCounter.text = "Learning rate: " + Player.speedOfStuding * 2 + " per second";
    UI.totalKnowledgeCounter.text = "Total knowledge: " + Player.totalKnowledge;
    UI.knowledgeToSpendCounter.text = "Knowledge to spend: " + Player.knowledgeToSpend;
    UI.stage.update();
}, 500);



// работаем в jsfiddle.net
//не забыть подключить последнюю версию jquery в менюшке слева
