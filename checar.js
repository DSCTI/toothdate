var user = localStorage.getItem('id');


 // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
        fileEntry.createWriter(gotFileWriter, fail);
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);  
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(6);
                writer.write("");
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };

        writer.write(user);
        
         var id = evt.target.result;
 localStorage.setItem("id", id);
 if (id!=null && id!="") { parent.location=("index2.html"); }
 if (id==null && id=="") { parent.location=("index.html"); }
 
    }

    function fail(error) {
        console.log(error.code);
    }