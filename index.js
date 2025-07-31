const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion, MongoLoggableComponent, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tye2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const reviewCollection = client.db('reviewDB').collection('review');

        const watchlistCollection = client.db('reviewDB').collection('watchlist');

        const userCollection = client.db('reviewDB').collection('users');

        // CRUD Operations:

        // to create review data in mongodb
        app.post('/review', async (req, res) => {
            const newReview = req.body;
            console.log(newReview);
            const result = await reviewCollection.insertOne(newReview);
            res.send(result);
        });

        // to read 6 review data from backend
        app.get('/topReview', async (req, res) => {
            const topGames = reviewCollection
                .find()
                .sort({ rating: -1 })
                .limit(6);
            const result = await topGames.toArray();
            res.send(result);
        });

        // to read all review data from backend
        app.get('/review', async (req, res) => {
            const allReviews = reviewCollection.find();
            const result = await allReviews.toArray();
            res.send(result);
        });

        // get review details by id / and also use for update
        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.findOne(query);
            res.send(result);
        });

        // get reviews for a specific user by email
        app.get('/myReviews', async (req, res) => {
            const email = req.query.email;
            if (!email) {
                return res.status(400).send({ message: "Email query parameter is required" });
            }
            const query = { user_email: email }
            const result = await reviewCollection.find(query).toArray();
            res.send(result);
        })

        // update reviews(put)

        app.put('/review/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedReview = req.body;
            const review = {
                $set: {
                    gameImage: updatedReview.gameImage,
                    title: updatedReview.title,
                    description: updatedReview.description,
                    rating: updatedReview.rating,
                    year: updatedReview.year,
                    genre: updatedReview.genre,
                    user_email: updatedReview.user_email,
                    user_name: updatedReview.user_name
                }
            }
            const result = await reviewCollection.updateOne(filter, review, options);
            res.send(result);
        })

        // to delete my reviews
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })

        // to get watchlist from frontend
        app.post('/watchlist', async (req, res) => {
            const item = req.body;
            const result = await watchlistCollection.insertOne(item);
            res.send(result);
        });

        app.get('/watchlist', async (req, res) => {
            const email = req.query.email;
            const query = { user_email: email }
            const result = await watchlistCollection.find(query).toArray();
            res.send(result);
        })



        // users related API (create user)
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);

        });

        // Read users

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Gaming review server is running')
})

app.listen(port, () => {
    console.log(`Gaming review server is running on port: ${port}`);

})