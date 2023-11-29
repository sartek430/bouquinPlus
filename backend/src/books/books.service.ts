import {
  Injectable,
  PlainLiteralObject,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BooksService {
  create(createBookDto: PlainLiteralObject) {
    try {
      return axios.post(`http://${process.env.DB_URL}/library/_doc`, {
        ...createBookDto,
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }

  async findAll() {
    try {
      const res = await axios.post(
        `http://${process.env.DB_URL}/library/_search`,
        {
          query: {
            match_all: {},
          },
        },
      );

      return res.data.hits.hits;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }

  async findOne(id: string) {
    try {
      const res = await axios.get(
        `http://${process.env.DB_URL}/library/_doc/${id}`,
      );

      return res.data;
    } catch (error) {
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }

  async update(id: number, updateBookDto: PlainLiteralObject) {
    try {
      await axios.put(`http://${process.env.DB_URL}/library/_doc/${id}`, {
        ...updateBookDto,
      });

      return await this.findOne(id.toString());
    } catch (error) {
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }

  async remove(id: number) {
    try {
      await axios.delete(`http://${process.env.DB_URL}/library/_doc/${id}`);

      return { success: true };
    } catch (error) {
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }

  async search(query: PlainLiteralObject) {
    try {
      const res = await axios.post(
        `http://${process.env.DB_URL}/library/_search`,
        query,
      );

      return res.data;
    } catch (error) {
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }
}
