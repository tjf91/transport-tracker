module.exports={
    handleData:(input)=>({
        'state':input.state,
        [input.type]:input.value,        
    }),
     groupBy:(data) => {  
        return data.reduce((ac, object) => {
        const key = object['state'];
        if(!ac[key]){
           ac[key]=[]
        }
        if(ac[key]===object[key]){
           return {...ac,...object}
        }
        else{
           ac[key].push(object)
        }
        return ac;
        },{});
        },
        getStates:(data)=>{  
            let results=[]
              for(let i in data){
                results.push(data[i].reduce((r,a)=>{
                  return{...r,...a}
                }))      
           } 
           return results
          }
}