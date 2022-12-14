class Schema extends NamedNode{
    constructor(named){
        super(named,undefined)
        Object.defineProperty(this,'tables',{
            writable:false,
            value:function(){return this.children}
        })
        delete this.parent;
        this.children;
    }
    #getOrCreate=function(tableName){
        var result = this[tableName];
        if(!result){
            result = new Table(tableName,this);
        }
        return result;
    }
    root=function(){
        return this;
    }
    parse=function(str,delim){
        if(!delim){
            delim=":";
        }
        var parts = str.split(delim);
        var tableName=parts[0];
        var columnName=parts[1];
        var columnType=parts[2];
        var fk;
        if(parts.length>3){
            fk=parts[3];
        }
        var table=this.#getOrCreate(tableName);
        var ctorOrArr=Schema.getTypeCtor(columnType);
        var column=new Column(columnName,table,ctorOrArr);
        if(fk){
            column.foreignKey=fk;
        }
        return this;
    }

    
    store(tablename, delim, strs){
        if(!Array.isArray(strs)){
            strs=[strs];
        }
        for(var i=0;i<strs.length;i++){
            var str=strs[i];
            this[tablename].store(delim,str);
        }
        
    }


    static parseSchema(delim,name, tables){
        if(tables!==undefined && tables instanceof String){
            tables=[tables];
        }
        if(Array.isArray(delim)){
            if(name==undefined||name==null){
                name=delim;
            } else {
                tables=delim;
            }
            delim=":";
        }
        if(Array.isArray(name)){
            tables=name;
            name="";
        }
        let result = new Schema(name);
        tables.forEach(str=>result.parse(str,delim));
        return result;
        
    }
    static getTypeCtor=function(str){
        if(str.startsWith("varchar(")){
            return VarChar.parse(str);
        }
        if(str.startsWith("int(")){
            return Int.parse(str);
        }
        if(str.startsWith("float")||str.startsWith("decimal")){
            return Decimal.parse(str);
        }
        if(str.startsWith("date")){
            return function(dateStr){return new Date(dateStr)};
        }
        if(str.startsWith("bit(")){
            return function(val){
                if(val){
                    val=val.toLowerCase();
                }
                if(['1',"t","true","\x01"].includes(val)){
                    return true;
                }
                return false;
            };
        }
        if(str.startsWith("enum(")){
            str=str.substring("enum(".length);
            str=str.substring(0,str.lastIndexOf(")"));
            var split = str.split(/\s*,\s*/g);
            for(var i=0;i<split.length;i++){
                var curr = split[i].trim();
                if(curr.startsWith("'")||curr.startWith('"')){
                    curr=curr.substring(1,curr.length-1);
                }
                split[i]=curr;
            }
            return split;
        }
    }
}