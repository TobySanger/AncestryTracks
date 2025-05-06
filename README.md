Welcome to the Ancestry tracks project 2025.

Geting started:

I recomend using the free Visual Studio Code as that what I used to develop this project. 

1. Clone or download the Repository
2. Create your .env File inside the root directory (same level as package.json),create a .env file with the following contents:
   Example MongoDB string {MONGO_URI=your-mongodb-atlas-connection-string
                            PORT=3000
                            NODE_ENV=development}
   If you are a examiner please replace the example MongoDB string with the acutal string found in the Final Year Report Appendix 1, or alturnativly create your own       MongoDB Cluster (https://www.mongodb.com/products/platform/atlas-database). 
3. From here open up the a terminal in VSCode, and run the command "npm run build", then in the same termnial run "npm run dev"
4. IN a second terminal from the frontend "cd frontend/", run the command "npm run dev"

At this point you should see a "http://localhost:5173/" hover over this and click on it. A web browser should come up with the project running. 
