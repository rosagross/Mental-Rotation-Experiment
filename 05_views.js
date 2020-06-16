// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `   <br />
            Welcome to our mental rotation experiment. 
            <br />
            Thanks for taking part!
            <br />
            <br />
            `,
  buttonText: 'begin the experiment'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'General Instructions',
  text: `   <br />
            <br />
            In the following trials you will see an image on your screen that shows two objects.
            <br />
            For <strong>example</strong> it could look like this:
            <br />
            <img src="mental-rot-pictures/1_50_different.jpg" alt="Mental rotation example" widht="300" height="200">
            <br />
            Your task is to decide if these two object are the <strong>same</strong> or <strong>different</strong> objects.
            To indicate that the objects are the same, you will press the key <strong>"F"</strong> and to indicate that the objects are different from each other you will have to press the key <strong>"J"</strong>.
            <br />
            Try to react as accurate and as fast as possible!
            <br />
            <br />
            Before we start with the actual experiment you will have some time to practice!
            `,
  buttonText: 'Start practicing'
});

// Again some hints after the practice trial
const after_practice = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'after_practice',
  title: 'Practice done',
  text: `   <br />
            <br />
            Youre done with the practice session!
            <br />
            <br />
            <strong>Quick recap:</strong>
            <br />
            Your task is to decide if these two object are the <strong>same</strong> or <strong>different</strong> objects.
            To indicate that the objects are the same, you will press the key <strong>"F"</strong> and to indicate that the objects are different from each other you will have to press the key <strong>"J"</strong>.
            <br />
            <br />
            Let us rock the experiment now!
            `,
  buttonText: 'begin experiment'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/


/* Here, we initialize a normal forced_choice view
const forced_choice_2A = magpieViews.view_generator("forced_choice", {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: trial_info.forced_choice.length,
  // name should be identical to the variable name
  name: 'forced_choice_2A',
  data: trial_info.forced_choice,
  // you can add custom functions at different stages through a view's life cycle
  // hook: {
  //     after_response_enabled: check_response
  // }
});
*/

// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale




const key_press_trials = magpieViews.view_generator('key_press', {
    
        trials: trial_info.key_press.length,
        // name should be identical to the variable name
        name: 'key_press_trials',
        data:  _.shuffle(trial_info.key_press),
        pause: 250,
        hook: {
            after_response_enabled: time_limit_main
		}
    },
    {
        stimulus_container_generator: function(config, CT) {
        return `<div class="magpie-view">
                    <h1 class='magpie-view-title'>${config.title}</h1>
                    <p class='magpie-response-keypress-header'>
                    <strong>${config.data[CT].key1}</strong> = ${config.data[CT][config.data[CT].key1]},
                    <strong>${config.data[CT].key2}</strong> = ${config.data[CT][config.data[CT].key2]}</p>
                    <p class='magpie-response-keypress-header' id='feedback'>
                    <div class='magpie-view-stimulus-container'>
                        <div class='magpie-view-stimulus magpie-nodisplay'></div>
                    </div>
                </div>`;
        },
        handle_response_function: function (config, CT, magpie, answer_container_generator, startingTime) {

        $(".magpie-view").append(answer_container_generator(config, CT));

        const attention_running = setTimeout(function(){
            let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    key_pressed: "nothing pressed",
                    correctness: "nothing pressed",
                    RT: 0
            };

            trial_data[config.data[CT].key1] =
                config.data[CT][config.data[CT].key1];
            trial_data[config.data[CT].key2] =
                config.data[CT][config.data[CT].key2];

            trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

            magpie.trial_data.push(trial_data);
            $("body").off("keydown", handleKeyPress);
                
            magpie.findNextView();
        }, 9000);

        const handleKeyPress = function(e) {
            const keyPressed = String.fromCharCode(
                e.which
            ).toLowerCase();

            clearTimeout(main_timeouts[CT]);
            clearTimeout(attention_running);
            

            if (keyPressed === config.data[CT].key1 || keyPressed === config.data[CT].key2) {
                let correctness;
                const RT = Date.now() - startingTime; // measure RT before anything else
                
                if (
                    config.data[CT].expected ===
                    config.data[CT][keyPressed.toLowerCase()]
                ) {
                    correctness = "correct";
                } else {
                    correctness = "incorrect";
                }

                let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    key_pressed: keyPressed,
                    correctness: correctness,
                    RT: RT
                };

                trial_data[config.data[CT].key1] =
                    config.data[CT][config.data[CT].key1];
                trial_data[config.data[CT].key2] =
                    config.data[CT][config.data[CT].key2];

                trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

                magpie.trial_data.push(trial_data);
                $("body").off("keydown", handleKeyPress);
                
                magpie.findNextView();
            }
        };
        $("body").on("keydown", handleKeyPress);
    }
    }
);




// Customized view template key_press
// Modified handle_response_function in order to give feedback about correctness
// Hook added to give feedback if the participant was too slow
const practice_trials = magpieViews.view_generator('key_press', {
    
        trials: practice_info.practice_key_press.length,
        // name should be identical to the variable name
        name: 'practice_trials',
        data: practice_info.practice_key_press,
        hook: {
            after_response_enabled: time_limit
		},
        pause: 250
    },
    {
        stimulus_container_generator: function(config, CT) {
        return `<div class="magpie-view">
                    <h1 class='magpie-view-title'>${config.title}</h1>
                    <p class='magpie-response-keypress-header'>
                    <strong>${config.data[CT].key1}</strong> = ${config.data[CT][config.data[CT].key1]},
                    <strong>${config.data[CT].key2}</strong> = ${config.data[CT][config.data[CT].key2]}</p>
                    <p class='magpie-response-keypress-header' id='feedback'>
                    <div class='magpie-view-stimulus-container' id='stimulus'>
                        <div class='magpie-view-stimulus magpie-nodisplay'></div>
                    </div>
                </div>`;
        },

        handle_response_function: function (config, CT, magpie, answer_container_generator, startingTime) {

        $(".magpie-view").append(answer_container_generator(config, CT));

        const attention_running_practice = setTimeout(function(){
            let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    key_pressed: "nothing pressed",
                    correctness: "nothing pressed",
                    RT: 0
            };

            trial_data[config.data[CT].key1] =
                config.data[CT][config.data[CT].key1];
            trial_data[config.data[CT].key2] =
                config.data[CT][config.data[CT].key2];

            trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

            magpie.trial_data.push(trial_data);
            $("body").off("keydown", handleKeyPress);
                
            magpie.findNextView();
        }, 9000);

        const handleKeyPress = function(e) {
            const keyPressed = String.fromCharCode(
                e.which
            ).toLowerCase();
            
            clearTimeout(window.timeout[CT]);
            clearTimeout(attention_running_practice);

            if (keyPressed === config.data[CT].key1 || keyPressed === config.data[CT].key2) {

                let correctness;
                const RT = Date.now() - startingTime; // measure RT before anything else
                
                if (
                    config.data[CT].expected ===
                    config.data[CT][keyPressed.toLowerCase()]
                ) {
                    correctness = "correct";
                    $(".magpie-view-stimulus").addClass("magpie-invisible");
                    $('#feedback').text('Correct answer!');
                } else {
                    correctness = "incorrect";
                    $(".magpie-view-stimulus").addClass("magpie-invisible");
                    $('#feedback').text('Incorrect answer!');
                }

                let trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    key_pressed: keyPressed,
                    correctness: correctness,
                    RT: RT
                };

                trial_data[config.data[CT].key1] =
                    config.data[CT][config.data[CT].key1];
                trial_data[config.data[CT].key2] =
                    config.data[CT][config.data[CT].key2];

                trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

                magpie.trial_data.push(trial_data);
                $("body").off("keydown", handleKeyPress);
                
                setTimeout(magpie.findNextView, 800);

            }
        };
        $("body").on("keydown", handleKeyPress);
    }
    }
);

