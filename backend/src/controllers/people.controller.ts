import {
    JsonController,
    Get,
    HttpCode,
    NotFoundError,
    Param,
    Post,
    Body,
    BodyParam,
    QueryParam,
} from 'routing-controllers';
import { PeopleProcessing } from '../services/people_processing.service';

const peopleProcessing = new PeopleProcessing();

@JsonController('/people', { transformResponse: false })
export default class PeopleController {
    @HttpCode(200)
    @Get('/')
    getAllPeople(@QueryParam('search') search: string, @QueryParam('page') page: number, @QueryParam('limit') limit: number) {
        const people = peopleProcessing.searchPeople(search, page, limit);

        if (!people) {
            throw new NotFoundError('No people found');
        }

        return {
            data: people,
        };
    }

    @HttpCode(200)
    @Get('/:id')
    getPerson(@Param('id') id: number) {
        const person = peopleProcessing.getById(id);

        if (!person) {
            throw new NotFoundError('No person found');
        }

        return {
            data: person,
        };
    }

    // @HttpCode(200)
    // @Post('/search')
    // searchPeople(@BodyParam('search') search: string) {
    //   const searchedPeople = peopleProcessing.searchPeople(search)

    //   if (!searchedPeople) {
    //     throw new NotFoundError('No people found by this search.')
    //   }

    //   return {
    //     data: searchedPeople
    //   }
    // }
}
