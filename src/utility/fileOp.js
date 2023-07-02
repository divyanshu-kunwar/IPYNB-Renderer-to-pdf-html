import {marked} from 'marked';
import DOMPurify from 'dompurify';

let read = (fileObj) => {
  if (fileObj) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = function (e) {
        const fileContent = e.target.result;
        resolve(fileContent);
      };
      reader.onerror = function (e) {
        reject(e);
      };
      reader.readAsText(fileObj);
    });
  }
};

let matchOutput = (mimeType) => {
    const mimes = {
        "text/html": "html",
        "text/markdown": "md",
        "text/csv": "csv",
        "text/plain": "text",
        "text/latex": "latex",
        "image/svg+xml": "svg",
        "application/json": "json",
        "text/*": "text",
        "image/*": "image",
        "audio/*": "audio",
        "video/*": "video",
        "application/*": "file",
    }
    for (let key in mimes) {
        if (mimeType.match(key)) {
            return mimes[key];
        }
    }
}

let domPurify = (content) => {
    return DOMPurify.sanitize(content);
}

let mdToHtml = (content) => {
    content = marked(content , {mangle: false , headerIds: false});
    return content;
}

let csvToHtml = (content) => {
    const rows = content.split('\n');
    let htmlTable = '<table>';
    rows.forEach((row) => {
      const cells = row.split(',');
      htmlTable += '<tr>';
      cells.forEach((cell) => {
        htmlTable += `<td>${cell}</td>`;
      });
      htmlTable += '</tr>';
    });
    htmlTable += '</table>';
    console.log(htmlTable);
    return htmlTable;
}

let htmlEscape = (content) => {
    return content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let formatSource = (source, type) => {
    if (type == "text"){
        return htmlEscape(source);
    }
    else if (type == "md"){
        return  mdToHtml(domPurify(source));
    }
    else if (type == "html"){
        return domPurify(source);
    }
    else if (type == "csv"){
        return csvToHtml(htmlEscape(source));
    }
    else if (type == "json"){
        return htmlEscape(source);
    }
    return source;
}

let simplify = (jsonString) => {
  let data = JSON.parse(jsonString);
  let dataSimp = [];
  data["cells"].forEach((element) => {
    if (element["cell_type"] == "markdown") {
        let source = element["source"].reduce((res, ele) => {
            return res + ele;
        }, "");
        source = mdToHtml(domPurify(source));
      dataSimp.push({
        type: "md",
        source: source,
      });
    } else if (element["cell_type"] == "code") {

        let source = element["source"].reduce((res, ele) => {
            return res + ele;
        }, "");
        source = htmlEscape(source);
      dataSimp.push({
        type: "code",
        source: source,
      });
      element["outputs"].forEach((ele) => {

        if (ele["data"] != undefined) {
          let keys = Object.keys(ele["data"]);
          
          dataSimp.push({
              type: "md",
              source: "<h4>Output</h4>"
          });

          keys.forEach((key) => {

            let type = matchOutput(key);
            let source = ele["data"][key]
            if(source != undefined && typeof(source) == "object"){
                source = source.reduce((res, ele) => {
                    return res + ele;
                }, "");
            }else{
                source = "";
            }
            let formattedSource = formatSource(source, type);
            
            dataSimp.push({
                type: type,
                source: formattedSource,
            });

          });

          dataSimp.push({
                type: "md",
                source: "<br>"
            });
        }

      });
    }
  });
  return dataSimp;
};

let JSONToHTML = (jsonData) => {
    let jsonS = "";
    if (jsonData.type == "code" || jsonData.type == "json" || jsonData.type == "text"){
        jsonS = `<pre>${jsonData.source}</pre>`;
    }
    else if(jsonData.type == "image"){
        jsonS = `<img src="${jsonData.source}" />`;
    }
    else if(jsonData.type == "svg"){
        jsonS = `<object data="${jsonData.source}" type="image/svg+xml"></object>`;
    }
    else if(jsonData.type == "audio"){
        jsonS = `<audio controls><source src="${jsonData.source}" type="audio/mpeg"></audio>`;
    }
    else if(jsonData.type == "video"){
        jsonS = `<video controls><source src="${jsonData.source}" type="video/mp4"></video>`;
    }
    else if(jsonData.type == "html"){
        jsonS = '<object data="${jsonData.source}" type="text/html"></object>';
    }
    else if(jsonData.type == "md" || jsonData.type == "csv"){
        jsonS = jsonData.source;
    }else if(jsonData.type == "latex"){
        jsonS = `<p class="latex">${jsonData.source}</p>`
    }else if(jsonData.type == "file"){
        jsonS = `<a href="${jsonData.source}" download>file</a>`;
    }
    else{
        jsonS = ""
    }
    let html = `<div class="${jsonData.type}">${jsonS}</div>`;
    return html;
}

let renderHTML = (jsonArray) => {
    console.log(jsonArray);
    let html = "";
    jsonArray.forEach((element) => {
        html += JSONToHTML(element);
    });
    console.log(html);
    return html;

}

let readFile = (file) => {
  console.log(file);
  if (file.name.split(".").pop() == "ipynb") {
    read(file)
      .then((content) => {
        renderHTML(simplify(content));
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default readFile;