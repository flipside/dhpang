Philips HealthSuite Digital Platform (HSDP) 
HTML5 Angular JavaScript Application

  What is it?
  -----------

  The Philips HTML5 Angular JavaScript sample application demonstrates core
  capabilities of the Philips HealthSuite FHIR API. Basic concepts including acquiring
  a token, authenticating and logging into and out of the application via the HealthSuite API.
  Additionally, retrieving patient demographic information as well as an organization are shown.
  The key concept of retrieving observations is highlighted as well as the ability to page back
  and forth over a set of observations.  Finally, basic charting capabilities are displayed.  
  The application can be used as a starting point for additional feature build-out. 

  The Latest Version
  ------------------

  The latest version of the sample code can be downloaded from the Philips HealthSuite
  Developer portal at https://portal.api.pcftest.com/sites/default/files/samplehtml5.zip

  
  Pre-requisite
  --------------
  
  You need to have an account on the dev portal to build the application. 
  (https://portal.api.pcftest.com/getting-started)

  1. Create an account

  2. Wait for the approval (within 24 hours)
  
  3. Create an application with 
      App Name: "Sample App", 
      Callback URL: "localhost"
      Product: "VHR API - RESTful FHIR"
  
  4. Once the application is created, make a note of the "Consumer Secret"
     and "Consumer Key". This is going to be used in step 4 in the 
     "Setup, Install & Run" section.

	 
   Documentation
  -------------

  Additional documentation for the FHIR API as well as the Philips HealthSuite may be found at
  https://portal.api.pcftest.com/


  Installation & Configuration
  -------------------------------

  This sample application may be installed and configured in any web server.  Initial development
  and testing was done using Apache Tomcat 8.x and Chrome.  The directory structure consists of the
  main dhpang folder with index.html as the view container.  There are subdirectories for cascading
  sheets (css), fonts, images and the main JavaScript files (js).  There is also a WEB-INF directory
  that contains the web.xml file for the Tomcat application.  For the user to successfully run an 
  application he or she much open the dhpang-constants.js file and replace the CLIENT_ID and 
  CLIENT_SECRET constants with those the user receives from registering on the developer portal.

  Licensing
  ---------

  Copyright (c) 2014-2015 Koninklijke Philips N.V.
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
   
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
   
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.


  Contacts
  --------

     o  Please visit the Philips HealthSuite Developer portal for any additional
	information around bug fixes, updates and further resources.  The location
	is https://portal.api.pcftest.com/.