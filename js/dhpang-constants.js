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
* This file contains the constants used throughout the application.
*/

	var CLIENT_ID = "CytYAAlDSmVy23OlWhUR7eP1omS5dw99"; // Retrieve this key from the developer portal
	var CLIENT_SECRET = "exvf3kei3Ql5DXFi"; // Retrieve this key also from the developer portal

	var BASE_URL = "https://gateway.api.pcftest.com:9004"; // HTTPS url
	var BASE_URL_GET_TOKEN = BASE_URL + "/v1/oauth2/token?grant_type=client_credentials";
	var BASE_URL_LOGIN = BASE_URL + "/v1/oauth2/authorize/login";
	var BASE_URL_LOGOUT = BASE_URL + "/v1/oauth2/authorize/logout";
	var BASE_FHIR_INFO_URL = BASE_URL + "/v1/fhir_rest";
	var BASE_URL_PATIENT = BASE_FHIR_INFO_URL + "/Patient/";
	var BASE_URL_ORGANIZATION = BASE_FHIR_INFO_URL + "/Organization/";
	var BASE_URL_OBSERVATION = BASE_FHIR_INFO_URL + "/Observation";
	
	var GLUCOSE_LOINC = "2339-0";
	var WEIGHT_LOINC = "3141-9";
	var STEPS_LOINC = "41950-7";
	var SLEEP_LOINC = "8455148";