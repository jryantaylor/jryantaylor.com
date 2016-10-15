const express = require('express');
const gzipStatic = require('connect-gzip-static');
const app = express();

app.use((req, res, next) => {
	// console.dir(req.headers);
	next();
})

app.use(gzipStatic('./dist'));
app.listen(3000);
