window.addEventListener('load', ()=>{
    var body=document.querySelectorAll("p.contentbody")
    console.log(body)
    body.forEach((item)=>{
        var text=item.outerText
        console.log(item)
        var newItem= truncatee(text,250);
        item.innerHTML=newItem;
    
    })

    
   function truncatee(str,len)
    {   
       if( str.length > len && str.length > 0 )
        {
            console.log("hapssspy")
            let new_str=str+' '
            new_str=str.substr(0,len)
            new_str=str.substr(0,new_str.lastIndexOf(' '))
            new_str=new_str.length>0? new_str:str.substr(0,len)
            return new_str + "..."
        } 
        return str
    }
})

var content=document.querySelector('.contentbody').innerHTML;
var twt=document.getElementById('share');
twt.addEventListener('click',tweetText);

function tweetText(){
    let tweetpost=`https://twitter.com/intent/tweet?text=${content}`
    window.open(tweetpost);
}









