
/**
 * webComponent 组件
 * 
 * 在<script src="./myComponent.js"></script>中引用。
 * 
 * 使用方式：
 * <my-component title="myComponent" content="66666"></my-component>
 */

let tempHtml = document.createElement('template')
tempHtml.id = 'my-component'
tempHtml.innerHTML =  `
    <style>
        .title{
            color: brown;
        }
    </style>

    <h5 class="title"></h5>
    <div class="content"></div>
`
document.body.appendChild(tempHtml)
class MyComponent extends HTMLElement {
    constructor() {
        super()
        let templateElem = document.getElementById('my-component')
        let content = templateElem.content.cloneNode(true)
        content.querySelector('.title').innerText = this.getAttribute('title')
        content.querySelector('.content').innerText = this.getAttribute(
            'content'
        )
        // 原始
        this.appendChild(content)
    }
}
window.customElements.define('my-component', MyComponent)
