var user = localStorage.getItem('id');

var myFS = 0;
var myFileEntry = 0;
function failFS(evt) {
    document.getElementById('file-system-text').innerHTML = 
        "<strong>File System Error: " + evt.target.error.code + "</strong>";  
}
function writeFail(error) {
    document.getElementById('file-status').innerHTML = 
        "Create/Write <strong>Error: " + error.code + "</strong>";   
}

// api-file  Create
function createGotNewFile(file){
    document.getElementById('file-status').innerHTML = 
        "Created: <strong>" + file.fullPath + "</strong>";
    document.getElementById('file-read-text').innerHTML = '';  
    document.getElementById('file-read-dataurl').innerHTML = '';
}
function createGotFileEntry(fileEntry) {
    myFileEntry = fileEntry;
    fileEntry.file(createGotNewFile, writeFail);
}
function gotFS(fileSystem) {
    myFS = fileSystem;
    document.getElementById('file-system-text').innerHTML =
        "File System: <strong>" + fileSystem.name + "</strong> " +
           "Root: <strong>" + fileSystem.root.name + "</strong>";
    fileSystem.root.getFile("id.txt", {create: true, exclusive: false}, createGotFileEntry, writeFail);
}
function createFile() { // button onclick function
    if (myFS) {
        gotFS(myFS);
    } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);
    }
}

//api-file  FileWriter
function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        document.getElementById('file-contents').innerHTML = user";
        writer.truncate(11);  
        writer.onwriteend = function(evt) {
            document.getElementById('file-contents').innerHTML = user;
            writer.seek(4);
            writer.write(user);
            writer.onwriteend = function(evt){
                document.getElementById('file-contents').innerHTML = user;
            };
        };
    };
    writer.write(user);
}
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, writeFail);
}
function writeFile() { // button onclick function
    if (myFileEntry) {
        gotFileEntry(myFileEntry);        
    } else {
        document.getElementById('file-status').innerHTML ="Status: <strong>Error: File Not Created!</strong>";
    }
}

// api-file  FileReader
function readFail(error) {
    document.getElementById('file-read-text').innerHTML ="<strong>Read Error: " + error.code + "</strong>";
    document.getElementById('file-read-dataurl').innerHTML = '';
}
function readerreadDataUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        document.getElementById('file-read-dataurl').innerHTML =
            "<strong>" + evt.target.result.slice(0, 38) + "...</strong>";
    };
    reader.readAsDataURL(file);
}
function readerreadAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        document.getElementById('file-read-text').innerHTML = "<strong>" + evt.target.result + "</strong>";
    };
    reader.readAsText(file);
}
function readerGotFile(file){
    readerreadDataUrl(file);
    readerreadAsText(file);
}
function readerGotFileEntry(fileEntry) {
    fileEntry.file(readerGotFile, readFail);
}
function readFile() { // button onclick function
    if (myFileEntry) {
        readerGotFileEntry(myFileEntry);        
    } else {
        document.getElementById('file-status').innerHTML = "Status: <strong>Error: File Not Created!</strong>";
        return false;
    }    
}

// api-file  Remove File
function removeSuccess(entry) {
    document.getElementById('file-status').innerHTML = "Removed"; 
    document.getElementById('file-contents').innerHTML = "<br/>Contents:";
    document.getElementById('file-read-dataurl').innerHTML = '';  
    document.getElementById('file-read-text').innerHTML = '';
}
function removeFail(error) {
    document.getElementById('file-status').innerHTML = "Status: <strong>Remove Error: " + error.code + "</strong>";       
}
function removeFileEntry(fileEntry) {
    fileEntry.remove(removeSuccess, removeFail);
}
function removeFile() { // button onclick function
    if (myFileEntry) {
        removeFileEntry(myFileEntry);        
    } else {
        document.getElementById('file-status').innerHTML = "Status: <strong>Error: File Not Created!</strong>";
    }    
}

 document.getElementById('file-status').innerHTML = evt.target.result;

