const axios = require('axios');

sparkEndPoint = 'http://10.238.82.85:4040/api/v1/applications/app-20210111171856-0890/stages';

axios.get(sparkEndPoint).then(res=>{
    res.data.forEach(stg=>{
        if(stg.numCompleteTasks === 315 && stg.executorRunTime > 10000){
            axios.get(sparkEndPoint+'/'+stg.stageId+'/0').then(tsk=>{
                var maxTaskTime = 0;
                var minTaskTime = 999999999;
                Object.values(tsk.data.tasks).forEach(taskData=>{
                    if(taskData.duration > maxTaskTime) maxTaskTime = taskData.duration;
                    if(taskData.duration < minTaskTime) minTaskTime = taskData.duration;
                })
                console.log('stageID: ',stg.stageId,' max task time: ',maxTaskTime, 'min task time: ', minTaskTime);
                })
        }
    })
})

