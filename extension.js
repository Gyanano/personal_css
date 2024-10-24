const widget = document.getElementById('floatingWidget');

function activeMenu() {
    if (!widget.classList.contains('active')) {
        widget.classList.remove('inactive');
        widget.classList.add('active');
    }
}
function deactiveMenu() {
    if (widget.classList.contains('active')) {
        widget.classList.remove('active');
        widget.classList.add('inactive');
    }
}

document.addEventListener('click', (e) => {
    if (!widget.contains(e.target)) {
        deactiveMenu();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('active')) {
        deactiveMenu();
    }
});

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        handleMenuItemClick(value);
    });
});

function exportMsgToJson() {
    const console_code = String.raw`(()=>{var e,t,o,a={255:e=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}e.exports=function(e,o){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";e.save=function(e){var n="text/plain",r=a?a.trim().toLowerCase().replace(/^[^\w\d]+|[^\w\d]+$/g,"").replace(/[\s\W-]+/g,"-"):"claude";"json"===o.toLowerCase()?(r+=".json",n="text/json","object"===t(e)&&(e=JSON.stringify(e,void 0,4))):"md"===o.toLowerCase()&&(r+=".md");var s=new Blob([e],{type:n}),i=document.createElement("a");i.download=r,i.href=window.URL.createObjectURL(s),i.dataset.downloadurl=[n,i.download,i.href].join(":");var d=new MouseEvent("click",{canBubble:!0,cancelable:!1,view:window,detail:0,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null});i.dispatchEvent(d)}}},361:e=>{e.exports=function(){var e=document.querySelector("div.flex-1.flex.flex-col.gap-3.px-4"),t=document.querySelector("button[data-testid='chat-menu-trigger']"),o=t?t.textContent:"";return{elements:e.querySelectorAll("div.font-claude-message, div.font-user-message"),title:o}}},380:e=>{e.exports=function(){return new Date(new Date(new Date(new Date).toISOString()).getTime()-6e4*(new Date).getTimezoneOffset()).toISOString().slice(0,19).replace("T"," ")}}},n={};function r(e){var t=n[e];if(void 0!==t)return t.exports;var o=n[e]={exports:{}};return a[e](o,o.exports,r),o.exports}e=r(255),t=r(380),o=r(361),function(){var a=[],n={meta:{exported_at:t()}},r=o(),s=r.title,i=r.elements;s&&(n.meta.title=s);for(var d=0;d<i.length;d++){var l=i[d],c={index:d},p=[],u=l.firstChild;if(u){if(u.nodeType===Node.ELEMENT_NODE){var f=[];if(l.classList.contains("font-claude-message")){c.type="response";var y=u.firstChild;y||(y=u),f=y.childNodes}else c.type="prompt",f=l.childNodes;for(var m=function(){var e=f[E];if(e.nodeType===Node.ELEMENT_NODE){if(N=e.tagName,h=e.textContent,"P"===N&&p.push({type:"p",data:h}),"OL"===N||"UL"===N){var t=[];e.childNodes.forEach((function(e,o){e.nodeType===Node.ELEMENT_NODE&&"LI"===e.tagName&&t.push({type:"li",data:e.textContent})})),"OL"===N&&p.push({type:"ol",data:t}),"UL"===N&&p.push({type:"ul",data:t})}if("PRE"===N){var o=e.querySelector("code"),a=o.textContent,n=o.classList[0].split("-")[1];p.push({type:"pre",language:n,data:a})}if("TABLE"===N){var r=[];e.childNodes.forEach((function(e){if(e.nodeType===Node.ELEMENT_NODE&&("THEAD"===e.tagName||"TBODY"===e.tagName)){var t=[];e.childNodes.forEach((function(e){if(e.nodeType===Node.ELEMENT_NODE&&"TR"===e.tagName){var o=[];e.childNodes.forEach((function(e){e.nodeType!==Node.ELEMENT_NODE||"TD"!==e.tagName&&"TH"!==e.tagName||o.push({type:e.tagName.toLowerCase(),data:e.textContent})})),t.push({type:"tr",data:o})}})),r.push({type:e.tagName.toLowerCase(),data:t})}})),p.push({type:"table",data:r})}}},E=0;E<f.length;E++){var N,h;m()}}u.nodeType===Node.TEXT_NODE&&(c.type="prompt",p.push(u.textContent)),c.message=p,a.push(c)}}n.chats=a,e(console,"json",s),console.save(n)}()})();`
    eval(console_code);
}

function exportMsgToMd() {
    const console_code = String.raw`(()=>{var e,t,n,o={255:e=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}e.exports=function(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";e.save=function(e){var a="text/plain",c=o?o.trim().toLowerCase().replace(/^[^\w\d]+|[^\w\d]+$/g,"").replace(/[\s\W-]+/g,"-"):"claude";"json"===n.toLowerCase()?(c+=".json",a="text/json","object"===t(e)&&(e=JSON.stringify(e,void 0,4))):"md"===n.toLowerCase()&&(c+=".md");var r=new Blob([e],{type:a}),i=document.createElement("a");i.download=c,i.href=window.URL.createObjectURL(r),i.dataset.downloadurl=[a,i.download,i.href].join(":");var l=new MouseEvent("click",{canBubble:!0,cancelable:!1,view:window,detail:0,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null});i.dispatchEvent(l)}}},361:e=>{e.exports=function(){var e=document.querySelector("div.flex-1.flex.flex-col.gap-3.px-4"),t=document.querySelector("button[data-testid='chat-menu-trigger']"),n=t?t.textContent:"";return{elements:e.querySelectorAll("div.font-claude-message, div.font-user-message"),title:n}}},380:e=>{e.exports=function(){return new Date(new Date(new Date(new Date).toISOString()).getTime()-6e4*(new Date).getTimezoneOffset()).toISOString().slice(0,19).replace("T"," ")}}},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return o[e](n,n.exports,c),n.exports}e=c(255),t=c(380),n=c(361),function(){var o="",a=n(),c=a.elements,r=a.title,i=t();o+="# ".concat(r||"Claude Chat","\n\`").concat(i,"\`\n\n");for(var l=0;l<c.length;l++){var d=c[l],s=d.firstChild;if(s){if(s.nodeType===Node.ELEMENT_NODE){var f=[];if(d.classList.contains("font-claude-message")){o+="_Claude_:\n";var u=s.firstChild;u||(u=s),f=u.childNodes}else o+="_Prompt_:\n",f=d.childNodes;for(var E=function(){var e=f[N];if(e.nodeType===Node.ELEMENT_NODE){if(m=e.tagName,p=e.textContent,"P"===m&&(o+="".concat(p,"\n")),"OL"===m&&e.childNodes.forEach((function(e,t){e.nodeType===Node.ELEMENT_NODE&&"LI"===e.tagName&&(o+="".concat(t+1,". ").concat(e.textContent,"\n"))})),"UL"===m&&e.childNodes.forEach((function(e,t){e.nodeType===Node.ELEMENT_NODE&&"LI"===e.tagName&&(o+="- ".concat(e.textContent,"\n"))})),"PRE"===m){var t=e.querySelector("code"),n=t.textContent,a=t.classList[0].split("-")[1];o+="\`\`\`".concat(a,"\n").concat(n,"\n\`\`\`\n")}if("TABLE"===m){var c="";e.childNodes.forEach((function(e){if(e.nodeType===Node.ELEMENT_NODE&&("THEAD"===e.tagName||"TBODY"===e.tagName)){var t="",n=0;if(e.childNodes.forEach((function(o){if(o.nodeType===Node.ELEMENT_NODE&&"TR"===o.tagName){var a="";o.childNodes.forEach((function(t){t.nodeType!==Node.ELEMENT_NODE||"TD"!==t.tagName&&"TH"!==t.tagName||(a+="| ".concat(t.textContent," "),"THEAD"===e.tagName&&n++)})),t+="".concat(a,"|\n")}})),c+=t,"THEAD"===e.tagName){var o="| ".concat(Array(n).fill("---").join(" | ")," |\n");c+=o}}})),o+=c}o+="\n"}},N=0;N<f.length;N++){var m,p;E()}}s.nodeType===Node.TEXT_NODE&&(o+="\n")}}e(console,"md",r),console.save(o)}()})();`
    eval(console_code);
}

function handleMenuItemClick(value) {
    switch (value) {
        case 'export_msg_to_json':
            exportMsgToJson();
            break;
        case 'export_msg_to_md':
            exportMsgToMd();
            break;
        default:
            break;
    }
}
