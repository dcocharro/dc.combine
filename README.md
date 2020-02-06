# dc.combine
Javascript code extending MAX-MSP to compute combinations of numbers.



This javascript code is optimised to be used with the [JS] object in MaxMSP, and allows to generate combinations of numbers as a list of distribution (activations as a binary sequence), or from a user defined list of numbers.
The order of numbers is not important and repetition of numbers are not allowed.

The file 'dc.combine.maxhelp' provides further examples of how to use this JS code. 



This task has been recurrent in different projects, and for that reason I developed a Max abstraction to perform combinations of numbers, but recently I found some limitations when dealing with large numbers, that go beyond 32-bit signed integer (2,147,483,647).



[dc.combine] is the first step in overcoming this task and also debuts my endeavour in the realm of the javascript world. So any comments, any feedback is welcome.