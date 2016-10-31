# QueryBuilder
A Query builder to query the Knowledge Store and generate datafiles that can be visualized with the Storyteller interface.



The proposed system will have 3 main components:

1. QueryBuilder
    - written in React
    - helps the user to compose a query to run against the DataBase
    - has a button that submits the query string to the database
2. DataBase
    - stores knowledge... // TODO
    - upon receiving a new query string, the DataBase component runs the received query against the database, and updates the list of previous queries and their results, indexed by an identifier. The identifier is a longish string of random alphanumerals which serves as a url, so users can go to a website http://mywebsite.nl/id/sdkjjrew9034kjre90kjnk for example, upon which the corresponding results are retrieved from the database without the need to rerun the calculations. The results are then passed on to UncertaintyVisualization
3. UncertaintyVisualization
    - written in Angular 1 (legacy)
    - visualizes the results returned from the DataBase when the query has run
