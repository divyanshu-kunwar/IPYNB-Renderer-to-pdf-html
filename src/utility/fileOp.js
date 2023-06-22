let read = (fileObj) => {
    if(fileObj){
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = function(e) {
                const fileContent = e.target.result;
                resolve(fileContent);
              };

              reader.onerror = function(e) {
                reject(e);
              };
              
              reader.readAsText(fileObj);
        })
    }
}

let simplify = (jsonString) => {
    let data  = JSON.parse(jsonString)
    let dataSimp = []
    data["cells"].forEach(element => {
        if(element["cell_type"]=="markdown"){
            dataSimp.push({
                "type":"md",
                "source": element["source"].reduce((res , ele)=> 
                { return res+ele } , "")
            })
        }
        else if(element["cell_type"]=="code"){
            // console.log(element)
            dataSimp.push({
                "type":"code",
                "source":element["source"].reduce((res , ele)=> 
                { return res+ele } , ""),
                "data": element["outputs"].map((ele)=> {return ele["data"]})
            })
        }
    });
    console.log(dataSimp)
    return
}

let readFile = (file) => {
    console.log(file)
    if (file.name.split('.').pop() == 'ipynb') {
        read(file).then(content => {
            console.log("got the output let's simplify")
            // call the convert to simple json format
            simplify(content)

        }).catch(error => {
            console.log(error)
        })
    }
}
  
export default readFile