# **Parsly**
### - a parser implemented in Blockly
![](parsley.jpg)

# Hello!
It is our pleasure to inform you that you have been personally picked out to help the rising star of the enterprise world, ***_BusinessCorp Ltd_***, 
in their effort to build and sell a real parser for JSON-like objects.
However, due to temporary technological embarrassment, their toolset has been reduced to a browser of your own choice,  
plus a fork of Google's Blockly project demo 😥

The parser still has to be finished though, as they need it in production as soon as possible.
So grab your trusty mouse, find a place with a lot of space, and get to work.

## Current features
Parsly already supports parsing multiple nice types, such as  
  - Natural numbers (`0`, `1`, `2`, ...)
  - Positive decimals (`1.1`, `3.14`, `1421.171`, ...)
  - Basic ASCII Strings of upper- and lowercase letters from a to z (`"hi how are you"`, `"soup for one"`)
  - The boolean values `true` and `false`

## Features to add
This feature set is of course not nearly enough for a spin-out of ***_BusinessCorp Ltd_***'s stature.
Therefore, you are hereby asked to extend Parsly in the following ways:
  1. Extend the integer parser, so it parses negative integers as well as zero and the positive ones
  2. Extend the decimal parser, so it parses negative decimals just as well as the positive ones  

Furthermore, the director has also asked for the following features:
  3. Parsing typed arrays. A typed array in this context is an array where all its elements have the same type;
  The arrays `[true, true, false]`, and `["hello", "world"]` are valid typed arrays, while `[1, "two", 3.14]` is not.
  4. Parsing simple key-value dictionaries. Although all dictionary keys must be strings, the values within can have any of the types mentioned in this briefing so far.
  Furthermore, the values does not have to have the same types throughout the dictionary. 
  Here is a well-formed dictionary: `{"myInteger": 6969, "myDecimal":  1.23 , "myList": ["hey", "this", "is", "fun"]}`
  
#### Good to know:
* Save often
* You can add comments to your code by right-clicking any block and then select `Add Comment`
* The Blockly blocks are transpiled into JavaScript source code.
This means that the Blockly program is fundamentally JavaScript, and that JavaScript semantics and limitations are in effect.
* If you get in trouble, paste the generated js-code into your browser's console, and try debugging it with your browser's debugger.
* There are a few places wherein Parsly makes use of a global variable; primarily with the variable `mutableString`
* In JavaScript, String, Number and Boolean function parameters are passed by value, while Object and Array are passed by reference.
* Be careful with the variables. Even though you can copy/paste variable blocks with the same variable name back and forth between functions,
they might not be tied to the scopes that you think they are. When in doubt, delete the variable block, right click the function that has the variable you need, and create a fresh one.

Expanding Parsly is not necessarily a simple task. The features you have been asked to build, comes with edge cases and annoying details.
However, it should be solvable by employing and expanding on the techniques that already used in the handout code.
Even if you don't complete it perfectly, we still want to read your submission!
We do not want you to spend much more than four hours on the solution, but it might be beneficial to read the code, and then take a break while you're working out a solution.

### Your work:
* Implement the four features mentioned above.
* Show that your implementation works by adding ample tests, both positive and negative, in the main function.
The code already contains some tests. You can run them by opening your browser's console, and then clicking the red arrow in the top right corner.
* Start by implementing basic cases before you try your hand at recursive cases (such as arrays of arrays of integers, or dictionaries containing dictionaries)

### Getting started
1. Point your browser to the [Blockly Code Demo](index.html)
2. Paste the contents of [parsly-base.xml](parsly-base.xml) into the XML tab of the application
3. To save your progress, copy the generated XML code, then paste and save it in a real file locally

## Handing in your solution
When you have finished your solution, save the generated XML to a file, and send it to Mikkel Storgaard -- preferably by replying to the email ([mikkel.storgaard@leoilab.com](mikkel.storgaard@leoilab.com)) that you received this task in.
If there are any techical issues, this is the email address you should contact as well.

