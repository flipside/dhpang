/**
* Copyright (c) 2014-2015 Koninklijke Philips N.V.
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
 * The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
* 
* Philips HTML5 Angular Application
* 	
* The controllers provide the necessary linkage between the DHPService and the front end views.
*/	
	
	/* The login controller retrieves a token via the token function.  The token function calls the login function which then
	   broadcasts a message as to whether or not a user was successful in logging in or not.  If successful then the Patient controller 
	   and the Observations controller will both retrieve data for the patient.													*/
	dhp.controller('LoginController', function ($scope, DHPService) {
  
		$scope.signInShow = true;
		$scope.failedLoginShow = false;
		
		$scope.loginUser = function () {
			DHPService.token($scope.userName, $scope.password);
		};
		$scope.$on('Successful patient', function() {
			$scope.userName = "";
			$scope.password = "";
			$scope.signInShow = false;
		});
		$scope.$on('Successful logout', function() {
			$scope.signInShow = true;
			$scope.failedLoginShow = false;
		});
		$scope.$on('Failed login', function() {
			$scope.failedLoginShow = true;
		});
	});
	
	/* The patient controller retrieves patient demographic data and sets the $scope model for the patient view. */
	dhp.controller('PatientController', function ($scope, DHPService) {
	
		$scope.patientShow = false;
	
		$scope.$on('Successful login', function() {
			DHPService.patient();
		});
		$scope.logoutUser = function () {
			DHPService.logout();
		};
		$scope.$on('Successful patient', function() {
			$scope.patientShow = true;
			$.each( DHPService.getPatientData(), function( key, val ) {
				if (key === "name") {
					var givennames = [];
					var familynames = [];

					for (p=0;p<val.length;p++) {
							if (val[p].hasOwnProperty('given')) {
								var tmp = val[p]['given'];
								for (t=0;t<tmp.length;t++) {
									givennames.push(tmp[t]);
								}
							}
					}

					for (p=0;p<val.length;p++) {
							if (val[p].hasOwnProperty('family')) {
								var tmp = val[p]['family'];
								for (t=0;t<tmp.length;t++) {
									familynames.push(tmp[t]);
								}
							}
					}
						$scope.names = '(Family) ' + familynames.toString() + ' (Given) ' + givennames.toString();
					}
				if (key === "gender")
					$scope.gender = val.coding[0]['display'];
				if (key === "birthDate")
					$scope.birthDate = val;
				if (key === "active") {
					var active;
					if (val == true)
						active = "Active";
					else
						active = "Inactive";
					$scope.status = active;
					}
				if (key === "telecom") {
					var phones = [];
					var temp;
					for (i=0; i < val.length; i++) {
						if (val[i].hasOwnProperty('use')) {
							phones.push(val[i]['use'] + ' : ' + val[i]['value']);
							}
						else {
							phones.push('other : ' + val[i]['value']);
						}
					}		
					$scope.phones = phones.toString();
					}
				if (key === "address") {
					var addrs = [];
					for (i=0;i<val.length;i++) {
						addrs.push(val[i]['line'][0] + ' ' + val[i]['city'] + ' ' + val[i]['state'] + ' ' + val[i]['zip']);
					}
					$scope.addresses = addrs.toString();
					}
			});
			DHPService.organization(DHPService.getOrganizationId());
		});
		$scope.$on('Successful logout', function() {
			$scope.patientShow = false;
		});
		$scope.$on('Successful organization', function() {
			$scope.organization = DHPService.getOrganizationData();
		});		
		$scope.getPatient = function() {
			DHPService.refreshPatient();
		};
		$scope.$on('Successful refresh patient', function() {
			DHPService.organization(DHPService.getOrganizationId());
		});
	});
	
	/* The observations controller retrieves observations and sets the $scope model for the observations view. */
	dhp.controller('ObservationsController', function ($scope, DHPService) {
		$scope.observationsShow = false;
		$scope.showNext = false;
		$scope.showPrevious = false;
		
		$scope.$on('Successful patient', function () {
			$scope.observationsShow = true;
			DHPService.observations();
		});
		$scope.$on('Successful logout', function() {
			$scope.observationsShow = false;
		});
		
		$scope.getObservations = function() {
			DHPService.observations();
		};
		
		$scope.getObservationsNext = function() {
			DHPService.observationsNext();
		}
		
		$scope.getObservationsPrevious = function() {
			DHPService.observationsPrevious();
		}
		
		$scope.$on('Successful observations', function () {
			var resultsCount;
			var obsTable = [];
			var k = 0;
			var links = [];
			var linkObj = {};
			var prevFlag;
			var nextFlag;
			
			$.each( DHPService.getObservationsData(), function( key, val ) {
				if (key === "totalResults") {
					$scope.total_results = "Total Records: " + val;
					resultsCount = val;
				}
				if (key === "link") {
					for (j=0; j<val.length; j++) {
						linkObj['id'] = j;
						linkObj['href'] = val[j]['href'];
						linkObj['rel'] = val[j]['rel'];
						if (linkObj['rel'] === 'next') {
							nextFlag = true;
							DHPService.setObservationsNext(linkObj['href']);
						}
						if (linkObj['rel'] === 'previous') {
							prevFlag = true;
							DHPService.setObservationsPrev(linkObj['href']);	
						}
						links.push(linkObj);
					}
				}
				if (key === "entry") {
					for (i = 0; i < val.length; i++) {
							var obs = {};
							var vals = [];
							
							obs['id'] = k++;
							
							vals = dhpUtils.getObjects(val[i], 'display'); // getObjects(TestObj, 'id'); // Returns an array of matching objects
							for (p=0;p<vals.length;p++) {
								if (vals[p]['system'] === "http://loinc.org") {
									obs['display'] = vals[p]['display'];
								}	
								else {
									obs['display'] = vals[p]['display'];
								}
							}
							vals = dhpUtils.getObjects(val[i], 'value');
							for (p=0;p<vals.length;p++) {
									obs['value'] = vals[p]['value'];
							}
							vals = dhpUtils.getObjects(val[i], 'units');
							for (p=0;p<vals.length;p++) {
									obs['units'] = vals[p]['units'];
							}
							vals = dhpUtils.getObjects(val[i], 'status');
							for (p=0;p<vals.length;p++) {
									obs['status'] = vals[p]['status'];
							}
							vals = dhpUtils.getObjects(val[i], 'reliability');
							for (p=0;p<vals.length;p++) {
									obs['reliability'] = vals[p]['reliability'];
							}
							vals = dhpUtils.getObjects(val[i], 'start');;
							if (vals.length > 0) {
								for (p=0;p<vals.length;p++) {
										obs['datetime'] = vals[p]['start'];
								}
							}
							vals = dhpUtils.getObjects(val[i], 'end');
							if (vals.length > 0) {
								for (p=0;p<vals.length;p++) {
										obs['datetime'] = obs['datetime'] + 'to' + vals[p]['end'];
								}
							}
							vals = dhpUtils.getObjects(val[i], 'appliesDateTime');
							if (vals.length > 0) {
								for (p=0;p<vals.length;p++) {
										obs['datetime'] = vals[p]['appliesDateTime'];
								}
							}		
							obsTable.push(obs);		
					}
				}	
			});
			$scope.showNext = nextFlag;
			$scope.showPrevious = prevFlag;
			$scope.obsTable = obsTable;
		});
	});
	
	/* The graph controller retrieves graph data and sets the $scope model for the graph view. */
	dhp.controller('GraphController', function ($scope, $window, $timeout, DHPService) {
		$scope.graphShow = false;
				
		$scope.getGraph = function() {
			DHPService.observationsGlucose();
		};

		$scope.$on('Successful logout', function() {
		
			$timeout(function () {
				$window.location.reload();
			}, 2000);
		
			$scope.graphShow = false;
			

		});
		
		$scope.$on('Successful patient', function () {
			$scope.graphShow = true;
		});
		
		$scope.$on('glucoseObsSuccess', function () {

			var resultsCount;
			var obsList = [];
			var k = 0;
			var links = [];
			var linkObj = {};
			var times = [];
			var readings = [];
			
			$.each( DHPService.getGlucoseObservationsData(), function( key, val ) {
				if (key === "totalResults") {
					resultsCount = val;
				}
				/* The code below can be expanded if one wanted to page the data and/or retrieve additional results. */
				if (key === "link") {
					for (j=0; j<val.length; j++) {
						if (val[j]['rel'] === 'next') {
							linkObj['id'] = j;
							linkObj['href'] = val[j]['href'];
							linkObj['rel'] = val[j]['rel'];
							
							links.push(linkObj);
						}
					}
				}
				if (key === "entry") {
					for (i = 0; i < val.length; i++) {

							var obs = {};
							var vals = [];
							
							obs['id'] = k++;
							
							vals = dhpUtils.getObjects(val[i], 'value');
							for (p=0;p<vals.length;p++) {
									obs['value'] = vals[p]['value'];
									readings.push(vals[p]['value']);
							}
							vals = dhpUtils.getObjects(val[i], 'appliesDateTime');
							if (vals.length > 0) {
								for (p=0;p<vals.length;p++) {
										obs['datetime'] = vals[p]['appliesDateTime'];
										times.push(vals[p]['appliesDateTime']);
								}
							}		
							obsList.push(obs);		
					}
				}	
			});
						
			$scope.labels = times;
			if (resultsCount > 0) {
				$scope.series = ['Glucose Observations'];
			} 
			else {
				$scope.nograph = "There are no glucose observations for graphing."
			}
			$scope.data = [
				readings
			  ];
		});
	});
	