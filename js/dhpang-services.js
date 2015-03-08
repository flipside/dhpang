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
* The DHPService contains the requisite functions for retrieving data from the FHIR server. 
*/	
	
	dhp.service('DHPService', function($http, $rootScope) {
		
		var accessToken;
		var patient_id;
		var patientData;
		var organization_id;
		var organizationData;
		var observationsData;
		var observationsNextHref;
		var observationsPrevHref;
		var observationsGlucose;
		
		/* The login function authenticates a user given a username and password and after a token has been retrieved. */
		var login = function(userName,password,accessToken) { 
			$http({
				url: BASE_URL_LOGIN,
				method: "POST",
				data: JSON.stringify({ username:userName, password:password }),
				headers: {'Authorization':'Bearer ' + accessToken}
				}).success(function (data, status, headers, config) {
					patient_id = data.user.id;
					organization_id = data.user.org;
					$rootScope.$broadcast("Successful login");
				}).error(function (data, status, headers, config) {
					console.log(data);
					$rootScope.$broadcast("Failed login");
				});
			};
		
		/* The logout function logs a user out. */		
		this.logout = function() { 
			$http({
				url: BASE_URL_LOGOUT,
				method: "DELETE",
				headers: {'Authorization':'Bearer ' + accessToken}
				}).success(function (data, status, headers, config) {
					$rootScope.$broadcast("Successful logout");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};
			
		/* The patient function retrieves individual patient demographic data. */
		this.patient = function() { 
			$http({
				url: BASE_URL_PATIENT + patient_id,
				method: "GET",
				headers: {'Authorization':'Bearer ' + accessToken,'Accept':'application/json'}
				}).success(function (data, status, headers, config) {
					console.log(data);
					patientData = data;
					$rootScope.$broadcast("Successful patient");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};
			
		/* The refreshPatient function retrieves individual patient demographic data. */
		this.refreshPatient = function() { 
			$http({
				url: BASE_URL_PATIENT + patient_id,
				method: "GET",
				headers: {'Authorization':'Bearer ' + accessToken,'Accept':'application/json'}
				}).success(function (data, status, headers, config) {
					console.log(data);
					patientData = data;
					$rootScope.$broadcast("Successful refresh patient");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};
			
		/* The organization function retrieves the organization of the user. */			
		this.organization = function(organization_id) { 
			$http({
				url: BASE_URL_ORGANIZATION + organization_id,
				method: "GET",
				headers: {'Authorization':'Bearer ' + accessToken,'Accept':'application/json'}
				}).success(function (data, status, headers, config) {
					console.log(data);
					organizationData = data.name;
					$rootScope.$broadcast("Successful organization");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};

		/* The observations function retrieves observations given a patient. */		
		this.observations = function() {
			$http({
				url: BASE_URL_OBSERVATION + '?subject:_id=' + patient_id,
				method: "GET",
				headers: {'Authorization':'Bearer ' + accessToken,'Accept':'application/json'}
				}).success(function (data, status, headers, config) {
					console.log(data);
					observationsData = data;
					$rootScope.$broadcast("Successful observations");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};

		/* This the observations paging function for next. */			
		this.observationsNext = function() {
			$http({
				url: observationsNextHref,
				method: "GET",
				headers: {'Authorization':'Bearer ' + accessToken,'Accept':'application/json'}
				}).success(function (data, status, headers, config) {
					console.log(data);
					observationsData = data;
					$rootScope.$broadcast("Successful observations");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};

		/* This the observations paging function for previous. */			
		this.observationsPrevious = function() {
			$http({
				url: observationsPrevHref,
				method: "GET",
				headers: {'Authorization':'Bearer ' + accessToken,'Accept':'application/json'}
				}).success(function (data, status, headers, config) {
					console.log(data);
					observationsData = data;
					$rootScope.$broadcast("Successful observations");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};

		/* This the observations function for retrieving glucose observations for the graph. */			
		this.observationsGlucose = function() {
			$http({
				url: BASE_URL_OBSERVATION + '?subject:_id=' + patient_id + '&name=' + GLUCOSE_LOINC + '&_sort:asc=date&_count=50',
				method: "GET",
				headers: {'Authorization':'Bearer ' + accessToken,'Accept':'application/json'}
				}).success(function (data, status, headers, config) {
					console.log(data);
					observationsGlucose = data;
					$rootScope.$broadcast("glucoseObsSuccess");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};

		/* This is the first function called to retrieve an application token.  Once a token is retrieved then it
		   makes a call to authenticate the user via the login function.										*/			
		this.token = function(username, password) { 
			var authenticateString = 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);
			$http({
				url: BASE_URL_GET_TOKEN,
				method: "POST",
				headers: {'Authorization':authenticateString }
			}).success(function (data, status, headers, config) {
					accessToken = data.access_token;
					login(username,password,accessToken);
				}).error(function (data, status, headers, config) {
					console.log(data);
					$rootScope.$broadcast("Failed login");
				});			
			};

		/* Below are helper functions for the controllers to retrieve necessary data. */
		
		this.getAccessToken = function () {
			return accessToken; 
		};
		this.getPatientId = function () {
			return patient_id;
		}
		this.getPatientData = function () {
			return patientData;
		}
		this.getOrganizationId = function () {
			return organization_id;
		}
		this.getOrganizationData = function () {
			return organizationData;
		}
		this.getObservationsData = function () {
			return observationsData;
		}
		this.setObservationsNext = function(href) {
			observationsNextHref = href;
		}
		this.setObservationsPrev = function(href) {
			observationsPrevHref = href;
		}
		this.getGlucoseObservationsData = function () {
			return observationsGlucose;
		}		
	});