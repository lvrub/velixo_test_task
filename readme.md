
***How to run***
1. Use command **npm test** to run the tests in console of your IDEA
2. Use .env file to put EMAIL and PASSWORD 

***Test scrtucture***
1. Test has two part beforeEach hook and test itself. The  approauch is used to separate tetst and additional staff before test.
2. Test uses page object pattern which you can find in **pageObjects** directory  with BasePage class which contains all shared action for other pages. 
3. I created fixtures for pages in order to not create them in every tests but reuse them. You can find in **fixtures** dir.
4. **util** directory contains auxiliary functions which can be used for tests
5. Created test interact with AUT thru UI part , but I use response from specific end point to check correctness of todays date. Maybe it's not the best approach, but I guess that it's one of possible way. 
6. In general, the test is quite stable. However, I have encountered a few cases where the text disappears while typing a formula or text in an input field. I suspect this happens because the content isn't fully loaded. To address this, I'm using **waitForResponse** to ensure that the data is loaded and the page is stable before proceeding.


Recorded video with head mode: [View ](20240918_163006.mp4)
