
1. Use command **npm test** to run the tests in console of your IDEA
2. Use .env file to put EMAIL and PASSWORD 

Test scrtucture
1. Test uses page object pattern which you can find in **pageObjects** directory  with BasePage class which contains all shared action for other pages
2. **util** directory contains auxiliary functions which can be used for tests
3. Created test interact with AUT thru UI part , but I use response from specific end point to check correctness of todays date. Maybe it's not the best approach, but I guess that it's one of possible way. 
4. In general, the test is quite stable. However, I have encountered a few cases where the text disappears while typing a formula or text in an input field. I suspect this happens because the content isn't fully loaded. To address this, I'm using **waitForResponse** to ensure that the data is loaded and the page is stable before proceeding.
5. I created fixtures for pages in order to not create them in every tests but reuse them. You can find in **fixtures** dir.