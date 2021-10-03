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
    <div class="col-sm"> <input type="text" class="form-control" placeholder="Key" style="text-align: center;"></div>
    <div class="col-sm"> <input type="text" class="form-control" placeholder="Value" style="text-align: center;"></div>`
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

  static showOutputs(output){

    let textarea = document.querySelector("#floatingTextarea");
    textarea.innerHTML = `${output}`
    
  };

};


// Check For Requests

document.querySelector("#check").addEventListener('click',(e)=>{

    let url = document.querySelector("#url");
    let checkedValue = document.querySelector(`input[type="radio"]:checked`);
    
    if(url.value==="" || url.value===null){
        UI.showAlerts('danger',"Make A Requests: No URL");
    }

    else if(checkedValue===null){
        UI.showAlerts('danger','Select A Requests Method')
    }
    else{
        
        async function fetchData(){
            
            if(checkedValue.value==='GET'){
                return await fetch(url.value).then(res=>{return res.text()})
                .then(data=>{return data})
                .catch(err=>{UI.showAlerts('danger',`Something Went Wrong: ${err}`)});
            }
            else if(checkedValue.value==="POST"){
                    data = {}
                    
                    return await fetch(url.value,param = {
                        method:"Post",
                        headers:{'Content-Type':'application/json'},
                        body:data
                    }).then(res=>{return res.text()})
                    .then(data=>{ return data})
                    .catch(err=>{UI.showAlerts("danger",`Something Wenr Wrong: ${err}`)});
            }
        };
        
    };

    
});
