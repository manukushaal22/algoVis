import {Styles, Timer, DebugQueue} from "./common";

class Array{
    constructor(x, y, w, h, histogram= false, showtext=true) {
        this.x_start = x
        this.y_start = y
        this.x_end = x
        this.y_end = y
        this.w = w
        this.h = h
        this.list = []
        this.histogram=  histogram
        this.showtext = showtext;
    }

    delayed(fun){
        if(DebugQueue.debug){
            DebugQueue.queue.push(fun);
        } else {
            setTimeout(fun, Timer.timer)
            Timer.timer += Timer.unit
        }
    }

    createRectElement(x, y, w, h, color) {
        let ele = document.createElementNS('http://www.w3.org/2000/svg', "rect")
        ele.setAttribute("x", x.toString())
        ele.setAttribute("y", y.toString())
        ele.setAttribute("width", w.toString())
        ele.setAttribute("height", h.toString())
        ele.setAttribute("fill", color)
        ele.setAttribute("stroke", "grey")
        ele.setAttribute("stroke-width", "2")
        // ele.setAttribute("class", "draggable")
        return ele
    }

    createTextElement(cx, cy, color, text) {
        let ele2 = document.createElementNS('http://www.w3.org/2000/svg', "text")
        ele2.setAttribute("x", cx.toString())
        ele2.setAttribute("y", cy.toString())
        ele2.setAttribute("fill", color)
        ele2.innerHTML = text.toString();
        return ele2
    }

    pushEnd(val) {
        let container = document.getElementById("container")
        let ht = this.h
        if(this.histogram)
            ht *= +val
        let ele = this.createRectElement(this.x_end, this.y_end, this.w, ht, Styles.ele_color)
        let text = this.createTextElement(this.x_end + this.w/4, this.y_end + 2*this.w/3, Styles.arr_txt_color, val)
        let node = {
            x: this.x_end,
            y: this.y_end,
            val: val,
            ele: ele,
            text: text
        }
        this.list.push(node)
        this.x_end += this.w
        this.delayed(()=>{
            container.appendChild(ele)
            if(this.showtext)
                container.appendChild(text)
        })
    }

    setVal(idx, new_val, timed=false){
        if(timed){
            let this_obj = this;
            this.delayed(function (){
                this_obj.setVal(idx, new_val)
            })
        } else {
            this.list[idx].text.innerHTML = new_val.toString()
            this.list[idx].val = new_val
            let ht = this.h
            if(this.histogram)
                ht *= +new_val
            this.list[idx].ele.setAttribute('height', ht)
        }
    }

    getVal(idx){
        return this.list[idx].val
    }

    popEnd() {
        if(this.list.length === 0){
            throw new Error("ArrayBox Empty")
        }
        this.x_end -= this.w
        this.delayed(()=>{
            let node = this.list.pop()
            node.ele.remove()
            node.text.remove()
        })

    }

    isEmpty(){
        return this.list.length === 0;
    }

    pushFront(val) {
        if(this.isEmpty()){
            this.pushEnd(val)
            return;
        }
        this.pushEnd(this.list[this.list.length-1].val)
        this.shiftRight(0, this.list.length-1)
        this.delayed(()=>{
            this.setVal(0, val)
        })
    }

    shiftLeft(start, end) {
        if(end < start)
            throw new Error("end cant be lesser than start")
        let first = this.getVal(start)
        for (let i = start ; i < end; i++) {
            this.delayed(()=> {
                this.setVal(i, this.getVal(i+1))
            })
        }
        this.delayed(()=> {
            this.setVal(end, first)
        })
    }

    size(){
        return this.list.length
    }

    shiftRight(start, end) {
        if(end < start)
            throw new Error("end cant be lesser than start")
        let last = this.getVal( end)
        for (let i = end - 1 ; i >= start; i--) {
            this.delayed(()=>{
                this.setVal(i+1, this.getVal(i))
            })
        }
        this.delayed(()=> {
            this.setVal(start, last)
        })
    }

    popIndex(idx) {
        if(this.list.length -1 < idx){
            throw new Error("Index out of ArrayBox")
        }
        this.shiftLeft(idx, this.list.length - 1)
        this.popEnd()
    }
    popFront() {
        this.popIndex(0)
    }
    insertIndex(idx, val) {
        if(this.list.length-1 < idx){
            throw new Error("Index out of ArrayBox")
        }
        this.pushEnd(this.list[this.list.length-1].val)
        this.shiftRight(idx, this.list.length - 1)
        this.delayed(()=>{
            this.setVal(idx, val)
        })
    }
    swapIndices(index1, index2){
        this.delayed(()=>{
            let tmp = this.getVal(index2)
            this.setVal(index2, this.getVal(index1))
            this.setVal(index1, tmp)
        })

    }
    getList(){
        let l = [];
        for (const ele of this.list) {
            l.push(ele.val);
        }
        return l
    }
}

export {Array};
