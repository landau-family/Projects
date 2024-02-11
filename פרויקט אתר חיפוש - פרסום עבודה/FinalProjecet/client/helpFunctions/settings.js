function getSetting(data,protocol,collection)
{
    var settings = {
        "url": "http://localhost:3000/"+collection,
        "method": protocol,
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
      };
    return settings;
}



