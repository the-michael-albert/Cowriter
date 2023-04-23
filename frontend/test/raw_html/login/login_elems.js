/**
 * +++ BUILDING BLOCK +++
 */
const Element = class {
    constructor(props){
     this.children = props.children;
     this.style = props.style;
     this.text = props.text;
     this.id = props.id;
   }
 
   render(){
     const opener = `<div id="` + this.id + `" style="` + styleFormat(this.style) + `">`;
     let middle = `` + this.text + ``;
     for (let i = 0; i < this.children.length; i++) {
        const element = this.children[i];
        middle += element;        
     }
     const closer = `</div>`;
     return opener + middle + closer;
   }
}

function styleFormat(style){
    const str = style.replace(/\s/g, '');
    const regex = /calc\([^)]*\)/g;
    const result = str.replace(regex, (match) => {
        return match.replace(/-/g, " - ");
    }); 
    return result;
}

const textBox = class {
    constructor(id, placeholder){
        this.text = placeholder;
        this.id = id;
        this.style = `
        border-radius: 10px;
        width: calc(100% - 40px);
        text-align: left;
        padding: 10px;
        margin-bottom: 20px;
        margin-left: 8px;
        margin-top: 0px;
        background-color: #eee;
        font-size: max(0.5em, 14px);
        color: #333;
        `;
    }
    
      render(){


        let opener = `<div id="label-` + this.id + `" style="` + `
        font-size:12px;
        width: 100%;
        text-align:left;
        margin-left: 8px;
        margin-bottom: 2px;
        ` + `">` + this.text + `</div>`;


        let middle = `<input id="` + this.id + `" style="` + styleFormat(this.style) + `"`;
        if (this.id == "password"){
            middle += `type="password"`;
        }
        const closer = `></input>`;
        return opener + middle + closer;
      }
}

const button = class {
    constructor(id, placeholder){
        this.text = placeholder;
        this.id = id;
    }
    
    render(){
        const opener = `<div id="button-container" style="width:100%;text-align:center;"><div id="` + this.id + `" class="button">`;
        let middle = this.text;
        const closer = `</div></div>`;
        return opener + middle + closer;
    }
}

const loginUsername = new textBox("username", "Username: ").render();
const loginPassword = new textBox("password", "Password: ").render();
const loginButton = new button("button-login", "Login!").render();

const loginModal = new Element({
    id: "login-modal",
    text: `<h1 style="width:100%; text-align: center;">Login: </h1>`,
    style: `
    font-size: max(2em, 22px);
    width: max(20vw, 350px);
    height: max(40vh, 400px);
    margin-top: calc(calc(100vh - max(40vh, 400px)) / 2);
    margin-left: calc(calc(100vw - max(20vw, 350px)) / 2);
    border: solid;
    border-radius: 12px;
    background-color: white;
    `,
    children: [
        loginUsername,
        loginPassword,
        loginButton
    ]
});