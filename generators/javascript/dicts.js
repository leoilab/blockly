/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.dicts');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['dicts_create_empty'] = function(block) {
    // Create an empty list.
    return ['{}', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dicts_create_with'] = function(block) {
    // Create a list with any number of elements of any type.
    var keys = new Array(block.itemCount_);
    var values = new Array(block.itemCount_);
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        var key = Blockly.JavaScript.valueToCode(block, 'KEY' + i,
                                                 Blockly.JavaScript.ORDER_COMMA) || 'null';
        var value = Blockly.JavaScript.valueToCode(block, 'VALUE' + i,
                                                   Blockly.JavaScript.ORDER_COMMA) || 'null';
        elements[i] = key + ":" + value;
    }
    var code = '{' + elements.join(', ') + '}';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dicts_get'] = function(block) {
    var value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
    var value_dict = Blockly.JavaScript.valueToCode(block, 'dict', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_dict+"['"+value_key+"']";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['dicts_set'] = function(block) {
    var value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var value_dict = Blockly.JavaScript.valueToCode(block, 'dict', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_dict+"['"+value_key+"'] = "+value_value;
    return code;
};
Blockly.JavaScript['dicts_contains'] = function(block) {
    var value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
    var value_dict = Blockly.JavaScript.valueToCode(block, 'dict', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = value_dict+".hasOwnProperty("+value_key+")";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
