# dc.combine
Javascript code extending MAX-MSP to compute combinations of numbers.



This javascript code is optimised to be used with the [JS] object in MaxMSP, and allows to generate combinations of numbers as a list of distribution (activations as a binary sequence), or from a user defined list of numbers.
The order of numbers is not important (<u>doesn't compute permutations</u>) and repetition is not considered.

The file 'dc.combine.maxhelp' provides further examples of how to use this JS external. 



This task has been recurrent in different projects, and for that reason I developed a Max abstraction to perform combinations of numbers, but recently I found some limitations when dealing with large numbers.



[dc.combine] is the first step in overcoming this task and also debuts my endeavour in the realm of the javascript world. So any comments, any feedback is welcome.



## Requirements:

Mac OSX or Windows

MaxMSP 8 (tested), MaxMSP <8 (not tested)