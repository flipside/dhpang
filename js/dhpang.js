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
* This is the main angular application and the dependency on chart.js is declared.
*/
	var dhp = angular.module('dhp', ['chart.js']);

    // var c = document.getElementById("doughnut");
    // var ctx = c.getContext("2d");
    // var data = [
    //     {
    //         value: 300,
    //         color:"#F7464A",
    //         highlight: "#FF5A5E",
    //         label: "Red"
    //     },
    //     {
    //         value: 50,
    //         color: "#46BFBD",
    //         highlight: "#5AD3D1",
    //         label: "Green"
    //     },
    //     {
    //         value: 100,
    //         color: "#FDB45C",
    //         highlight: "#FFC870",
    //         label: "Yellow"
    //     }
    // ];
    // var myDoughnutChart = new Chart(ctx).Doughnut(data,{
    // });