'use strict';
const request = require('request');
const nlp = require('compromise');

const StoryCalculatorService = require('services/storyCalculateService.js');

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

class storyService {
    
    saveStories(stories) {

        console.log('START LOGGIN DB CONNECTIONS!');

        const data = JSON.parse(stories);
      
        for(var index in data) {

            console.log(data);

            var storyName = data[index];

            // console.log('data score');
            // console.log(storyName.score);

            console.log('DEBUG STORY NAME');
            console.log(storyName);
          
            const params = {
              TableName: process.env.DYNAMODB_TABLE,
              Item: {
                id: uuid.v1(),
                story: storyName.story,
                score: StoryCalculatorService.calculateScore(storyName.story).score,
              },
            };

            dynamoDb.put(params, (error) => {});
        }
    }    
}


module.exports = new storyService();