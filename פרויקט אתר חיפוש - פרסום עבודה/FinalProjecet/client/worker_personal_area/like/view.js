
//משתנים גלובאליים
var jobPostings;//פרסומי עבודה
var originalJobPostings;
var jobPostingsStatus = [];//סטאטוס פרסומי עבודה: 1=פתוח, 0=סגור
var areas;
var user;
var employers = [];
var proffessions;
var currentPage = 1;
const postingsPerPage = 9;
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
        //אתחול פרסומי העבודה
        jobPostings = response.worker.like;
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
                employers[count] = jobPostings[count].employer;
                //הוספת הפרסום עבודה הנוכחי לדף
                jobPostings[count]["employer"] = employer;
                let len = jobPostings.length;
                if (postingsPerPage < jobPostings.length) {
                    len = postingsPerPage;
                }
                if (count < len) {
                    jobPostingsHTML += "<div class='jobPosting' onclick='showDesc( " + count + ")'>";
                    jobPostingsHTML += "<i class='fas fa-times close-icon' onclick='handleClick(" + count + ")'></i>"
                    jobPostingsHTML += writeJobPosttoWorker(jobPostings, count);
                    jobPostingsHTML += "</div>";
                }

                count++;

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
        console.log(employers);
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
    // console.log(startIndex);
    // console.log(endIndex);

    // const jobPostingsDiv = document.getElementById("jobPostings");
    // jobPostingsDiv.innerHTML = "";
    $("#jobPostings").html("");
    var jobPostingsHTML = "";
    let count = startIndex;
    for (var i = startIndex; i < endIndex; i++) {



        //הוספת הפרסום עבודה הנוכחי לדף


        jobPostingsHTML += "<div class='jobPosting' onclick='showDesc(" + i + ")'>";
        jobPostingsHTML += "<i class='fas fa-times close-icon' onclick='handleClick(" + i + ")'></i>"

        jobPostingsHTML += writeJobPosttoWorker(jobPostings, i);
        jobPostingsHTML += "</div>";


        // console.log(jobPostingsHTML);

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
    // console.log(currentPage);
});

$("#nextPage").click(function () {
    const totalPages = Math.ceil(jobPostings.length / postingsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayJobPostings();
    }
    // console.log(totalPages);

});



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//שליחה לפעולה להצגת תאור

function showDesc(i) {
    showJobPostingDesc(jobPostings, jobPostingsStatus, i);
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//לחיצה על כפתור סינון


$("#applyFilterBtn").click(function () {
    $.ajax(getSetting({}, "GET", "worker")).done(function (response) {
        jobPostings = response.worker.like;
        originalJobPostings = jobPostings;
        var jobPostingsHTML = "";
        // console.log("hello");
        jobPostings = filterJobPostings();
        let count = 0;
        for (let i = 0; i < jobPostings.length; i++) {

            $.ajax(getSetting({}, "GET", "employer/" + jobPostings[i].employer)).done(function (response) {
                var employer = response.employer;
                // console.log(employer);
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
//לחיצה על מחיקת פרסום עבודה

function handleClick(index) {
    console.log(employers);
    let arr = [];
    console.log(jobPostings)
    console.log(employers)


    console.log(user.like)
    let count = 0;
    for (let k = 0; k < user.like.length; k++, count++) {
        console.log(user.like[count]);
        if (user.like[count].dateTime == jobPostings[index].dateTime && user.like[count].employer.id == employers[index]) {
            user.like.splice(count, 1);
            count--;
            console.log(k)

            if (count < 0) {
                continue;
            }
            // arr[count]["employer"]=arr[count]["employer"].id;
            // count++;
            //  console.log(user.like[k]);
            //  console.log(user.like[k].dateTime!=jobPostings[index].dateTime||user.like[k].employer!=employers[index]);
        }
        else {
            user.like[count].employer = employers[k];
        }
        console.log(user.like[count]);
        // 
    }
    //user.like = user.like.filter(obj=>obj.dateTime!=jobPostings[index].dateTime&&obj.employer!=employers[index]);
    // console.log(arr);
    // user.like=arr;
    console.log(user.like);
    // jobPostings=jobPostings.filter(obj=>obj.dateTime!=jobPostings[index].dateTime&&obj.employer!=employers[index]);
    // originalJobPostings=jobPostings;
    $.ajax(getSetting(user, "PUT", "worker")).done(function (response) {
        // console.log(response);
        console.log(response.like);
        jobPostings = response.like;
        employers = [];
        let c = 0;
        for (let i = 0; i < jobPostings.length; i++) {
            $.ajax(getSetting({}, "GET", "employer/" + jobPostings[c].employer)).done(function (response) {
                let emp = response.employer;
                console.log(emp)
                jobPostings[c].employer = emp;
                employers[c] = emp.id;
                c++;
                if (c == jobPostings.length) {
                    originalJobPostings = jobPostings;
                    displayJobPostings();
                }
            });
        }



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
    if (jobPostings.length == 0) {
        displayJobPostings();
    }
}