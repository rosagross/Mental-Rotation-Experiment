// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]);// You can determine global (random) parameters here

// for the hook time_limit
const task_question = "Are these objects the same or different objects?";

// store timeouts for main trial
const main_timeouts = [];

// 5 pictures that are shown in the trials
const all_images = ["1_50_same.jpg", "1_50_different.jpg", "1_150_same.jpg", "1_150_different.jpg", 
                    "2_50_same.jpg", "2_50_different.jpg", "2_150_same.jpg", "2_150_different.jpg", 
                    "3_50_same.jpg", "3_50_different.jpg", "3_150_same.jpg", "3_150_different.jpg", 
                    "4_50_same.jpg", "4_50_different.jpg", "4_150_same.jpg", "4_150_different.jpg", 
                    "5_50_same.jpg", "5_50_different.jpg", "5_150_same.jpg", "5_150_different.jpg", 
                    "6_50_same.jpg", "6_50_different.jpg", "6_150_same.jpg", "6_150_different.jpg", 
                    "7_50_same.jpg", "7_50_different.jpg", "7_150_same.jpg", "7_150_different.jpg", 
                    "8_50_same.jpg", "8_50_different.jpg", "8_150_same.jpg", "8_150_different.jpg", 
                    "9_50_same.jpg", "9_50_different.jpg", "9_150_same.jpg", "9_150_different.jpg", 
                    "10_50_same.jpg", "10_50_different.jpg", "10_150_same.jpg", "10_150_different.jpg", 
                    "11_50_same.jpg", "11_50_different.jpg", "11_150_same.jpg", "11_150_different.jpg", 
                    "12_50_same.jpg", "12_50_different.jpg", "12_150_same.jpg", "12_150_different.jpg", 
                    "13_50_same.jpg", "13_50_different.jpg", "13_150_same.jpg", "13_150_different.jpg", 
                    "14_50_same.jpg", "14_50_different.jpg", "14_150_same.jpg", "14_150_different.jpg", 
                    "15_50_same.jpg", "15_50_different.jpg", "15_150_same.jpg", "15_150_different.jpg", 
                    ];



/* Helper functions
*
*
*/


/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};

// This function extracts the number of the picture, the rotation degree and the condition 
// out of the picture name and saves it in an array
// return: array with extracted information
const extract_info = function(picturename) {
    var separated = picturename.split("_");
    return separated;
};

// this funciton tells us from the name of the picture if the expected solution is 
// different or same
const expected_solution = function(name) {
    if (name.includes("different")){
        return "different";
	}
    if (name.includes("same")) {
        return "same";
	}
    else{
        console.log("Extracting solution failed!");
	}
}

const key_press_trialinfos = all_images.map(extract_info);


// Helper function that fills our trial dictionary information with information
// corresponding to the images. The images can be selected (depending on practice or actual trial) with "from" and "to"
// that indicate the position of the image in the folder "mental-rot-pictures". This is useful to choose trial and practice images!
// The limiting variable "to" is exclusive.
const fill_trials = function(from, to){
    var trial_fill = [];
    if(to > all_images.length){
    throw "There are only 12 images in the folder! You try to acces images that are not there..";
	}

    for (var i = from; i < to; i++) {
        var dict = {
            question: task_question,
            picture: "mental-rot-pictures/" + all_images[i],
            key1: 'f',
            key2: 'j',
            f: 'same',
            j: 'different',
            nr_of_picture : key_press_trialinfos[i][0],
            expected: expected_solution(all_images[i]),
            rotation: key_press_trialinfos[i][1]
		}

        trial_fill.push(dict);
    }
    return trial_fill;
}

// Feedback helper function
const feedback_info = function(){
    console.log("Schneller bitte!");
}

/* Hooks  
*
*
*/

// Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    }

    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    const t = setTimeout(function(){
        
        $(".magpie-view-stimulus").addClass("magpie-invisible");
        $("#feedback").text("Please respond faster!");

    }, 7500);
    window.timeout.push(t);
    next();    
};

const time_limit_main = function(data, next) {

    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    const ti = setTimeout(function(){
        
        $(".magpie-view-stimulus").addClass("magpie-invisible");
        $("#feedback").text("Please respond faster!");

    }, 7500);
    main_timeouts.push(ti);
    next();    
};


const time_limit_feedback = function(data, next) {
    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    const t = setTimeout(function(){
        $(".magpie-view-stimulus").addClass("magpie-invisible");
        $("#feedback").text("Please resond more quickly!");
    }, 5000);

    window.timeout.push(t);
    setTimeout(next, 800);
};

// compares the chosen answer to the value of `option1`
check_response = function(data, next) {
    if(data.correctness === "correct"){
        $(".magpie-view-stimulus").addClass("magpie-invisible");
        $('#feedback').text('Correct!');
	}else if(data.correctness === "incorrect"){
        $(".magpie-view-stimulus").addClass("magpie-invisible");
        $('#feedback').text('Incorrect!');
	}
};

// Declare your hooks here


/* Generators for custom view templates, answer container elements and enable response functions
*
*
*/
