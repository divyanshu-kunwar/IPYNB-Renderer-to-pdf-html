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
        "image/svg*": "svg",
        "text/latex": undefined,
        "text/html": "html",
        "text/markdown": "md",
        "text/csv": "csv",
        "text/plain": "text",
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
    return htmlTable;
}

let htmlEscape = (content) => {
    return content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace('"' , '\"').replace("'" , "\'");
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
  let language = 'python'
  try{
    if(data['metadata']['kernelspec']['language']){
      language = data['metadata']['kernelspec']['language']
    }else if(data['metadata']['language_info']['name']){
      language = data['metadata']['language_info']['name']
    }
  }catch(e){ 
  console.log("setting default language") 
  console.log(e)
  }
  console.log(language)
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
        language: "language-"+language,
      });
      element["outputs"].forEach((ele) => {

        if (ele["data"] != undefined) {
          let keys = Object.keys(ele["data"]);

          if(keys.length > 1){
            console.log(keys)
            if(keys.includes("text/html")){
              keys = ["text/html"]
            }else if(keys.includes("text/markdown")){
              keys = ["text/markdown"]
            }else if(keys.includes('image/svg+xml')){
              keys = ['image/svg+xml']
            }
          }

          keys.forEach((key) => {

            let type = matchOutput(key);
            
            if(type != undefined){
              let source = ele["data"][key]
              if(source != undefined && typeof(source) == "object"){
                  source = source.reduce((res, ele) => {
                      return res + ele;
                  }, "");
              }
              let formattedSource = formatSource(source, type);

              if(formatSource != ""){
                dataSimp.push({
                    type: type,
                    source: formattedSource,
                });
              }
              
          }

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
        let class_ =""
        if(jsonData.type=="json") class_ = "lang-json"
        else if (jsonData.type=="text") class_ = "lang-txt"
        else class_ = jsonData.language
        jsonS = `<pre class=${class_}>${jsonData.source}</pre>`;
    }
    else if(jsonData.type == "svg"){
        jsonS = `<div class="svg-image"> ${jsonData.source} </div>`;
    }
    else if(jsonData.type == "image"){
        jsonS = `<img src="${jsonData.source}" />`;
    }
    else if(jsonData.type == "audio"){
        jsonS = `<audio controls><source src="${jsonData.source}" type="audio/mpeg"></audio>`;
    }
    else if(jsonData.type == "video"){
        jsonS = `<video controls><source src="${jsonData.source}" type="video/mp4"></video>`;
    }
    else if(jsonData.type == "html"){
        jsonS = `<div> ${jsonData.source.toString()} </object>`;
    }
    else if(jsonData.type == "md" || jsonData.type == "csv"){
        jsonS = jsonData.source;
    }else if(jsonData.type == "file"){
        jsonS = `<a href="${jsonData.source}" download>file</a>`;
    }
    else{
        jsonS = ""
    }
    let html = `<div class="cell ${jsonData.type}">${jsonS}</div>`;
    return html;
}
let style = `
<style>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(30, 30, 40);
}
.page {
  margin: 2in;
  width: 8.3in;
  /* height: 11.7in; */
  padding: 1.2in;
  border-radius: 4px;
  font-family: "Times New Roman", Times, serif;
  
  color: black;
  background: #fff; /* Old browsers */

  box-shadow: 0 0 2px 0 #f4f4f6 inset,
    0em 2px 0 rgba(255,255,255,.7),
    0em 10px 80px -10px rgba(255,255,255,0.7),
    0px -5px 25px 0px #808f8c
    ;

    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
     -ms-transition: all .5s ease;
      -o-transition: all .5s ease;
         transition: all .5s ease;
}

.page:hover{
    transform: scale(1.02);
}
p {
  color: #101010;
  font-size: 14pt;
}
strong {
  color: #202020;
}

H1 {
  font-size: 28pt;
}
H2 {
  font-size: 24pt;
}
H3 {
  font-size: 20pt;
}
H4 {
  font-size: 16pt;
}
H5 {
  font-size: 14pt;
}
H6 {
  font-size: 12pt;
}
a:link {
  color: #d73a49;
  /* color: #FF0F5F; */
  text-decoration: none;
}

/* first h1 tag */
.title {
  margin-left: 20%;
  width: 80%;
  text-align: right;
  padding-bottom: 0.2in;
}
.subtitle {
  margin-left: 20%;
  width: 80%;
  text-align: right;
  border-bottom: 1px solid black;
  text-transform: uppercase;
  padding-bottom: 0.2in;
}

/* print media */
@media print {
  body {
    width: 8.3in;
    height: 11.7in;
    background-color: white !important;
    background: white;
    padding: 0.8in;
    page-break-after: avoid;
  }
  .page{
        background-color: white !important;
        background: white;
        box-shadow: none;
    }
}

.hljs{
    border: 1px solid #a8b0b8;
    padding: 0.2in;
    background-color: transparent !important;
    border-radius: 6px;
    /* allow text wraping */
    overflow-wrap: break-word;
    white-space: pre-wrap;
}

.MathJax_Display, .MathJax_Preview { 
    display: none !important; 
}

.latex-equation {
    display: inline-block;
}

.hljs-ln-numbers {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    text-align: center;
    color: #a8b0b8;
    border-right: 1px solid #a8b0b8;
    padding: 0px 10px 0px 0px !important;
    vertical-align: top;

    /* your custom style here */
}

/* for block of code */
.hljs-ln-code {
    padding-left: 15px !important;
}
.hljs {
  color: #24292e;
  background: #ffffff;
}

.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-variable.language_ {
  /* prettylights-syntax-keyword */
  color: #d73a49;
}

.hljs-title,
.hljs-title.class_,
.hljs-title.class_.inherited__,
.hljs-title.function_ {
  /* prettylights-syntax-entity */
  color: #6f42c1;
}

.hljs-attr,
.hljs-attribute,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-operator,
.hljs-variable,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id {
  /* prettylights-syntax-constant */
  color: #005cc5;
}

.hljs-regexp,
.hljs-string,
.hljs-meta .hljs-string {
  /* prettylights-syntax-string */
  color: #032f62;
}

.hljs-built_in,
.hljs-symbol {
  /* prettylights-syntax-variable */
  color: #e36209;
}

.hljs-comment,
.hljs-code,
.hljs-formula {
  /* prettylights-syntax-comment */
  color: #6a737d;
}

.hljs-name,
.hljs-quote,
.hljs-selector-tag,
.hljs-selector-pseudo {
  /* prettylights-syntax-entity-tag */
  color: #22863a;
}

.hljs-subst {
  /* prettylights-syntax-storage-modifier-import */
  color: #24292e;
}

.hljs-section {
  /* prettylights-syntax-markup-heading */
  color: #005cc5;
  font-weight: bold;
}

.hljs-bullet {
  /* prettylights-syntax-markup-list */
  color: #735c0f;
}

.hljs-emphasis {
  /* prettylights-syntax-markup-italic */
  color: #24292e;
  font-style: italic;
}

.hljs-strong {
  /* prettylights-syntax-markup-bold */
  color: #24292e;
  font-weight: bold;
}

.hljs-addition {
  /* prettylights-syntax-markup-inserted */
  color: #22863a;
  background-color: #f0fff4;
}

.hljs-deletion {
  /* prettylights-syntax-markup-deleted */
  color: #b31d28;
  background-color: #ffeef0;
}
table{
  border:none !important;
  width:100%;
}
td,th{
border:none;
padding:4px;
overflow:hidden;
text-align:center;
}
</style>
`

let head = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>

<script>
  hljs.highlightAll();
  // hljs.initLineNumbersOnLoad();

  document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll("pre").forEach((el) => {
        // el.classList.add("language-python");
      hljs.highlightElement(el);
      // hljs.lineNumbersBlock(el);
    });

    document.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });
  });
</script>

`

let renderHTML = (jsonArray) => {
  let html = []
  html.push(style)
  jsonArray.forEach((element) => {
    jsonArray['source'] = JSONToHTML(element);
    html.push(jsonArray['source'])
  });
  console.log(jsonArray);
  // open a dialog and save as file
  html = `<html><head>${head}</head><body><div class='page'>${html.join('')}</div></body></html>`

  var blob = new Blob([html], { type: 'text/html' });

  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = "hello.html";

  // Append the anchor element to the body
  document.body.appendChild(a);

  // Programmatically trigger the click event
  a.click();

  // Remove the anchor element from the body
  document.body.removeChild(a);

  return jsonArray;
}

let readFile = (file) => {
  if (file.name.split(".").pop() == "ipynb") {
    read(file)
      .then((content) => {
        // here we get raw html that is to be rendered
        renderHTML(simplify(content));

      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default readFile;