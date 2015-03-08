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
* Each of the directives below corresponds to one of the fields in the UI.	
*/	
	dhp.directive('ngStatus', function () {
		return {
			template: '{{status}}'
		}
	});
	
	dhp.directive('ngGender', function () {
		return {
			template: '{{gender}}'
		}
	});

	dhp.directive('ngNames', function () {
		return {
			template: '{{names}}'
		}
	});
	
	dhp.directive('ngPhones', function () {
		return {
			template: '{{phones}}'
		}
	});
	
	dhp.directive('ngAddresses', function () {
		return {
			template: '{{addresses}}'
		}
	});
	dhp.directive('ngBirthdate', function () {
		return {
			template: '{{birthDate}}'
		}
	});
	
	dhp.directive('ngOrganization', function () {
		return {
			template: '{{organization}}'
		}
	});
	
	dhp.directive('ngTotalresults', function () {
		return {
			template: '<strong>{{total_results}}</strong>'
		}
	});
	
	dhp.directive('ngNograph', function () {
		return {
			template: '<strong>{{nograph}}</strong>'
		}
	});
	