import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Constants {
  static count = 0;
  static setStartSystem = 4;
  static getSystem = 5;

  static getGreen = 6;
  static getRed = 7;
  static getYellow = 8;

  static setTimeRed = 1;
  static setTimeGreen = 3;
  static setTimeYellow = 5;

  static getTimeRed = 2;
  static getTimeGreen = 4;
  static getTimeYellow = 6;

  static baseUrl = 'http://192.168.1.72:3333';
}
