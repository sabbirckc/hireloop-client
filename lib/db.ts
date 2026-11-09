import { MongoClient } from "mongodb"

const uri = process.env.BETTER_AUTH_DB_URI || ""

let clientPromise: Promise<MongoClient> | null = null

export async function getMongoClient(): Promise<MongoClient> {
    if (!uri) {
        throw new Error("BETTER_AUTH_DB_URI is not defined in environment variables")
    }
    if (!clientPromise) {
        const client = new MongoClient(uri)
        clientPromise = client.connect().catch((err) => {
            clientPromise = null
            throw err
        })
    }
    return clientPromise
}

export async function getJobsCollection() {
    const connectedClient = await getMongoClient()
    return connectedClient.db("hireloopdb").collection("jobs")
}

