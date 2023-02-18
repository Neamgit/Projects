const progressBar = document.getElementById("progress");
let monsHealth =  document.getElementById("mHealth").value;
let yourHealth =  document.getElementById("yHealth").value;
let count =0;  

function attack(){
   count=0;
    if(yourHealth>0 && monsHealth>0)
    {
      
        let x=Math.floor(Math.random()*10);
        let y=Math.floor(Math.random()*10);

        monsHealth -=x;
        yourHealth -=y;

        document.getElementById("mHealth").value=monsHealth;
        document.getElementById("yHealth").value=yourHealth;
        
        document.getElementById("test1").innerHTML='<span style="color: yellow;font-weight: bold;font-size: 20px;">Monster</span>'+" "+'<span style="color: black;font-weight: bold;">attacks and deals</span>'+x;
        document.getElementById("test2").innerHTML='<span style="color: yellow;font-weight: bold;font-size: 20px;">Player</span>'+" "+'<span style="color: black;font-weight: bold;">attacks and deals</span>'+y;

    }
    else
    {
        if(document.getElementById("mHealth").value==0 && document.getElementById("yHealth").value==0)
        {
           document.getElementById("RESULT").innerHTML="Game Over it's a draw <br<br> <input type='button' id='attackBtn5' onclick='New()' value='Start New Game'>"; 
           alert("Draw!!!");
           document.getElementById("attackBtn5").style.visibility = "visible";
        
        }
        else if(document.getElementById("mHealth").value==0 && document.getElementById("yHealth").value!=0)
        {
            document.getElementById("RESULT").innerHTML="You Won! <br><br> <input type='button' id='attackBtn5' onclick='New()' value='Start New Game'>"; 
            alert("YOU WON");
            document.getElementById("attackBtn5").style.visibility = "visible";
        }
    
        else if(document.getElementById("mHealth").value!=0 && document.getElementById("yHealth").value==0)
        {
            document.getElementById("RESULT").innerHTML="Monster Won <br><br> <input type='button' id='attackBtn5' onclick='New()' value='Start New Game'>"; 
            alert("Monster WON");
            document.getElementById("attackBtn5").style.visibility = "visible";
        
        }
        
    }
}

function SpecialAttack(){
    count=0;
    if(yourHealth>0 && monsHealth>0)
    {   
      //if the condition is (user can heal himself if he is 20% less than the max value of his progress bar)  
        // var progressBar = document.getElementById("yHealth");
        //  maxValue =progressBar.max ;

        // if(document.getElementById("yHealth").value < maxValue*0.8)
        if(yourHealth<= monsHealth*0.8)
        {
            let x=Math.floor(Math.random()*10)+10;
            let y=Math.floor(Math.random()*10);

            monsHealth -=x;
            yourHealth -=y;

            document.getElementById("mHealth").value=monsHealth;
            document.getElementById("yHealth").value=yourHealth;
            
            document.getElementById("test3").innerHTML="monster attacks:"+x;
            document.getElementById("test4").innerHTML="player attacks:"+y;
        }
    }
}

function heal(){

    if(count>=2){
        alert("Error!!");
        return;
    }
    if(yourHealth==100){
        alert("error!");
        return;
    }
    if(yourHealth>0 && monsHealth>0)
    {
      
        let y=Math.floor(Math.random()*10);

        yourHealth +=y;

        document.getElementById("yHealth").value=yourHealth;
        
        document.getElementById("test2").innerHTML="Player attack"+y;

        count ++;
    }
}

function GiveUp(){

    RESULT.innerHTML  = "<p align='center'> Game Over! </p><p align=center>Monster is the Winner!</p> <br> <input type='button' id='attackBtn5' onclick='New()' value='Start New Game'>";  
    document.getElementById("attackBtn5").style.visibility = "visible";
}

function New(){
    
    location.reload();

}
