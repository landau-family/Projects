//פונקצי'ה לאחול רגיל של דרופבוקס על ידי מערך
function populateDropdown(elementId, options) {
    var select = document.getElementById(elementId);
    options.forEach(option => {
        var optionElement = document.createElement("option");
        optionElement.text = option.name;
        select.add(optionElement);
    });
}

//++++++++++++++++++++++++++++++++++++++++++

//כתיבת jobPost:
function writeJobPost(jobPostings, i) {
    let st = "";
    st += "<h4>Posting Date: " + jobPostings[i].dateTime.slice(0, 10) + ", " + jobPostings[i].dateTime.slice(11, 19) + "</h4>";//תאריך
    st += "<h4>Employer: " + jobPostings[i].employer + "</h4>";//תז מעסיק מפרסם
    st += "<p><strong>Area:</strong> <select class='areaDropdown' name='area' disabled>" + populateDropdownOptions(areas, jobPostings[i].area) + "</select></p>";//על ידי פעולה מציג דרופבוקס שהראשון בו האיזור של הפרסום עבודה
    st += "<p><strong>Profession:</strong> <select class='professionDropdown' name='profession' disabled>" + populateDropdownOptions(professions, jobPostings[i].proffession) + "</select></p>";//על ידי פעולה מציג דרופבוקס שהראשון בו המקצוע של הפרסום עבודה
    // Add more fields as needed
    st += "<label for='descriptionInput'>Description: </label>";
    st += "<input type='text' value='" + jobPostings[i].desc + "' class='descriptionInput' name='descriptionInput' id='descriptionInput' disabled></input>";
    st += "<button class='updateBtn' data-index='" + i + "'>Update</button>";//כפתור עדכון
    st += "<button class='finishUpdateBtn' data-index='" + i + "' style='display: none;'>Finish</button>";//כפתור סיום עדכון
    st += "<button class='deleteBtn' data-index='" + i + "'>Delete</button>";
    return st;
}

//++++++++++++++++++++++++++++++++++++++++++++++
//אתחול מערך

function initArray(arr, val, len) {
    for (var i = 0; i < len; i++) {
        arr[i] = val;

    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//פעולה למילוי דרופבוקס ממערך כשיש ערך אותו מעוניינים לשים כערך הנבחר בראש הרשימה
function populateDropdownOptions(options, selectedOption) {
    var optionsHTML = "";
    for (var j = 0; j < options.length; j++) {
        optionsHTML += "<option value='" + options[j].name + "'" + (options[j].name === selectedOption ? "selected" : "") + ">" + options[j].name + "</option>";
    }
    return optionsHTML;
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//פעולה להצגת תיאור פרסום העבודה כתיבת טקסט
function showJobPostingDescInput(i, tav) {

    //בדיקה שהאינדקס בטווח
    if (i >= 0 && i < jobPostings.length) {
        //הכנסה למשתנים
        var desc = jobPostings[i].desc;

        //יצירת תיבת טקסט
        var inputElement = $("<input>", {
            type: "text",
            value: desc,
            class: "descriptionInput",


        });

        // הוספת תיבת הטקסט לפרסום העבודה
        $("#jobPostings .jobPosting:eq(" + i + ")").append(inputElement);

    } else {
        // אינדקס לא תקין
        console.log("Invalid job posting index: " + i);
    }

}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//בדיקת כתובת מייל
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//בדיקת ת"ז
function isValidID(id) {
    if (typeof id !== 'string' || id.length !== 9 || isNaN(id)) {
        return false; // The ID should be a string of 9 digits
    }

    const idDigits = id.split('').map(Number);
    const sum = idDigits.reduce((acc, digit, index) => {
        const weight = index % 2 === 0 ? 1 : 2;
        const weightedDigit = digit * weight;
        return acc + (weightedDigit > 9 ? weightedDigit - 9 : weightedDigit);
    }, 0);

    return sum % 10 === 0;
}

//++++++++++++++++++++++++++++++++++++++++++++++
//הצגת פרסום עבודה לעובד

function writeJobPosttoWorker(jobPostings, i) {
    let st = "";
    st += "<h4>posting date:" + jobPostings[i].dateTime.slice(0, 10) + ", " + jobPostings[i].dateTime.slice(11, 19) + "</h4>";
    st += "<h4>employer: " + jobPostings[i].employer.name + " - " + jobPostings[i].employer.email + "</h4>";
    st += "<p><strong>Area:</strong> " + jobPostings[i].area + "</p>";
    st += "<p><strong>Profession:</strong> " + jobPostings[i].proffession + "</p>";
    return st;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//הצגת תיאור לפרסום עבודה


function showJobPostingDesc(jobPostings, jobPostingsStatus, i) {
    // console.log(i);
    //בדיקה אם הפרסום בטווח
    if (i >= 0 && i < jobPostings.length) {

        //השמה למשתנים
        var desc = jobPostings[i].desc;

        //אם הסטאטוס=סגור
        if (jobPostingsStatus[i] == '0') {

            //הצגת התיאור
            $("#jobPostings .jobPosting:eq(" + i % postingsPerPage + ")").append("<p><strong>Description:</strong> " + desc + "</p>");
            jobPostingsStatus[i] = '1';//עדכון סטאטוס לפתוח
        } else {

            //אם הסטאטוס=פתוח: הצגת הפרסום עבודה ללא התיאור
            let str = "";
            str += writeJobPosttoWorker(jobPostings, i);
            $("#jobPostings .jobPosting:eq(" + i % postingsPerPage + ")").html(str);

            jobPostingsStatus[i] = '0';//עדכון סטאטוס לסגור  
        }
    } else {

        //טיפול באינדקס לא בטווח
        console.log("Invalid job posting index: " + i);
    }

}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
//אתחול צ'קבוקסים
// Function to populate checkboxes
function populateCheckboxes(elementId, options, name) {
    const checkboxContainer = document.getElementById(elementId);
    options.forEach((option, index) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox${index}`;
        checkbox.name = name; // Set the same name for all checkboxes in the group
        checkbox.value = option.name;

        const label = document.createElement("label");
        label.setAttribute("for", `checkbox${index}`);
        label.textContent = option.name;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
//סינון פרסומי עבודה

// Function to filter job postings based on selected criteria
function filterJobPostings() {
    const selectedAreas = Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(checkbox => checkbox.value);
    const selectedProfessions = Array.from(document.querySelectorAll('input[name="pros"]:checked')).map(checkbox => checkbox.value);
    const selectedDate = document.getElementById("filterDate").value;
    const filteredPostings = originalJobPostings.filter(posting => {
        const areaMatch = selectedAreas.length === 0 || selectedAreas.includes("all") || selectedAreas.includes(posting.area);
        const professionMatch = selectedProfessions.length === 0 || selectedProfessions.includes("all") || selectedProfessions.includes(posting.proffession);
        const dateMatch = !selectedDate || Date.parse(posting.dateTime) >= Date.parse(selectedDate);
        return areaMatch && professionMatch && dateMatch;
    });

    // Display or process the filtered job postings as needed
    // console.log(filteredPostings);
    return filteredPostings;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//הצגת תיאור לפרסום עבודה


function showJobPostingDescwithpinpoint(jobPostings, jobPostingsStatus, i) {
    // console.log(i);
    //בדיקה אם הפרסום בטווח
    if (i >= 0 && i < jobPostings.length) {

        //השמה למשתנים
        var desc = jobPostings[i].desc;

        //אם הסטאטוס=סגור
        if (jobPostingsStatus[i] == '0') {

            //הצגת התיאור
            $("#jobPostings .jobPosting:eq(" + i % postingsPerPage + ")").append("<p><strong>Description:</strong> " + desc + "</p>");
            jobPostingsStatus[i] = '1';//עדכון סטאטוס לפתוח
        } else {

            //אם הסטאטוס=פתוח: הצגת הפרסום עבודה ללא התיאור
            let str = "";
            if (IsIn(i)) {
                str += "<i class=' fas fa-map-pin fa-lg '  style='color:red;' onclick='handlePinpointClick(" + i + ",true)'></i>"
            }
            else {
                str += "<i class=' fas fa-map-pin fa-lg ' onclick='handlePinpointClick(" + i + ",false)'></i>"
            }
            str += writeJobPosttoWorker(jobPostings, i);
            $("#jobPostings .jobPosting:eq(" + i % postingsPerPage + ")").html(str);

            jobPostingsStatus[i] = '0';//עדכון סטאטוס לסגור  
        }
    } else {

        //טיפול באינדקס לא בטווח
        console.log("Invalid job posting index: " + i);
    }

}