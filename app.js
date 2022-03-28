const ytdl_core = require('ytdl-core');
const fs = require('fs');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
// ytdl_core.getInfo('https://www.youtube.com/watch?v=RLhuPD2ASKE').then((info)=>console.log(info)).catch(()=>console.log('cannot promise'));

// ytdl_core.downloadFromInfo(ytdl_core.getInfo('https://www.youtube.com/watch?v=RLhuPD2ASKE'))

// const url = 'https://www.youtube.com/watch?v=RLhuPD2ASKE';

// ytdl_core(url,{format:'mp4',quality:'highest'}).pipe(fs.createWriteStream('video.mp4'));

app.use(express.urlencoded());

app.use('/static', express.static('static'));


app.get('/', (req, res) => {
    // res.status(200).send('connected to server');
    res.status(200).sendFile(__dirname + '/landpage.html');
})

app.post('/', (req, res) => {
    let videourl = req.body.videoURL;
    // console.log(req.body.videoURL);
    ytdl_core.getInfo(videourl).then((info) => {
        let fname = `${info.player_response.videoDetails.title}.mp4`||`${Date.now()}.mp4`;
        res.header('Content-Disposition', `attachment; filename=${fname}`); 
        console.log(fname + '  ----  successfully delivered');
        /* by content-disposition the content is expected to be displayed inline in the browser, that is, as a Web page or as part of a Web page, or as an attachment, that is downloaded and saved locally
        // -- src mdn web docs
        https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
        */
        // res.sendFile(__dirname+"/result.html");
        ytdl_core(videourl, { quality: 'highest' }).pipe(res);
        console.log(fname + '  ----  successfully delivered');
    }).catch(() => { 
        // res.send("Error Occured can't download, Sorry"); 
        // console.log(err);
        let fname = `${Date.now()}.mp4`;
        res.header('Content-Disposition', `attachment; filename=${fname}`); 
        console.log(fname + '  ----  successfully delivered');
        ytdl_core(videourl, { quality: 'highest' }).pipe(res);
    });
});

app.listen(port, () => console.log(`running at ${port}`));

