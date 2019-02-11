var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/query', (req, res)=>{
//   res.sendFile('qa/basic.html', { root: '.' })
// })

router.get('/delete', (req, res)=>{
  res.send('Received your delete action')
})

router.post('/upload', (req, res) => {

  const file = req.files['files[]'];

  if (Object.keys(file).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // Use the mv() method to place the file somewhere on your server
  console.log(file);

  const fileName = fileNameGenerater(file.name);
  const fileType = file.mimetype.includes('image')? 'img' : 'mov'; 
  if(fileType === 'img') {
      file.mv(`./public/medias/images/${fileName}`, function(err) {
        if (err)
          return res.status(500).send(err);

        const resData = {type: fileType, url: `${req.headers.host}/medias/images/${fileName}`}
        
        res.send(resData);
      });
  } else {
    file.mv(`./public/medias/videos/${fileName}`, function(err) {
        if (err)
          return res.status(500).send(err);

          const resData = {type: fileType, url: `${req.headers.host}/medias/videos/${fileName}`}
        res.send(resData);
      });
  }
});

const fileNameGenerater = (oldName) => {
    const ext = oldName.split('.')[1];
    let name = Math.random().toString(36).substring(7);
    return name+'.'+ext;
}
module.exports = router;
