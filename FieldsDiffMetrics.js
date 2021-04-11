const axios = require('axios');

sparkEndPoint = 'http://10.46.39.163:4040/metrics/json/';

axios.get(sparkEndPoint).then(res=>{
    var coun = [];
    var recSame;
    var recNotSame;
    var counters = res.data;
    for(var c in counters.gauges){
        if(c.includes('fields')){
            if(counters.gauges[c].value > 0)
            coun.push({name: c.split('fields.')[1], value: counters.gauges[c].value})
        }
        if(c.includes('counter.algo-validation.rejected-full')){
            recSame = counters.gauges[c].value;
        }
        if(c.includes('counter.algo-validation.passed-full')){
            recNotSame = counters.gauges[c].value;
        }
    }
    coun.sort(function(a,b){return a.value > b.value ? -1 : 1});

    var total = (recNotSame+recSame);
    console.log('total input : '+ total)
    console.log('Matched with UBER : '+ (recSame) +' -->> ' + (recSame/total)+"%")
    console.log('Diff with UBER : '+ (recNotSame)+' -->> ' + (recNotSame/total)+"%")
    coun.forEach(c=>{console.log(c)})
})




