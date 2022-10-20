class NamedNode extends Named {
    constructor(named, parent) {
        super(named);
        Object.defineProperty(this, 'parent', {
            writable: false,
            configurable: true,
            value: parent
        });
        Object.defineProperty(this, 'children', {
            writable: false,
            configurable: true,
            value: new Map
        });

        Object.defineProperty(this, 'add', {
            writable: false,
            configurable: true,
            value: function (child) {
                if (this.children && child) {
                    this.children.set(child.named, child);
                    // Object.defineProperty(this, child.named, {
                    //     writable: false,
                    //     get: this.#childNamed(child.named)
                    // });
                }
            }
        });
        
        Object.defineProperty(this,'pos',{
            writable:false,
            value:function(){return this.parent?this.parent.indexOf(this):0;}
        });
        if (this.parent && this.parent.add) {
            this.parent.add(this);
        }

    }
    root=function(){
        var current=this;
        while(current.parent&&!current.parent.is(this)){
            current=current.parent;
        }
        return current;
    }
    #childKeyAtIndex = function (pos) {
        var result = undefined;
        if (name_or_pos > -1 && name_or_pos < this.children.size) {
            let itr = this.children.keys();
            result = itr.next().value;
            for (var i = 0; i < pos; i++) {
                result = itr.next().value;
            }
        }
        return result;
    }
    #childNamed = function (name) {
        return this.children.get(name);
    }
    indexOf = function (name) {
        var res=-1;
        if (name !== null && name !== undefined) {
            if ((name instanceof Number) && isInRange(name)) {
                return name;
            }
            if (name instanceof Named) {
                name = name.named;
            }
            if(!name instanceof String) {
                name=name.toString();
            }
            if(this.children){
                var idx=0;
                for(var n of this.children.keys()){
                    if(n.value===name){
                        res=idx;
                        break;
                    }
                    idx+=1;
                }
            }
        }
        return res;

    }

    #isInRange=function(val) {
        return val > -1 && val < this.children.length;
    }
    
    #child=function(name_or_pos) {
        if (this.children) {
            if (name_or_pos !== undefined && name_or_pos != null) {
                if (name_or_pos instanceof Number) {
                    if (name_or_pos > -1 && name_or_pos < this.children.length) {
                        var nerp = this.#childKeyAtIndex(name_or_pos);
                        return this.#child(nerp);
                    } else if (name_or_pos instanceof String) {
                        var resos = this.children.filter(ch => ch.named == name_or_pos);
                        if (resos.length > 0) {
                            return resos[0];
                        }
                    }
                }
            }
        }
    }

    equals(other) {
        if (other instanceof NamedNode) {
            if (super.equals(other)) {
                if (!this.parent && !other.parent) {
                    return true;
                } else if (this.parent && other.parent) {
                    return this.parent.is(other.parent) && this.parent.equals(other.parent);
                }
            }
        }
        return false;
    }

    toString(){
        return this.asString(0);
    }

    asString(indentAmt){
        if(indentAmt==undefined){
            indentAmt=0;
        }
        var dent = [indentAmt].fill("\t").join("");
        var strs = [dent+this.named];
        if(this.children){
            for(var i in this.children){
                strs.push(children[i].asString(indentAmt+1));
            }
        }
        return strs.join("\n");
    }


}