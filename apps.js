const http=require("http");
const server=http.createServer((req,res)=>{
const url=req.url;
console.log(url);
if(url==="/home"){
res.write("welcome home")
res.write("<html>")
res.write("<head><title> my page</title></head>")
res.write("<body><h1>this is my first page i.e HOME</h1></body>")
res.write ("</html>")

}
else if (url==="/about"){
res.write("welcome to about us page")
}
else if(url==="/node")
{
res.write(" Welcome to my Node Js project")
}


 res.end();
process.exit()
})
server.listen(8004);
