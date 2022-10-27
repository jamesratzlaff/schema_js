class Int extends Number{
    static toPrecision(val, precision){
        if(val==null||val==undefined){
            return val;
        }
        if(!this.isInteger(val)){
            val=this.parseInt(val+"");
        }
        var asStr=val+"";
        var overLen = asStr.length-precision;
        if(overLen>0){
            asStr=asStr.substring(overLen);
        }
        return this.parseInt(asStr);
    }

    constructor(val, precision, toPrecisionFunc){
        super(toPrecisionFunc?toPrecisionFunc(val):Int.toPrecision(val,precision));
        precision=(precision!==null&&precision!==undefined)?parseInt(precision):(Number.MAX_SAFE_INTEGER).toString().length;

        Object.defineProperty(this,'originalValue',{
            writable:false,
            value:val
        });
        Object.defineProperty(this,'precision',{
            writable:false,
            value:precision
        });
        Object.defineProperty(this,'tupleValue',{
            configurable:true,
            get:function(){return parseInt(this.toString(10))}
        });
        
    }
    
    
    static parse(str){
        let regx = /[^(]*[(]([^)]*)[)].*/g
        let resos = regx.exec(str);
        var precision = null;
        if(resos!=null&&resos.length>0){
            var asNum = parseInt(resos[1].trim());
            if(Number.isInteger(asNum)){
                precision=asNum;
            }
        }
        return function(i){return new Int(i,precision)};
    }


}