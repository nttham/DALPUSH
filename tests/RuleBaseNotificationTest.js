/**
 * Created by Srividya on 18/07/16.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app.js');
var should = chai.should();
chai.use(chaiHttp);

/**
 * Test Suites
 */
describe('Channels Test Cases', function () {
    // Start the server before the test case with delay of 1second to instantiate the routers
    before(function (done) {
        this.request = chai.request(server);
        setTimeout(function () {
            done();
        }, 1000);
    });

    describe('This api call will create a channel in mongodb', function () {
        it('should be able to create a channel without any problems', function (done) {
            this.timeout(15000);
            this.request.post('/notification')
                .set({
                    "type" : "bulk",
                    "message" : "This is from postman - test1",
                    "templateId" : "1",

                    "settings" : {
                        "apns" : {
                            "payload" : {"sample":"message for APNS"}
                        },
                        "gcm" : {
                            "data" : {"sample":"message for APNS"}
                        },
                        "wns" : {
                            "payload" : {
                                "type": "TileWideText09",
                                "text1": "Hello",
                                "text2": "How are you?"
                            }
                        }
                    }
                })
                .end(function (err, res) {
                    res.should.have.status(202);
                    res.should.have.property('text');
                    done();
                });
        });
    });





});

