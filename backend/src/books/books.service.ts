import {
  Injectable,
  PlainLiteralObject,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';
import { SearchDto } from './dto/search.dto';
import { FilterDto } from './dto/filter.dto';

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
          size: 10000,
          query: {
            match_all: {},
          },
          aggs: {
            prix_moyen: {
              avg: {
                field: 'price',
              },
            },
            categories: {
              terms: {
                field: 'category.keyword',
              },
            },
            subCategories: {
              terms: {
                field: 'subCategory.keyword',
              },
            },
            editionNames: {
              terms: {
                field: 'edition.name.keyword',
              },
            },
          },
        },
      );

      return res.data;
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

  async filter(query: FilterDto) {
    try {
      const o = {
        size: 10000,
        query: {
          bool: {
            filter: [],
          },
        },
        aggs: {
          prix_moyen: {
            avg: {
              field: 'price',
            },
          },
          categories: {
            terms: {
              field: 'category.keyword',
            },
          },
          subCategories: {
            terms: {
              field: 'subCategory.keyword',
            },
          },
          editionNames: {
            terms: {
              field: 'edition.name.keyword',
            },
          },
        },
      };

      if (query.editor) {
        o.query.bool.filter.push({
          terms: {
            'edition.name.keyword': query.editor,
          },
        });
      }
      if (query.category) {
        o.query.bool.filter.push({
          terms: {
            'category.keyword': query.category,
          },
        });
      }
      if (query.subCategory) {
        o.query.bool.filter.push({
          terms: {
            'subCategory.keyword': query.subCategory,
          },
        });
      }

      const res = await axios.post(
        `http://${process.env.DB_URL}/library/_search`,
        o,
      );

      return res.data;
    } catch (error) {
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }

  async search(query: SearchDto) {
    try {
      const res = await axios.post(
        `http://${process.env.DB_URL}/library/_search`,
        {
          size: 10000,
          query: {
            bool: {
              should: [
                { match: { title: { query: query.text, boost: 1 } } },
                { match: { description: query.text } },
                { match: { 'author.fullname': query.text } },
              ],
            },
          },
          highlight: {
            fields: {
              title: {},
              description: {},
              'author.fullname': {},
            },
          },
          aggs: {
            prix_moyen: {
              avg: {
                field: 'price',
              },
            },
            categories: {
              terms: {
                field: 'category.keyword',
              },
            },
            subCategories: {
              terms: {
                field: 'subCategory.keyword',
              },
            },
            editionNames: {
              terms: {
                field: 'edition.name.keyword',
              },
            },
          },
        },
      );

      return res.data;
    } catch (error) {
      throw new ServiceUnavailableException(
        error.message ?? error.response ?? error,
      );
    }
  }

  async customSearch(query: PlainLiteralObject) {
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
