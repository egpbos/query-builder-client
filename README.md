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




**notes**

At the very core of the app, we'll need a class Instance and a class Entity,
both inherit from a new class Node. Entity is basically the equivalent of a
folder if the tree were a directory tree, while Instance is a file. Either way
they are used to store the state of the node, i.e. the ontology tree is a tree
of Nodes.

Node|Instance|Entity are purely TS classes, they are not a React component, just
a convenient way of storing the state, which is then visualized using another
class, which is a React component. Let's call it NodeRender and InstanceRender
or something.

Question: NodeRender and InstanceRender would render a ``<ul></ul>``?

So you would have

src/
    components/
        entity-render.tsx
        entity.ts
        instance-render.tsx
        instance.ts
        node-render.tsx
        node.ts
    reducers/
        <not sure yet what goes here>
    index.tsx
test/
    <something here>

