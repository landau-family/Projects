
//משתנים גלובאליים
var jobPostings;//פרסומי עבודה
var originalJobPostings;
var jobPostingsStatus = [];//סטאטוס פרסומי עבודה: 1=פתוח, 0=סגור
var areas;
var proffessions;
var currentPage = 1;
const postingsPerPage = 9;
var user;
var employers = [];
document.addEventListener('DOMContentLoaded', () => {
    const imageUrl = 'http://localhost:3000/images/back.jpg'; // Replace with your actual image URL
    const imageElement = document.getElementById('bannerImage'); // Assuming you have an <img> element with id 'homepageImage'

    fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const objectURL = URL.createObjectURL(blob);
            imageElement.src = objectURL;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    $.ajax(getSetting({}, "GET", "worker")).done(function (response) {
        user = response.worker;
        console.log(user);
    });

    $.ajax(getSetting({}, "GET", "jobPosting")).done(function (response) {


        //אתחול פרסומי העבודה
        jobPostings = response;
        originalJobPostings = jobPostings;
        console.log(jobPostings);
        //אתחול סטאטוס פרסומי עבודה
        initArray(jobPostingsStatus, '0', jobPostings.length);

        //הצגת פרסומי העבודה לדף
        var jobPostingsHTML = "";
        let count = 0;
        for (var i = 0; i < jobPostings.length; i++) {

            //שאילתה לקבלת המעסיק עבור כל פרסום עבודה
            $.ajax(getSetting({}, "GET", "employer/" + jobPostings[i].employer)).done(function (response) {
                var employer = response.employer;
                employers[count] = employer.id;
                //הוספת הפרסום עבודה הנוכחי לדף
                jobPostings[count]["employer"] = employer;
                let len = jobPostings.length;
                if (postingsPerPage < jobPostings.length) {
                    len = postingsPerPage;
                }
                if (count < len) {
                    jobPostingsHTML += "<div class='jobPosting' onclick='showDesc(" + count + ")'>";
                    if (IsIn(count)) {
                        jobPostingsHTML += "<i class=' fas fa-map-pin fa-lg ' style='color:red;'  onclick='handlePinpointClick(" + i + ",true)'></i>"
                    }
                    else {
                        jobPostingsHTML += "<i class=' fas fa-map-pin fa-lg '  onclick='handlePinpointClick(" + count + ",false)'></i>"

                    }
                    jobPostingsHTML += writeJobPosttoWorker(jobPostings, count);
                    jobPostingsHTML += "</div>";
                }

                count++;
                // console.log(jobPostingsHTML);
                //הוספה לדף
                $("#jobPostings").append(jobPostingsHTML);
                jobPostingsHTML = "";
            }).fail(function (jqXHR, textStatus, errorThrown) {

                // בעת שגיאה הדפסת ההודעה המתאימה
                console.log(jqXHR.responseText);
            });
        }
        originalJobPostings = jobPostings;
        console.log(jobPostings);
    });

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //מילוי שדות הפלטור

    //הכנסת אזורים
    $.ajax(getSetting({}, "GET", "area")).done(function (response) {
        areas = JSON.parse(response)//הכנסת האיזורים למערך
        populateCheckboxes('areas', areas, "areas");
    });

    //הכנסת מקצועות
    $.ajax(getSetting({}, "GET", "proffessions")).done(function (res) {
        proffessions = res//הכנסה למערך מקצועות
        populateCheckboxes('pros', proffessions, "pros");


    });
});
// Assuming you have an array of job postings called jobPostings

// Variables for pagination


function displayJobPostings() {

    console.log("in display");
    const startIndex = (currentPage - 1) * postingsPerPage;
    let endIndex = startIndex + postingsPerPage;
    if (endIndex > jobPostings.length) {
        endIndex = jobPostings.length;
    }
    const currentPostings = jobPostings.slice(startIndex, endIndex);
    console.log(startIndex);
    console.log(endIndex);

    // const jobPostingsDiv = document.getElementById("jobPostings");
    // jobPostingsDiv.innerHTML = "";
    $("#jobPostings").html("");
    var jobPostingsHTML = "";
    let count = startIndex;
    for (var i = startIndex; i < endIndex; i++) {



        //הוספת הפרסום עבודה הנוכחי לדף
        console.log(jobPostings[i]);
        jobPostingsHTML += "<div class='jobPosting' onclick='showDesc(" + i + ")'>";
        if (IsIn(i) == true) {
            jobPostingsHTML += "<i class=' fas fa-map-pin fa-lg '   style='color:red;' onclick='handlePinpointClick(" + i + ",true)'></i>"
            console.log(i);
        }
        else {
            jobPostingsHTML += "<i class=' fas fa-map-pin fa-lg '  onclick='handlePinpointClick(" + i + ",false)'></i>"

        }
        jobPostingsHTML += writeJobPosttoWorker(jobPostings, i);
        jobPostingsHTML += "</div>";


        //console.log(jobPostingsHTML);

        //הוספה לדף

    }
    $("#jobPostings").html(jobPostingsHTML);
    jobPostingsHTML = "";

    document.getElementById("currentPage").textContent = `Page ${currentPage}`;
}

// Event listeners for pagination buttons
$("#prevPage").click(function () {
    if (currentPage > 1) {
        currentPage--;
        displayJobPostings();
    }
    console.log(currentPage);
});

$("#nextPage").click(function () {
    const totalPages = Math.ceil(jobPostings.length / postingsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayJobPostings();
    }
    console.log(totalPages);

});



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//שליחה לפעולה להצגת תאור

function showDesc(i) {
    showJobPostingDescwithpinpoint(jobPostings, jobPostingsStatus, i);


}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על כפתור סינון


$("#applyFilterBtn").click(function () {
    $.ajax(getSetting({}, "GET", "jobPosting")).done(function (response) {
        jobPostings = response;
        originalJobPostings = jobPostings;
        var jobPostingsHTML = "";
        console.log("hello");
        jobPostings = filterJobPostings();
        let count = 0;
        for (let i = 0; i < jobPostings.length; i++) {

            $.ajax(getSetting({}, "GET", "employer/" + jobPostings[i].employer)).done(function (response) {
                var employer = response.employer;
                console.log(employer);
                //הוספת הפרסום עבודה הנוכחי לדף
                jobPostings[count]["employer"] = employer;
                // if (count < postingsPerPage) {
                //     jobPostingsHTML += "<div class='jobPosting' onclick='showDesc( " + count + ")'>";
                //     jobPostingsHTML += writeJobPosttoWorker(jobPostings, count);
                //     jobPostingsHTML += "</div>";
                //     $("#jobPostings").append(jobPostingsHTML);
                //     jobPostingsHTML = "";
                // }

                count++;
                if (count == jobPostings.length) {
                    displayJobPostings();

                }
                //הוספה לדף

            }).fail(function (jqXHR, textStatus, errorThrown) {

                // בעת שגיאה הדפסת ההודעה המתאימה
                console.log(jqXHR.responseText);
            });

        }
        initArray(jobPostingsStatus, '0', jobPostings.length);
        // $("#jobPostings").html(jobPostingsHTML);

    });
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על תפריט צד



$("#hamburger").click(function () {
    $(this).toggleClass("change");
    $(".sidebar").toggleClass("sidebar-open");
    $("#jobPostings").toggleClass("unexpand");
    $("#updateDetailsSection").toggleClass("unexpand");

});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על סיכה

function handlePinpointClick(index, flag) {
    if (!user.like) {
        // console.log("hello")
        user.like = [];
    }
    // console.log(user["like"]);
    if (flag) {
        console.log("hi!");
        return;
    } else {
        if (!IsIn(index)) {
            user["like"][user.like.length] = jobPostings[index];
            user["like"][user.like.length - 1]["employer"] = user["like"][user.like.length - 1]["employer"].id;

            // Access the job posting from the array using the index
            console.log(user["like"]);
            $.ajax(getSetting(user, "PUT", "worker")).done(function (response) {
                console.log(response);
                console.log("hello");
                console.log(jobPostings[index]);
                user = response;

                displayJobPostings();


            }).fail(function (jqXHR, textStatus, errorThrown) {

                //טיפול בשגיאות
                if (jqXHR.status === 400) {
                    console.log(jqXHR.responseText); // שגיאת מפתח זיהוי
                    alert('You are not a subscriber to the registration site, click register');
                } else {
                    //שגיאה אחרת
                    alert('An error occurred. Please try again later.');
                }
            });
        }
    }
}

function IsIn(index) {
    let flag = false;
    for (let k = 0; k < user.like.length; k++) {
        // console.log(jobPostings[index].dateTime);
        // console.log(user.like[k].dateTime==jobPostings[index].dateTime);

        // console.log(user.like[k].employer==employers[index]);
        // console.log(employers[index]);
        console.log(user.like[k].id == jobPostings[index].id)
        if (user.like[k].id == jobPostings[index].id) {
            return true;
            flag = true;
        }
    }
    return flag;
}