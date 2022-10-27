class VarChar extends String {
    static getTruncated(str, maxLen) {
        if (str !== null || str !== undefined) {
            if (!maxLen) {
                maxLen = Number.MAX_SAFE_INTEGER;
            }
            maxLen=parseInt(maxLen);
            let limit = Math.min(str.length);
            if(limit!=str.length){
                str = str.substring(0, limit);
            }
        }
        return str;
    }
    constructor(str,maxLen){
        super(VarChar.getTruncated(str,maxLen));
        if(maxLen===null||maxLen===undefined){
            maxLen=Number.MAX_SAFE_INTEGER;
        }
        maxLen=parseInt(maxLen);
        Object.defineProperty(this,'originalValue',{
            writable:false,
            value:str
        });
        Object.defineProperty(this,'maxLen',{
            writable:false,
            value:maxLen
        });
        Object.defineProperty(this,'tupleValue',{
            get:function(){
                return this.toString();
            }
        });
    }

    static parse(str){
        let regx = /[^(]*[(]([^)]*)[)].*/g
        let resos = regx.exec(str);
        var val = null;
        if(resos!=null&&resos.length>0){
            var asNum = parseInt(resos[1]);
            if(Number.isInteger(asNum)){
                val=asNum;
            }
        }
        return function(s){return new VarChar(s,val)};
    }
}