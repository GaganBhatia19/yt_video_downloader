const ytdl_core = require('ytdl-core');
const fs = require('fs');
const express = require('express');
const port = process.env.PORT||3000;
const app = express();
// ytdl_core.getInfo('https://www.youtube.com/watch?v=RLhuPD2ASKE').then((info)=>console.log(info)).catch(()=>console.log('cannot promise'));

// ytdl_core.downloadFromInfo(ytdl_core.getInfo('https://www.youtube.com/watch?v=RLhuPD2ASKE'))

// const url = 'https://www.youtube.com/watch?v=RLhuPD2ASKE';

// ytdl_core(url,{format:'mp4',quality:'highest'}).pipe(fs.createWriteStream('video.mp4'));

app.use(express.urlencoded());

app.use('/static',express.static('static'));


app.get('/',(req,res)=>{
    // res.status(200).send('connected to server');
    res.status(200).sendFile(__dirname+'/landpage.html');
})

app.post('/',(req,res)=>{
    let vdourl = req.body.videoURL;
    // console.log(req.body.videoURL);
    let fname = `${Date.now()}.mp4`;
    res.header('Content-Disposition',`attachment; filename=${fname}`);
    // res.sendFile(__dirname+"/result.html");
    ytdl_core(vdourl,{quality:'highest'}).pipe(res);
})

app.listen(port,()=>console.log(`running at ${port}`));

