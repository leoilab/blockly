/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview List blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Constants.Dicts');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['LISTS_HUE']. (2018 April 5)
 */
Blockly.Constants.Dicts.HUE = 260;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for creating an empty list
  // The 'list_create_with' block is preferred as it is more flexible.
  // <block type="lists_create_with">
  //   <mutation items="0"></mutation>
  // </block>
  {
    "type": "dicts_create_empty",
    "message0": "create empty dictionary",
    "output": "dict",
    "style": "dict_blocks",
      "tooltip": "",
      "helpUrl": "",
      "inputsInline": false,
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['dicts_create_with'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setHelpUrl("");
    this.setStyle('dict_blocks');
    this.itemCount_ = 3;

    this.appendDummyInput('NOTEMPTY')
        .appendField("create dictionary with")
        .setAlign(Blockly.ALIGN_RIGHT);

    this.updateShape_();
    this.setOutput(true, 'dict');
    this.setMutator(new Blockly.Mutator(['dicts_create_with_item']));
    this.setTooltip("");
    this.setInputsInline(false);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('dicts_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('dicts_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');

    // Count number of inputs.
    var connections = [];
    var keyConnections = [];
    var valueConnections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }

    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('KEY' + i).connection.targetConnection;
      if (connection && keyConnections.indexOf(connection) == -1) {
        connection.disconnect();
      }
      connection = this.getInput('VALUE' + i).connection.targetConnection;
      if (connection && valueConnections.indexOf(connection) == -1) {
          connection.disconnect();
      }

    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'KEY' + i);
      Blockly.Mutator.reconnect(valueConnections[i], this, 'VALUE' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var inputA = this.getInput('KEY' + i);
      var inputB = this.getInput('VALUE' + i);
        itemBlock.valueConnection_ =
            ((inputA && inputA.connection.targetConnection) ||
        (inputB && inputB.connection.targetConnection)) ;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
        this.removeInput('EMPTY');
        this.appendDummyInput('NOTEMPTY')
            .appendField("create dictionary with")
            .setAlign(Blockly.ALIGN_RIGHT);

    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.removeInput('NOTEMPTY');
      this.appendDummyInput('EMPTY')
            .appendField("create empty dictionary");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('KEY' + i)) {
        var key = this.appendValueInput('KEY' + i)
            .setCheck(["String", "Number"])
            .appendField("key")
            .setAlign(Blockly.ALIGN_RIGHT);

        var value = this.appendValueInput('VALUE' + i)
              .appendField("value")
              .setAlign(Blockly.ALIGN_RIGHT);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('KEY' + i)) {
      this.removeInput('KEY' + i);
        this.removeInput('VALUE' + i);
      i++;
    }
  }
};

Blockly.Blocks['dicts_create_with_container'] = {
  /**
   * Mutator block for dict container.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setStyle('dict_blocks');
    this.appendDummyInput()
          .appendField("key/value pairs");
    this.appendStatementInput('STACK');
      this.setTooltip("key/value pairs");
    this.contextMenu = false;
  }
};

Blockly.Blocks['dicts_create_with_item'] = {
  /**
   * Mutator block for adding items.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setStyle('dict_blocks');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
      this.jsonInit({
          "message0": "key %1 value %2" ,
          "args0": [
              {"type": "input_dummy", "align": "RIGHT"},
              {"type": "input_dummy", "align": "RIGHT"}
          ]
      });
  }
};


Blockly.Blocks['dicts_get'] = {
    init: function() {
        this.setOutput(true, null);
        this.setStyle("dict_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
        this.jsonInit({
            "message0": "get value by key %1 in dictionary %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "key",
                    "check": ["String",
                              "Number"]
                },
                {
                    "type": "input_value",
                    "name": "dict",
                    "check": "dict"
                }
            ],
            "inputsInline": false
        });
    }
};

Blockly.Blocks['dicts_set'] = {
    init: function() {
        this.setTooltip("");
        this.setStyle('dict_blocks');
        this.setHelpUrl("");
        this.setInputsInline(false);
        this.jsonInit({
            "message0": "set key %1 to value %2 in dictionary %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "key",
                    "check": ["String",
                              "Number"]
                },
                {
                    "type": "input_value",
                    "name": "value",
                },
                {
                    "type": "input_value",
                    "name": "dict",
                    "check": "dict"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": false
        });
    }
};



Blockly.Blocks['dicts_contains'] = {
    init: function() {
        this.setOutput(true, "Boolean");
        this.setStyle('dict_blocks');
        this.setTooltip("");
        this.setHelpUrl("");
        this.jsonInit({
            "message0": "dictionary %1 has key %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "dict",
                    "check": "dict"
                },
                {
                    "type": "input_value",
                    "name": "key",
                    "check": ["String",
                              "Number"]
                }
            ],
            "inputsInline": false
        });
    }
};
