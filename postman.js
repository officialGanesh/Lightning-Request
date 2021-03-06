console.log("Postman Clone 🏣");

class UI {

  static showAlerts(color,info) {
    
    let cont = document.querySelector(".container");
    let title = document.querySelector("#title");
    let div = document.createElement("div");
    div.classList= `alert alert-${color}`;
    div.setAttribute("role","alert");
    div.innerHTML = `${info}`;

    // Adding to UI
    cont.insertBefore(div,title);
    // Remove from UI
    setTimeout(()=>{
        document.querySelector(".alert").remove();
    },1500);
  };

  static addMoreParameters(){

    
    let queryBox = document.querySelector("#queryBox");
    let extraParameters = document.createElement("div");
    extraParameters.className = "row"; 
    extraParameters.style.marginTop = "10px";
    extraParameters.innerHTML = `<div class="col-sm"><button class="btn btn-info deleteParameters" >➖</button></div>
    <div class="col-sm"> <input type="text" class="form-control" placeholder="Key" style="text-align: center; border-left: none; border-right:none ; border-top: none;"></div>
    <div class="col-sm"> <input type="text" class="form-control" placeholder="Value" style="text-align: center; border-left: none; border-right:none ; border-top: none;"></div>`
    queryBox.append(extraParameters);
    
  };

  static addParametersOnClick(){
    let addBtn = document.querySelector("#addParameters");
    addBtn.addEventListener('click',()=>{
        UI.addMoreParameters()
    });
  };

  static removeParametersOnClick(){

    let queryBox = document.querySelector("#queryBox");
    
    queryBox.addEventListener("click",(e)=>{

        if(e.target.classList.contains("deleteParameters")){
            e.target.parentElement.parentElement.remove();
        }
    })
  };
  
  static makeRequests(url,method){

    if(method==='GET'){

        fetch(url).then(res=>{return res.text()})
        .then(data=>{document.querySelector("#floatingTextarea").innerHTML = data})
        .catch(err=>{UI.showAlerts('danger',`Something Went Wrong: ${err}`)});        
    }
    else if(method==="POST"){
        
      // Default parameters for "https://jsonplaceholder.typicode.com/posts"
      let data = {title: 'foo',
      body: 'bar',
      userId: 1,}; 
      
      

        fetch(url,{
            method:"POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
          }

        }).then(res=>{return res.text()})
        .then(data=>{document.querySelector("#floatingTextarea").innerHTML = data})
        .catch(err=>{UI.showAlerts('danger',`Something Went Wrong: ${err}`)});

    }
  };

  
};

//  add/remove parameters
UI.addParametersOnClick();
UI.removeParametersOnClick();

// Check For Requests
document.querySelector("#check").addEventListener('click',(e)=>{

    let url = document.querySelector("#url");
    let checkedValue = document.querySelector(`input[type="radio"]:checked`);

    //Check For Correct Method/URL
    if(url.value==="" || url.value===null){
        UI.showAlerts('danger',"Make A Requests: No URL");
    }

    if(checkedValue===null){
        UI.showAlerts('danger','Select A Requests Method')
    }

    UI.makeRequests(url.value,checkedValue.value);

});
