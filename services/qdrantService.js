const axios = require("axios");
const qdrantConfig = require("../config/qdrant");

class QdrantService {
  constructor() {
    this.collection = qdrantConfig.collection;
    this.client = axios.create({ baseURL: qdrantConfig.baseURL });
  }

  async createCollection() {
    try {
      const response = await this.client.put(`/collections/${this.collection}`, {
        vectors: {
          size: qdrantConfig.vectorSize,
          distance: qdrantConfig.distance
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Qdrant createCollection error: ${error.message}`);
    }
  }

  async upsertPoints(points) {
    try {
      const response = await this.client.put(
        `/collections/${this.collection}/points`,
        { points }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Qdrant upsert error: ${error.message}`);
    }
  }

  async search(vector, limit = 3) {
    try {
      const response = await this.client.post(
        `/collections/${this.collection}/points/search`,
        { vector, limit, with_payload: true }
      );

      return response.data.result;
    } catch (error) {
      throw new Error(`Qdrant search error: ${error.message}`);
    }
  }
}

module.exports = new QdrantService();
