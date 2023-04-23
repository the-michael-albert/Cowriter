function styleFormat(style){
    const str = style.replace(/\s/g, '');
    const regex = /calc\([^)]*\)/g;
    const result = str.replace(regex, (match) => {
        return match.replace(/-/g, " - ");
    }); 
    return result;
 }

const Block = class  {
    constructor(props){
     this.children = props.children;
     this.style = props.style;
     this.text = props.text;
     this.id = props.id;
   }
 
   render(){
     const opener = `<div id="` + this.id + `" style="` + styleFormat(this.style) + `">`;
     let middle = ``;
     for (const child in this.children) {
       middle += child.render()
     }
     const closer = `</div>`;
     return opener + middle + closer;
   }
 
}
 


const props = {
    id: "login-modal",
    text: "Login",
    style: "",
    children: [

    ]
}

const lp = new Block(props);
document.getElementById("container").innerHTML += lp.render();






