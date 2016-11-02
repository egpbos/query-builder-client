# QueryBuilder
A Query builder to query the Knowledge Store and generate datafiles that can be visualized with the Storyteller interface.



The proposed system will have 3 main components:

0. KnowledgeStore
    - RDF triple store. The NewsReader KnowledgeStore is a scalable, fault-tolerant, and Semantic Web grounded storage system to jointly store, manage, retrieve, and semantically query, both structured and unstructured data (see https://knowledgestore.fbk.eu/).
1. QueryBuilder
    - written in React.js 
    - gets a list of all possible components, agents and events from the server component (or KnowledgeStore, tbd later)
    - helps the user to compose a sparql query to run against the KnowledgeStore by selecting items of interest, be it concepts, actors or events.
    - has a button that submits the query string to the Server component
2. Server component
    - express.js + sequel database (currently sqlite3)
    - upon receiving a new query string from QueryBuilder, the Server component 
        - stores the received query in a database
        - runs the received query against the KnowledgeStore
    - upon receiving an answer from the KnowledgeStore
        - updates the list of previous queries and their results, indexed by an identifier. The identifier is a longish string of random alphanumerals which serves as a url, so users can go to a website http://mywebsite.nl/id/sdkjjrew9034kjre90kjnk for example, upon which the corresponding results are retrieved from the database without the need to rerun the calculations. 
3. UncertaintyVisualization
    - written in Angular 1 (legacy)
    - allows the user to select from a list of previously run queries (communicates with server component) to select one for visualization.
    - visualizes the results selected




